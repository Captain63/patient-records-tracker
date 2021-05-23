// Dependencies
const sequelize = require('../config/connection');
const router = require('express').Router();
const { User, Patient } = require('../models');
const withAuth = require('../utils/auth');
const session = require('express-session');
// Sequelize store to save the session so the user can remain logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// A route to render the dashboard page, only for a logged in user
router.get('/', withAuth, (req, res) => {
  // Access the User model and run the findOne() method to get a single user based on parameters
  User.findOne({
    // when the data is sent back, exclude the password property
    attributes: { exclude: ['password'] },
    attributes: [
      'id',
      'username',
      'email'
    ],
    include: [
      {
        model: Patient,
        attributes: ['id', 'name', 'birth_date', 'email', 'address' , 'doctor_id']
      }
    ]
  })
    .then(dbUserData => {
        if (!dbUserData) {
          // if no user is found, return an error
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        // otherwise, return the data for the requested user
        const user = dbUserData.get({ plain: true });
        res.render('homepage', { user, logged_in: true });
      })
      .catch(err => {
        // if there is a server error, return that error
        console.log(err);
        res.status(500).json(err);
      });
})
  
// Render the login page.  If the user is logged in, redirect to the home page.
router.get('/settings', (req, res) => {
  res.render('settings');
});

// Render the login page.  If the user is logged in, redirect to the home page.
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Render the sign up page.  If the user is logged in, redirect to the home page.
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
});


module.exports = router;