const { sequelize } = require('./models');

async function creerTables() {
    try {
        await sequelize.authenticate();
        console.log('Connexion MySQL reussie !');

        await sequelize.sync();

        console.log('Les 6 tables ont ete creees avec succes !');
    } catch (erreur) {
        console.log('Erreur :', erreur.message);
    } finally {
        await sequelize.close();
    }
}

creerTables();