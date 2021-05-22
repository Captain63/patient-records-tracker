// An index file to gather the models, establish their relationships and export them for use

// Import models
const User = require('./User');
const Record = require("./Record");
const Patient = require("./Patient");

// Relationships

// Associating Patient and Note
Patient.hasMany(Note, {
    foreignKey: "patient_id",
    // If patient is deleted, the associated notes should be deleted as well
    onDelete: "CASCADE"
})

Note.belongsTo(Patient, {
    foreignKey: "patient_id"
})

// Associating User and Patient
User.hasMany(Patient, {
    foreignKey: "doctor_id"
})

Patient.belongsTo(User, {
    foreignKey: "doctor_id"
})

// Associating User and Note
User.hasMany(Note, {
    foreignKey: "user_id"
})

Note.belongsTo(User, {
    foreignKey: "user_id"
})

// Create associations between the models

// Export the modules
module.exports = { User, Patient, Record };
