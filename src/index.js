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

app.get('/', (req, res) => {
  res.render('pages/home');
});

app.get('/welcome', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome!',
  });
});

// Register
app.get('/register', (req, res) => {
  res.render('pages/register');
});

app.post('/register', async (req, res) => {
  //make sure email is valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!req.body.email || !emailRegex.test(req.body.email)) {
    return res.status(400).send("Invalid email format");
  }

  //hash the password using bcrypt library
  let hash = null;
  try{
    hash = await bcrypt.hash(req.body.password, 10);
  }
  catch(error){
    console.error(error);
    return res.status(400).send("Error hashing password Mismatched password");
  }
  await db.any(`INSERT INTO users (username, password) VALUES ($1, $2);`, [req.body.username, hash]);
  
  return res.status(200).json({message: 'Success'});
});

app.get('/login', (req, res) => {
  res.render('pages/login');
});

app.post('/login', async (req, res) => {
let user = null;
  try {
    user = await db.one(`SELECT * FROM users WHERE username = $1`, [req.body.username]);
  } catch (error) {
    console.error(error);
    res.render('pages/register', { message: 'No user under that name found. Register' });
    return;
  }
  if(user === null){
    res.render('pages/register', { message: 'No user under that name found. Register' });
    return;
  }
  // check if password from request matches with password in DB
  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    //save user details in session like in lab 7
    req.session.user = user;
    req.session.save();
    res.redirect('/discover');
  } else {
    res.render('pages/login', { message: 'Invalid username or password. Please try again.' });
  }
});

module.exports = app.listen(3000);
console.log('Server is listening on port 3000');