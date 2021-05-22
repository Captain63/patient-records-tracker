const router = require('express').Router();

const userRoutes = require('./userRoutes');
const patientRoutes = require('./patientRoutes');
const recordRoutes = require('./recordRoutes');

router.use('/users', userRoutes);
router.use('/patients', patientRoutes);
router.use('/records', recordRoutes);

module.exports = router;
