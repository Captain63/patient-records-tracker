// Dependencies
// Express.js connection
const router = require('express').Router();
// Patient models
const { Record, Patient } = require('../../models');
// Express Session for the session data
const session = require('express-session');
// Authorization Helper
const withAuth = require('../../utils/auth');
// Sequelize store to save the session so the user can remain logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Routes

// GET /api/users -- get all records
router.get('/', (req, res) => {
    Record.findAll({
        // Query configuration
        attributes: [
            'id',
            'title',
            'text',
            'created_at',
          ],
        // Order the posts from most recent to least
        order: [[ 'created_at', 'DESC']],
        // From the User table, include the post creator's user name
        // From the Comment table, include all comments
        include: [
            {
                model: Patient,
                attributes: ['name','birth_date']
            }
        ]
    })
    // return the posts
    .then(dbRecordData => res.json(dbRecordData))
    // if there was a server error, return the error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/patients/1 -- get a single record by id
router.get('/:id', (req, res) => {
    // Access the User model and run the findOne() method to get a single user based on parameters
    Record.findOne({
      where: {
        // use id as the parameter for the request
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'text',
        'created_at',
      ],
      include: [
        {
            model: Patient,
            attributes: ['name','birth_date']
        }
    ]
    })
      .then(dbRecordData => {
        if (!dbRecordData) {
          // if no user is found, return an error
          res.status(404).json({ message: 'No Record found with this id' });
          return;
        }
        // otherwise, return the data for the requested user
        res.json(dbRecordData);
      })
      .catch(err => {
        // if there is a server error, return that error
        console.log(err);
        res.status(500).json(err);
      });
  });

// POST api/posts -- create a record post
router.post('/', withAuth, (req, res) => {
    // expects object of the form {title: 'Sample Title Here', post_text: 'Here's some sample text for a post.', user_id: 1}
    Record.create({
        title: req.body.title,
        text: req.body.text,
        id: req.session.id
    })
    .then(dbRecordData => res.json(dbRecordData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;