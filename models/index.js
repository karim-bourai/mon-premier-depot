const sequelize = require('../config/database');

const Roles = require('./roles');
const Utilisateurs = require('./Utilisateurs');
const Categories = require('./Categories');
const Voitures = require('./Voitures');
const Reservations = require('./Reservations');
const Paiements = require('./Paiements');

// Un role peut avoir plusieurs utilisateurs
Roles.hasMany(Utilisateurs, { foreignKey: 'role_id' });
Utilisateurs.belongsTo(Roles, { foreignKey: 'role_id' });

// Une categorie peut contenir plusieurs voitures
Categories.hasMany(Voitures, { foreignKey: 'categorie_id' });
Voitures.belongsTo(Categories, { foreignKey: 'categorie_id' });

// Un utilisateur peut effectuer plusieurs reservations
Utilisateurs.hasMany(Reservations, { foreignKey: 'utilisateur_id' });
Reservations.belongsTo(Utilisateurs, { foreignKey: 'utilisateur_id' });

// Une voiture peut avoir plusieurs reservations
Voitures.hasMany(Reservations, { foreignKey: 'voiture_id' });
Reservations.belongsTo(Voitures, { foreignKey: 'voiture_id' });

// Une reservation peut avoir plusieurs paiements
Reservations.hasMany(Paiements, { foreignKey: 'reservation_id' });
Paiements.belongsTo(Reservations, { foreignKey: 'reservation_id' });

module.exports = {
    sequelize,
    Roles,
    Utilisateurs,
    Categories,
    Voitures,
    Reservations,
    Paiements
};