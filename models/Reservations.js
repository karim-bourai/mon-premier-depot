const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reservations = sequelize.define('Reservations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    utilisateur_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Utilisateurs',
            key: 'id'
        }
    },

    voiture_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Voitures',
            key: 'id'
        }
    },

    date_debut: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    date_fin: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    statut: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'Reservations',
    timestamps: false
});

module.exports = Reservations;