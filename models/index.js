// An index file to gather the models and export them for use

// User model
const User = require('./User');

// Patient model
const Patient = require('./Patient');

// Patient model
const Record = require('./Record');

// Create associations between the models
// User-Record relationship
User.hasMany(Record, {
    foreignKey: 'user_id'
});

// Patient-Record relationship
Patient.hasMany(Record, {
    foreignKey: 'patient_id'
});

//Record-Patient relationship
Record.belongsTo(Patient, {
    foreignKey: 'patient_id',
    onDelete: 'cascade',
    hooks:true
});

//Record-User relationship
Record.belongsTo(User, {
    foreignKey: 'user_id',
    hooks:true
});

// Export the modules
module.exports = { User, Patient, Record };
