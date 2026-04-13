const express = require('express');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcryptjs'); //  To hash passwords
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  defaultLayout: 'main',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//CONNECT TO THE DB

const pgp = require('pg-promise')();

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

  //authentication

  app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

  function isAuthenticated(req, res, next) {
  if (req.session.user && req.session.user) {
    return next(); // user is logged in, proceed
  }
  res.redirect('/login'); // user not logged in, redirect
}

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.isLoggedIn = !!req.session.user;
  next();
});

app.get('/', async (req, res) => {
  res.status(200);
  res.redirect('/home');
});

//render home page
app.get('/home', (req, res) => {
  res.status(200);
  res.render('pages/home', { title: 'Home'});
  
});

app.get('/api/bugs', async (req, res) => {
  try {
    const bugs = await db.any('SELECT * FROM bug_info');
    res.json(bugs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching bugs');
  }
});

//bugidex

app.get('/bug-i-dex', async (req, res) => {
  try {
    const bugs = await db.any('SELECT * FROM bug_info ORDER BY bug_id ASC');

    res.render('pages/bug-i-dex', {
      title: 'bug-i-dex',
      bugs
    });

  } catch (error) {
    console.error('Error loading bugs:', error);
    res.redirect('/home');
  }
});
//SUBMISSION


//enable form parsing:
app.use(express.urlencoded({ extended: true }));

//render submit page
app.get('/submit',  isAuthenticated,(req, res) => {

  try {
  console.log("SUBMIT ROUTE HIT");
  res.render('pages/submit', { title: 'Submit'});
  } catch (error) {
    console.error('you must register first', error);

    res.redirect('/register')
  }
});

// extract from page:
app.post('/submit', async (req, res) => {
  try {
  // 1️ Extract information from the form
  const {common_name, genus, color, latitude, longitude} = req.body;
  //2 Put it into the DB
  const query = 'INSERT INTO bug_info(common_name, genus, color, latitude, longitude) VALUES($1, $2, $3, $4, $5)';

  await db.none(query, [common_name, genus, color, latitude, longitude]);
  //go to map when done
  res.redirect('/map');
  } catch (error){
    console.error('Error inputing bug:', error);
    // 5️ If insert fails, redirect back to register page
    res.redirect('/submit');
  }
});

//register routes

app.get('/register', (req, res) => {
  console.log("SUBMIT ROUTE HIT");
  res.render('pages/register', { title: 'Register'});
});

  // Register - POST route
app.post('/register', async (req, res) => {
  try {
    // 1️ Extract username and password from form
    const { username, password } = req.body;

    // 2️ Hash the password with bcrypt
    const hash = await bcrypt.hash(password, 10);

    // 3️ Insert username and hashed password into 'users' table
    const query = 'INSERT INTO users(username, password) VALUES($1, $2)';
    await db.none(query, [username, hash]);

    // 4️ Redirect to login page if successful
    res.redirect('/login');
  } catch (error) {
    console.error('Error registering user:', error);

    // 5️ If insert fails, redirect back to register page
    res.redirect('/register');
  }
});

//LOGIN STUFF

app.get('/login', async(req, res) => {
  res.render('pages/login', {title: 'Login'});
});


app.post('/login', async(req, res) => {
  //Check db for user
  try {
    const { username, password } = req.body;
    const user = await db.one('SELECT * FROM users WHERE username = $1 LIMIT 1', [username]);
  } catch (e) { 
    res.status(401);
    console.error('Error during login:', e);
    return res.render('pages/login', {
      title: 'Login',
      message: 'User not found. If you do not have an account, please register here: ',
      errBtnMsgRgstr: "", //treated as conditional in login.hbs to show register button
      error: "error" //error field for formatting without giving away any sensitive information
    });
  }
  //hash given password and compare with saved hash
  try{
    const match = await bcrypt.compare(password, user.password);
  } catch (e) {
    console.error('Error comparing passwords:', e);
    res.status(500);
    return res.render('pages/login', {
      title: 'Login',
      message: 'Wrong password. Please try again.',
      error: "error"
    });
  }
  if (!match) { // user not found
    res.status(401);
    return res.render('pages/login', {
      title: 'Login',
      message: 'Incorrect username or password.',
      error: "error"
    });
  }
  //rejoice! the user is found
  try{
    req.session.user = {
      id: user.id,
      username: user.username
    };
  } catch (e) {
    console.error('Error setting session:', e);
    res.status(500); 
    req.session.save(() => {
      res.redirect('/home');
    });
  }
  return;
});


//logout
app.get('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      // fallback: redirect to home or login if session cannot be destroyed
      return res.redirect('/login');
    }

    // Render logout page with message
    res.render('pages/logout', {
      title: 'Logout',
    });
  });
});

//get map request
app.get('/map', (req, res) => {
  res.render('pages/map');
});

//allows access to map.js
app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/home');
});