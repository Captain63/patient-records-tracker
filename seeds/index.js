const seedUsers = require('./userSeeds.json');

const seedPatients = require('./patientSeeds.json');

const seedRecords = require('./recordSeeds.json');

const sequelize = require('../config/connection');
const { User, Patient, Record } = require('../models');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- Users SEEDED -----\n');

  await Patient.bulkCreate(seedPatients, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- Patients SEEDED -----\n');

  await Record.bulkCreate(seedRecords, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- Records SEEDED -----\n');

  process.exit(0);
};

seedAll();

