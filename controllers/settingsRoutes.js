// Dependencies
// the router and the database
const router = require('express').Router();
const sequelize = require('../config/connection');
// the models
const {  User, Patient } = require('../models');
// the authorization middleware to redirect unauthenticated users to the login page
const withAuth = require('../utils/auth')
// Express Session for the session data
const session = require('express-session');
// Sequelize store to save the session so the user can remain logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// A route to render the dashboard page, only for a logged in user
router.get('/:id', withAuth, (req, res) => {
    // Access the User model and run the findOne() method to get a single user based on parameters
    User.findOne({
      // when the data is sent back, exclude the password property
      attributes: { exclude: ['password'] },
      where: {
        // use id as the parameter for the request
        id: req.params.id
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
        [Patient, 'name', 'ASC']
      ],
      include: [
        {
          model: Patient,
          attributes: ['id', 'name', 'birth_date', 'email', 'address' , 'doctor_id' , 'location_zip']
        }
      ],
    })
      .then(dbUserData => {
        if (!dbUserData) {
          // if no user is found, return an error
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        // otherwise, return the data for the requested user
        const user = dbUserData.get({ plain: true });
        res.render('settings', { user, logged_in: true });
      })
      .catch(err => {
        // if there is a server error, return that error
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;