// An index file to gather the models, establish their relationships and export them for use

// Import models
const User = require('./User');
const Note = require("./Note");
const Patient = require("./Patient");

// Relationships

// Export the modules
module.exports = { User, Note, Patient };
