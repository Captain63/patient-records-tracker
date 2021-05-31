// Server for MVC Patient Records

// Dependencies
// path module
const path = require('path');
// dotenv file for sensitive configuration information
require('dotenv').config();
// Express.js server
const express = require('express');
// All routes as defined in the controllers folder
const routes = require('./controllers/');
// Sequelize connection to the database
const sequelize = require('./config/connection');
// Handlebars template engine for front-end
const exphbs = require('express-handlebars');
// Express session to handle session cookies
const session = require('express-session');
// Sequelize store to save the session so the user can remain logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Handlebars helpers
const helpers = require('./utils/helpers');

// Initialize handlebars for the html templates
const hbs = exphbs.create({ helpers });

// Initialize sessions
const sess = {
    //session secret is stored in .env file as DB_SESSION_SECRET for local deployments
    secret: process.env.JAWSDB_URL ? "SUk1mfgCp290VTHNp9VQ" : process.env.DB_SESSION_SECRET,
    cookie: { 
      // 15 minutes in milliseconds
      maxAge: 900000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

// Initialize the server
const app = express();
// Define the port for the server
const PORT = process.env.PORT || 3001;

// Give the server a path to the public directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// Set handlebars as the template engine for the server
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Have Express parse JSON and string data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tell the app to use Express Session for the session handling
app.use(session(sess));

// Give the server the path to the routes
app.use(routes);

// Turn on connection to db and then to the server
// force: true to reset the database and clear all values, updating any new relationships
// force: false to maintain data - aka normal operation
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});

