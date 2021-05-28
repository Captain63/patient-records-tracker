// Dependencies
// Express.js connection
const router = require('express').Router();
// Patient models
const { Record, Patient, User } = require('../../models');
// Authorization Helper
const withAuth = require('../../utils/auth');

// Routes

// api/record/create


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
    include: [
      {
        model: Patient,
        attributes: ['id', 'name', 'birth_date', 'email', 'address' , 'doctor_id' , 'location_zip']
      },
      {
        model: Record,
        attributes: ['id', 'patient_name', 'title', 'text', 'patient_id', 'user_id', 'created_at', 'user_username' , 'user_name'  ]
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
      res.render('createrecord', { user, logged_in: true });
    })
    .catch(err => {
      // if there is a server error, return that error
      console.log(err);
      res.status(500).json(err);
    });
})

// create new record
router.post('/', withAuth, (req, res) => {
  // expects object of the form {title: 'Sample Title Here', post_text: 'Here's some sample text for a post.', user_id: 1}
  Record.create({
      patient_name: req.body.patient_name,
      patient_id: req.body.patient_id,
      title: req.body.title,
      text: req.body.text,
      user_id: req.session.user_id,
      user_username: req.session.username,
      user_name: req.session.name
  })
  .then(dbRecordData => res.json(dbRecordData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/create/:id', withAuth , async (req, res) => {
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
           attributes: ['id', 'patient_name', 'title', 'text', 'patient_id', 'user_id', 'created_at' , 'user_name' ]
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
    res.render('createrecord', { patient, user, logged_in: true });
  } catch (err) {
      // if there is a server error, return that error
      console.log(err);
      res.status(500).json(err);
  }
});


router.get('/all', withAuth , async (req, res) => {
  try {
    // Access the User model and run the findOne() method to get a single user based on parameters
    const dbRecordData = await Record.findAll({
      // Query configuration
      // From the Post table, include the post ID, URL, title, and the timestamp from post creation
      attributes: [
        'id',
        'patient_name',
        'title',
        'text',
        'patient_id',
        'user_id',
        'created_at',
        'user_username',
        'user_name' ,
      ],
      order: [
        ['created_at', 'DESC'],
      ],
      include: [
        {
          model: Patient,
          attributes: [
            'id',
            'name',
            'birth_date',
            'email',
            'address',
            'doctor_id',
            'location_zip',
          ]
        },
      ]
    })

    if (!dbRecordData) {
      // if no user is found, return an error
      res.status(404).json({ message: 'No Record found with this id' });
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
       ]
    })
    
    if (!dbUserData) {
      // if no user is found, return an error
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }


    const dbPatientData = await Patient.findAll({
      // when the data is sent back, exclude the password property
      attributes: [
        'id',
        'name',
        'birth_date',
        'email',
        'address',
        'doctor_id',
        'location_zip',
      ],
      order: [
        [ 'name', 'ASC']
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
        }
      ]
    })
    if (!dbPatientData) {
      // if no user is found, return an error
      res.status(404).json({ message: 'No Patient found with this id' });
      // halts further code execution
      return;
    }
    
    console.log(session.viewAll)
    // otherwise, return the data for the requested user
    const patients = dbPatientData.map(patient => patient.get({ plain: true }));
    const records = dbRecordData.map(record => record.get({ plain: true }));
    const user = dbUserData.get({ plain: true });
    res.render('allrecords', { records, patients , user , logged_in: true, viewAll: true });
  } catch (err) {
      // if there is a server error, return that error
      console.log(err);
      res.status(500).json(err);
  }
});


router.get('/edit/:id', withAuth , async (req, res) => {
  try {
    // Access the User model and run the findOne() method to get a single user based on parameters
    const dbRecordData = await Record.findOne({
      // when the data is sent back, exclude the password property
      where: {
        // use id as the parameter for the request
        id: req.params.id
      },
      attributes: [
        'id',
        'patient_name',
        'title',
        'text',
        'patient_id',
        'user_id',
        'created_at',
        'user_username',
        'user_name' ,
      ],
      include: [
        {
          model: Patient,
          attributes: [
            'id',
            'name',
            'birth_date',
            'email',
            'address',
            'doctor_id',
            'location_zip',
          ]
        },
      ]
    })

    if (!dbRecordData) {
      // if no user is found, return an error
      res.status(404).json({ message: 'No record found with this id' });
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
    const record = dbRecordData.get({ plain: true });
    const user = dbUserData.get({ plain: true });
    res.render('editrecord', { record, user, logged_in: true });
  } catch (err) {
      // if there is a server error, return that error
      console.log(err);
      res.status(500).json(err);
  }
});

// PUT api/record/1-- update a post's title or text
router.put('/update/:id', withAuth, (req, res) => {
  Record.update(req.body,
      {
          where: {
              id: req.params.id
          }
      }
  )
  .then(dbRecordData => {
    if (!dbRecordData) {
      res.status(404).json({ message: 'No record found with this id' });
      return;
    } 
    res.json(dbRecordData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE api/posts/1 -- delete a post
router.delete('/delete/:id', withAuth, (req, res) => {
  Record.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbRecordData => {
      if (!dbRecordData) {
        res.status(404).json({ message: 'No record found with this id' });
        return;
      } 

      res.json(dbRecordData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;