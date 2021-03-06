// Record model

// Dependencies
// sequelize model, datatypes, and database connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// the Record model extends the sequelize model 
class Record extends Model {}
// define the table columns and configuration, similar to the setup for the Record model
Record.init(
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
            allowNull: false,
            validate: {
                // Record must be at least one character long
                len: [1]
            }
        },
        patient_name: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "patient",
                key: "name"
            } 
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "user",
                key: "name"
            } 
        },
        user_username: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "user",
                key: "username"
            } 
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "patient",
                key: "id"
            } 
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id"
            } 
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'record'
    }
)

// Export the model
module.exports = Record;