const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Voitures = sequelize.define('Voitures', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    marque: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    modele: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    annee: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    immatriculation: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },

    prix_jour: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    photo: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    categorie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Categories',
            key: 'id'
        }
    }
}, {
    tableName: 'Voitures',
    timestamps: false
});

module.exports = Voitures;