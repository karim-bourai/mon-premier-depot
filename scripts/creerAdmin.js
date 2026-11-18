require('dotenv').config();

const bcrypt = require('bcryptjs');
const { sequelize, Roles, Utilisateurs } = require('../models');

async function run() {
    try {
        if (!process.env.ADMIN_EMAIL ||
            !process.env.ADMIN_PASSWORD ||
            process.env.ADMIN_PASSWORD.length < 8) {
            throw new Error('Verifie ADMIN_EMAIL et ADMIN_PASSWORD dans .env');
        }

        await sequelize.authenticate();

        const [role] = await Roles.findOrCreate({
            where: { nom_role: 'Administrateur' },
            defaults: { nom_role: 'Administrateur' }
        });

        const email = process.env.ADMIN_EMAIL.toLowerCase();

        const existe = await Utilisateurs.findOne({
            where: { email }
        });

        if (existe) {
            await existe.update({
                mot_de_passe: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
                role_id: role.id
            });

            console.log('Mot de passe administrateur mis a jour.');
        } else {
            await Utilisateurs.create({
                prenom: 'Admin',
                nom: 'Projet',
                email,
                mot_de_passe: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
                role_id: role.id
            });

            console.log('Compte administrateur cree.');
        }
    } catch (erreur) {
        console.error('Erreur :', erreur.message);
        process.exitCode = 1;
    } finally {
        await sequelize.close();
    }
}

run();