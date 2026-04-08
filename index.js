// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require('express'); // To build an application server or API
const app = express();
const handlebars = require('express-handlebars'); //to enable express to work with handlebars
const Handlebars = require('handlebars'); // to include the templating engine responsible for compiling templates
const path = require('path');
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bodyParser = require('body-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcryptjs'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part C.

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
});

// database configuration
const dbConfig = {
  host: 'db', // the database server
  port: 5432, // the database port
  database: process.env.POSTGRES_DB, // the database name
  user: process.env.POSTGRES_USER, // the user account to connect with
  password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
  .then(obj => {
    console.log('Database connection successful'); // you can view this message in the docker compose logs
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

// initialize session variables
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

async function loadTemplate(path) {
  const res = await fetch(path);
  return await res.text();
}

async function init() {
  const basePath = window.location.pathname.includes('/map-wip/') ? '../' : '/';
  const navbarSource = await loadTemplate(basePath + 'handlebar/navbar.hbs');
  const mainSource = await loadTemplate(basePath + 'handlebar/main.hbs');

  const navbarTemplate = Handlebars.compile(navbarSource);
  const mainTemplate = Handlebars.compile(mainSource);

  const navbarHTML = navbarTemplate({
    links: [
      { name: "Home", url: "/" },
      { name: "about", url: "#" },
      { name: "Leaderboards", url: "#" },
      { name: "Login/out(fill later)", url: "#" },
      { name: "map WIP", url: "/map-wip/mapWip.html" }
    ]
  });

  const finalHTML = mainTemplate({
    navbar: navbarHTML
  });

  document.getElementById('navhtml').innerHTML = finalHTML;
}

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(req.body.password, 10);
  
  await user.save();
  res.status(201).send('User registered');
}