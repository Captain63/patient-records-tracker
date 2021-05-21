// Note Model

// Dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model {}

Note.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "patient",
                key: "id"
            } 
        }
    },
    {
        sequelize,
        // Reference createdAt property for pulling note date in view
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'note',
    }
);

module.exports = Note;