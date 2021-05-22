// An index file to gather the models and export them for use

// User model
const User = require('./User');

// Patient model
const Patient = require('./Patient');

// Patient model
const Record = require('./Record');

// Create associations between the models

// Export the modules
module.exports = { User, Patient, Record };
