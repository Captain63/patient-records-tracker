// Dependencies
// Express.js connection
const router = require('express').Router();
// Patient models
const { Record, Patient, User } = require('../../models');
// Express Session for the session data
const session = require('express-session');
// Authorization Helper
const withAuth = require('../../utils/auth');
// Sequelize store to save the session so the user can remain logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Routes

// api/record/create


// A route to render the dashboard page, only for a logged in user
router.get('/create', withAuth, async (req, res) => {
  try {
    // Access the User model and run the findOne() method to get a single user based on parameters
    const dbUserData = await User.findOne({
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
      include: [
        {
          model: Patient,
          attributes: ['id', 'name', 'birth_date', 'email', 'address' , 'doctor_id' , 'location_zip']
        },
        {
          model: Record,
          attributes: ['id', 'patient_name', 'title', 'text', 'patient_id', 'user_id', 'created_at' ]
        },
      ]
    })
    
    if (!dbUserData) {
      // if no user is found, return an error
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
          
    // otherwise, return the data for the requested user
    const user = dbUserData.get({ plain: true });
    res.render('createrecord', { user, logged_in: true });
  } catch(err) {
    // if there is a server error, return that error
    console.log(err);
    res.status(500).json(err);
  }
})

// create new record
router.post('/', withAuth, async (req, res) => {
  try {
    // expects object of the form {title: 'Sample Title Here', post_text: 'Here's some sample text for a post.', user_id: 1}
    const dbRecordData = await Record.create({
        patient_name: req.body.patient_name,
        patient_id: req.body.patient_id,
        title: req.body.title,
        text: req.body.text,
        user_id: req.body.user_id
    })
  
    res.json(dbRecordData);
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET /api/patients/1 -- get all records from that patient
router.get('/:patient_id', async (req, res) => {
  try {
    // Access the User model and run the findOne() method to get a single user based on parameters
    const dbRecordData = Record.findAll({
      where: {
        // use id as the parameter for the request
        patient_id: req.params.patient_id
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

      
    if (!dbRecordData) {
      // if no user is found, return an error
      res.status(404).json({ message: 'No Record found with this id' });
      return;
    }

    // otherwise, return the data for the requested user
    res.json(dbRecordData);
  } catch(err) {
    // if there is a server error, return that error
    console.log(err);
    res.status(500).json(err);
  }
});

// POST api/posts -- create a record post
router.post('/', withAuth, async (req, res) => {
  try {
    // expects object of the form {title: 'Sample Title Here', post_text: 'Here's some sample text for a post.', user_id: 1}
    const dbRecordData = await Record.create({
        title: req.body.title,
        text: req.body.text,
        id: req.session.id
    })

    res.json(dbRecordData);
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;