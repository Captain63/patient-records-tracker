// Import User seed data
const usersData = require('./userData.json');
const patientsData = require('./patientData.json');
const recordsData = require('./recordData.json');

//connection to db
const sequelize = require('../config/connection');

// Import User model
const { User, Patient, Record } = require('../models');

//async function to wait and see all
const seedAll = async () => {
   // Drop existing tables
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  // Create user seed data
  await User.bulkCreate(usersData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- Users SEEDED -----\n');
  // Create patient seed data
  await Patient.bulkCreate(patientsData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- Patients SEEDED -----\n');
  // Create record seed data
  await Record.bulkCreate(recordsData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- Records SEEDED -----\n');

  process.exit(0);
};

//run seeding all function
seedAll();

