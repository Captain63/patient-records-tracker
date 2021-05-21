// Record model

// Dependencies
// sequelize model, datatypes, and database connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// the Post model extends the sequelize model 
class Record extends Model {}
// define the table columns and configuration, similar to the setup for the User model
Record.init(
    {
        record_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        record_text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                // Record must be at least one character long
                len: [1]
            }
        },
        patient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'patient',
                key: 'patient_id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'user_id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        modelName: 'record'
    }
)

// Export the model
module.exports = Record;