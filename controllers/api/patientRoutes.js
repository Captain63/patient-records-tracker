// Dependencies
// Express.js connection
const router = require('express').Router();
// Patient models
const { Patient, User, Record } = require('../../models');
// Authorization Helper
const withAuth = require('../../utils/auth');

// Routes

// A route to render the dashboard page, only for a logged in user
router.get('/create', withAuth, (req, res) => {
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
    ],
    include: [
      {
        model: Patient,
        attributes: ['id', 'name', 'birth_date', 'email', 'address' , 'doctor_id' , 'location_zip']
      },
      {
        model: Record,
        attributes: ['id', 'patient_name', 'title', 'text', 'patient_id', 'user_id', 'created_at', 'user_name'  ]
      },
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
        res.render('createpatient', { user, logged_in: true });
      })
      .catch(err => {
        // if there is a server error, return that error
        console.log(err);
        res.status(500).json(err);
      });
})

router.get('/:id', withAuth , async (req, res) => {
  try {
    // Access the User model and run the findOne() method to get a single user based on parameters
    const dbPatientData = await Patient.findOne({
      // when the data is sent back, exclude the password property
      where: {
        // use id as the parameter for the request
        id: req.params.id
      },
      order: [
        [Record, 'created_at', 'DESC']
      ],
      include: [
        {
          model: User,
          attributes: [
            'id',
            'name',
            'username',
            'email',
            'password',
            'address',
            'location_zip',
          ]
        },
        {
          model: Record,
          attributes: ['id', 'patient_name', 'title', 'text', 'patient_id', 'user_id', 'created_at', 'user_username' , 'user_name' ]
        }
      ]
    })
    if (!dbPatientData) {
      // if no user is found, return an error
      res.status(404).json({ message: 'No Patient found with this id' });
      // halts further code execution
      return;
    }

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
       order: [
         [Patient, 'name', 'ASC'],
       ],
       include: [
         {
           model: Patient,
           attributes: ['id', 'name', 'birth_date', 'email', 'address' , 'doctor_id' , 'location_zip', 'created_at']
         },
         {
           model: Record,
           attributes: ['id', 'patient_name', 'title', 'text', 'patient_id', 'user_id', 'created_at', 'user_name'  ]
         }
       ]
    })
    
    if (!dbUserData) {
      // if no user is found, return an error
      res.status(404).json({ message: 'No user found with this id' });
      // halts further code execution
      return;
    }
    
    // otherwise, return the data for the requested user
    const patient = dbPatientData.get({ plain: true });
    const user = dbUserData.get({ plain: true });
    res.render('patientdashboard', { patient, user, logged_in: true });
  } catch (err) {
      // if there is a server error, return that error
      console.log(err);
      res.status(500).json(err);
  }
});

router.get('/details/:id/', withAuth , async (req, res) => {
  try {
    // Access the User model and run the findOne() method to get a single user based on parameters
    const dbPatientData = await Patient.findOne({
      // when the data is sent back, exclude the password property
      where: {
        // use id as the parameter for the request
        id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: [
            'id',
            'name',
            'username',
            'email',
            'password',
            'address',
            'location_zip',
          ]
        },
        {
          model: Record,
          attributes: ['id', 'patient_name', 'title', 'text', 'patient_id', 'user_id', 'created_at', 'user_name'  ]
        }
      ]
    })
    if (!dbPatientData) {
      // if no user is found, return an error
      res.status(404).json({ message: 'No Patient found with this id' });
      // halts further code execution
      return;
    }

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
           attributes: ['id', 'patient_name', 'title', 'text', 'patient_id', 'user_id', 'created_at', 'user_name'  ]
         }
       ]
    })
    
    if (!dbUserData) {
      // if no user is found, return an error
      res.status(404).json({ message: 'No user found with this id' });
      // halts further code execution
      return;
    }
    
    // otherwise, return the data for the requested user
    const patient = dbPatientData.get({ plain: true });
    const user = dbUserData.get({ plain: true });
    res.render('patientdetails', { patient, user, logged_in: true });
  } catch (err) {
      // if there is a server error, return that error
      console.log(err);
      res.status(500).json(err);
  }
});

// POST /api/patients -- add a new user
router.post('/', (req, res) => {
  // create method
  Patient.create({
    name: req.body.name,
    birth_date: req.body.birth_date,
    email: req.body.email,
    address: req.body.address,
    location_zip: req.session.location_zip,
    doctor_id: req.session.user_id
   
  })
    // send the patient data back to the client as confirmation and save the session
    .then(dbPatientData => {res.json(dbPatientData)})

    // if there is a server error, return that error
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/patients/1 -- update an existing user
router.put('/update/:id', (req, res) => {
    // update method

    // if req.body has exact key/value pairs to match the model, 
    // you can just use `req.body` instead of calling out each property,
    // allowing for updating only key/value pairs that are passed through
    Patient.update(req.body, {
        // since there is a hook to hash only the password, the option is noted here
        individualHooks: true,
        // use the id as the parameter for the individual user to be updated
        where: {
            id: req.params.id
        }
    })
      .then(dbPatientData => {
        if (!dbPatientData[0]) {
          res.status(404).json({ message: 'No patient found with this id' });
          return;
        }
        res.json(dbPatientData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

// DELETE /api/users/1 -- delete an existing user
router.delete('/delete/:id', withAuth, (req, res) => {
    // destroy method
    Patient.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPatientData => {
        if (!dbPatientData) {
          res.status(404).json({ message: 'No patient found with this id' });
          return;
        }
        res.json(dbPatientData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;