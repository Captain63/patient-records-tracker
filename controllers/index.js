// An index file to gather the routes to export to the server

// Dependencies
// Server connection
const router = require('express').Router();

// API routes folder
const apiRoutes = require('./api');
// Homepage routes
const homeRoutes = require('./homeRoutes.js');
// Homepage routes
const settingsRoutes = require('./settingsRoutes.js');

// Define the path for the server for the API routes
router.use('/api', apiRoutes);

// Define the path for the home page
router.use('/', homeRoutes);

// Define the path for the home page
router.use('/settings', settingsRoutes);

// Define a catch-all route for any resource that doesn't exist
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;