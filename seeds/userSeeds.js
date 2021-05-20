const { User } = require('../models');

const userData = [
  {
    username: "Brandonford",
    email: "brandonford617@yahoo.com",
    password: "password1234"
  }
];

const seedUsers = () => User.bulkCreate(userData);

//  WARNING seed bulk create does NOT hash the password, so they must be hashed via the update route before the login route will work in model user.js!

module.exports = seedUsers;