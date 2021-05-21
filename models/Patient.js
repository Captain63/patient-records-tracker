// Patient Model

// Dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create the User model
class Patient extends Model {}

// define the table columns and configuration
Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id"
      }
    }
    // phone number, diagnostic impressions, etc...
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'patient',
  }
);

module.exports = Patient;