// Dependencies
const sequelize = require('../config/connection');
const router = require('express').Router();
const { User, Patient, Record } = require('../models');
const withAuth = require('../utils/auth');
const session = require('express-session');
// Sequelize store to save the session so the user can remain logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// A route to render the dashboard page, only for a logged in user
router.get('/', withAuth, (req, res) => {
  // Access the User model and run the findOne() method to get a single user based on parameters
  User.findOne({
    // when the data is sent back, exclude the password property
    where: {
      username: req.session.username
    },
    attributes: [
      'id',
      'name',
      'username',
      'email',
      'password',
      'address',
      'location_zip',
    ],
    order: [
      [Patient, 'name', 'ASC'],
      [Record, 'created_at', 'DESC'],
    ],
    include: [
      {
        model: Patient,
        attributes: ['id', 'name', 'birth_date', 'email', 'address' , 'doctor_id' , 'location_zip', 'created_at']
      },
      {
        model: Record,
        attributes: ['id', 'patient_name', 'title', 'text', 'patient_id', 'user_id', 'created_at', 'user_username' ]
      }
    ]
  })
    .then(dbUserData => {
        if (!dbUserData) {
          // if no user is found, return an error
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        req.session.save(() => {
          // declare session variables
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
        });
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