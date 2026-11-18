const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Paiements = sequelize.define('Paiements', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    reservation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Reservations',
            key: 'id'
        }
    },

    montant: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    date_paiement: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    mode_paiement: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'Paiements',
    timestamps: false
});

module.exports = Paiements;