const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Utilisateurs = sequelize.define('Utilisateurs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    prenom: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    nom: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },

    mot_de_passe: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Roles',
            key: 'id'
        }
    }
}, {
    tableName: 'Utilisateurs',
    timestamps: false
});

module.exports = Utilisateurs;