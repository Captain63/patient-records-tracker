// Import User model
const { User } = require('../models');

const sequelize = require('../config/connection');

// Import User seed data
const userData = require('./userData.json');

const seedAll = async () => {

  // Drop existing tables
  await sequelize.sync({ force: true });

  console.log('\n----- DATABASE SYNCED -----\n');

  // Create user seed data
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

// Call seed function declared above
seedAll();