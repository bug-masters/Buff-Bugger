const express = require('express');
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



//render home page
app.get('/home', (req, res) => {
  res.render('pages/home', { title: 'Home'});
  
});

//SUBMISSION


//enable form parsing:
app.use(express.urlencoded({ extended: true }));

//render submit page
app.get('/submit',  isAuthenticated,(req, res) => {
  console.log("SUBMIT ROUTE HIT");
  res.render('pages/submit', { title: 'Submit'});
  
});

// extract from page:
app.post('/submit', async (req, res) => {
  try {
    // 1️ Extract information from the form
    const {common_name, genus, color} = req.body;

    //2 Put it into the DB
    const query = 'INSERT INTO bug_info(common_name, genus, color) VALUES($1, $2, $3)';

   await db.none(query, [common_name, genus, color]);
    //go to map when done
    res.redirect('/map');
  } catch (error){
        console.error('Error inputing bug:', unregistered);

    // 5️ If insert fails, redirect back to register page
    res.redirect('/register');
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


app.get('/login', (req, res) => {
  res.render('pages/login', {
    title: 'Login',
    message: null // optional placeholder for messages
  });
});


app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️ Find user in the database by username
    const user = await db.oneOrNone(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (!user) {
      // 2️ User not found → redirect to register page
      return res.redirect('/register');
    }

    // 3️ Compare submitted password with hashed password in DB
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      // 4️ Password incorrect → re-render login page with message
      return res.render('pages/login', {
        title: 'Login',
        message: 'Incorrect username or password.'
      });
    }

    // 5️ Password correct → save user in session
    req.session.user = {
      id: user.id,
      username: user.username
    };

    req.session.save(() => {
      // 6️ Redirect to /discover after session is saved
      res.redirect('/discover');
    });

  } catch (error) {
    console.error('Login error:', error);
    // fallback → redirect back to login page
    res.render('pages/login', {
      title: 'Login',
      message: 'An error occurred. Please try again.'
    });
  }
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