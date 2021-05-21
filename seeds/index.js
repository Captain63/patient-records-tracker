const usersData = require('./userData.json');

const patientsData = require('./patientData.json');

const recordsData = require('./recordData.json');

const sequelize = require('../config/connection');
const { User, Patient, Record } = require('../models');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await User.bulkCreate(usersData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- Users SEEDED -----\n');

  await Patient.bulkCreate(patientsData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- Patients SEEDED -----\n');

  await Record.bulkCreate(recordsData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- Records SEEDED -----\n');

  process.exit(0);
};

seedAll();

