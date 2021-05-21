// Patient Model

// Dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create the Patient model
class Patient extends Model {}

// define the table columns and configuration
Patient.init(
  {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'patient',
  }
);

// Export the model
module.exports = Patient;
