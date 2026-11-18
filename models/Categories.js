const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categories = sequelize.define('Categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nom: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },

    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'Categories',
    timestamps: false
});

module.exports = Categories;