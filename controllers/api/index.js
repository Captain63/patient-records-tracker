const router = require('express').Router();
const userRoutes = require('./userRoutes');
const patientRoutes = require('./patientRoutes');

router.use('/users', userRoutes);

router.use('/patients', patientRoutes);

module.exports = router;
