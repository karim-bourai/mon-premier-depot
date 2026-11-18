const sequelize = require('./database');

async function testerConnexion() {
    try {
        await sequelize.authenticate();
        console.log('Connexion MySQL reussie !');
    } catch (erreur) {
        console.log('Erreur de connexion MySQL :', erreur.message);
    } finally {
        await sequelize.close();
    }
}

testerConnexion();