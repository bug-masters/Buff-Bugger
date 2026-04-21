const express = require('express');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcryptjs'); //  To hash passwords
const handlebars = require('express-handlebars');
const path = require('path');
const { hash } = require('crypto');
const axios = require('axios');

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

// setup image storage
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'public/images/');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname+"-"+Date.now());
  }
});
const maxSize = 12 * 1024 * 1024; // 12MB
const upload = multer({
  storage: storage,
  limits: {fileSize: maxSize},
  fileFilter: function(req, file, cb){
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if(mimetype && extname){
      return cb(null, true);
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes);
  }
}).single('bugImage');

// database configuration
const dbConfig = {
  host: process.env.DB_HOST, // the database server
  port: process.env.PORT, // the database port
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
    const bugs = await db.any(`
      SELECT 
        b.common_name,
        b.genus,
        b.color,
        p.coords[0] AS longitude,
        p.coords[1] AS latitude
      FROM posts p
      JOIN bug_info b ON p.bug_id = b.bug_id
    `);

    res.json(bugs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching bugs');
  }
});

app.get('/leaderboard', async (req, res) => {
  try {
    const users = await db.any(`
      SELECT u.username,
             COUNT(utp.post_id) AS post_count,
             RANK() OVER (ORDER BY COUNT(utp.post_id) DESC) AS rank
      FROM users u
      LEFT JOIN user_to_post utp ON utp.user_id = u.username
      GROUP BY u.username
      ORDER BY post_count DESC;
    `);

    res.render('pages/leaderboard', { users });

  } catch (err) {
    console.error("LEADERBOARD ERROR:", err);
    res.status(500).send('Error loading leaderboard');
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await db.any('SELECT * FROM users');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching users');
  }
});

//bugidex

app.get('/bug-i-dex', async (req, res) => {
  try {
    const username = req.session.user ? req.session.user.username : '';
    const bugs = await db.any(`
      SELECT b.bug_id,
             b.common_name,
             b.genus,
             b.color,
             b.image_url,
             EXISTS (
               SELECT 1 FROM posts p
               JOIN user_to_post utp ON utp.post_id = p.id
               WHERE p.bug_id = b.bug_id AND utp.user_id = $1
             ) AS caught
      FROM bug_info b
      ORDER BY b.bug_id ASC
    `, [username]);

    res.render('pages/bug-i-dex', {
      title: 'bug-i-dex',
      bugs
    });

  } catch (error) {
    console.error('Error loading bugs:', error);
    res.redirect('/home');
  }
});

//enable form parsing:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// chatbot proxy to Anthropic API
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const username = req.session.user ? req.session.user.username : '';

    const caughtBugs = await db.any(`
      SELECT b.common_name, b.genus, b.color
      FROM bug_info b
      WHERE EXISTS (
        SELECT 1 FROM posts p
        JOIN user_to_post utp ON utp.post_id = p.id
        WHERE p.bug_id = b.bug_id AND utp.user_id = $1
      )
    `, [username]);

    const systemPrompt =
      `You are a friendly entomology assistant inside the Buff-Bugger app. ` +
      `The user has caught these species: ` +
      (caughtBugs.length
        ? caughtBugs.map(b => `${b.common_name} (${b.genus}, ${b.color})`).join('; ')
        : 'none yet') +
      `. Answer concisely.`;

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: systemPrompt,
        messages,
      },
      {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
      }
    );

    res.json({ reply: response.data.content[0].text });
  } catch (err) {
    console.error('Chat error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Chat error' });
  }
});

//render submit page
app.get('/submit', isAuthenticated, async (req, res) => {
  try {
    const bugs = await db.any('SELECT bug_id, common_name, genus FROM bug_info ORDER BY common_name ASC');
    res.render('pages/submit', { title: 'Submit', bugs });
  } catch (error) {
    console.error('Error loading species list:', error);
    res.redirect('/home');
  }
});

// extract from page:
app.post('/submit', upload, async (req, res) => {
  try {
    const { bug_id, latitude, longitude, comments } = req.body;

    // 2 Insert into posts using POINT
    const post = await db.one(
      `INSERT INTO posts (coords, bug_id, comments)
       VALUES (POINT($1, $2), $3, $4)
       RETURNING id`,
      [longitude, latitude, bug_id, comments]
    );

    await db.none(
      `INSERT INTO user_to_post (user_id, post_id)
       VALUES ($1, $2)`,
      [req.session.user.username, post.id]
    );

    res.redirect('/bug-i-dex');

  } catch (error) {
    console.error('Error inputting bug:', error);
    res.redirect('/submit');
  }
});

//register routes

app.get('/register', (req, res) => {
  console.log("SUBMIT ROUTE HIT");
  res.render('pages/register', { title: 'Register'});
});

  // Register - POST route
app.post('/register', async(req, res) => {
  // email is valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!req.body.email || !emailRegex.test(req.body.email)) {
    return res.status(400).render('pages/register', {
      title: 'Register',
      message: 'Invalid email',
      error: "error",
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
  }
  // password not strong enough
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!req.body.password || !strongPasswordRegex.test(req.body.password)) {
    return res.status(400).render('pages/register', {
      title: 'Register', 
      message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
      error: "error",
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
  }
  // passwords do not match
  if(req.body.password !== req.body.confirmPassword){
    return res.status(400).render('pages/register', {
      title: 'Register', 
      message: 'Passwords do not match.', 
      error: "error",
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
  }
  // email already in use
  try{
    const emailCheck = await db.one('SELECT COUNT(*) FROM users WHERE email = $1', [req.body.email]);
    if (parseInt(emailCheck.count) > 0) {
      return res.status(400).render('pages/register', {
        title: 'Register', 
        message: 'Email already in use.', 
        error: "error",
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
    }
  } catch (e) {
    console.error('Error checking email:', e);
    return res.status(500).render('pages/register', {
      title: 'Register',
      message: 'An error occurred. Please try again.',
      error: "error",
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
  }
  // username already in use
  try{
    const usernameCheck = await db.one('SELECT COUNT(*) FROM users WHERE username = $1', [req.body.username]);
    if (parseInt(usernameCheck.count) > 0) {
      return res.status(400).render('pages/register', {
        title: 'Register', 
        message: 'Username already in use.', 
        error: "error",
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
    }
  } catch (e) {
    console.error('Error checking username:', e);
    return res.status(500).render('pages/register', {
      title: 'Register',
      message: 'An error occurred. Please try again.',
      error: "error",
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
  }
  // username too short
  if(req.body.username.length < 3){
    return res.status(400).render('pages/register', {
      title: 'Register',
      message: 'Username must be at least 3 characters long.',
      error: "error",
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
  }
  let hash = null;
  try{
    hash = await bcrypt.hash(req.body.password, 10);
  }
  catch(e){
    console.error(e);
    return res.status(500).render('pages/register', {
      title: 'Register',
      message: 'An error occurred. Please try again.',  
      error: "error",
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
  }
  await db.none(`INSERT INTO users (username, password, email) VALUES ($1, $2, $3);`, [req.body.username, hash, req.body.email]);
  //session variables because we don't confirm accounts through email... yet‽
  
  req.session.regenerate((err) => {
      if (err) {
          console.error('Session regenerate error:', err);
          return res.render('pages/login', {
              title: 'Login',
              message: 'An error occurred. Please try again.',
              error: "error"
          });
      }
      req.session.user = {
          username: req.body.username
      };
      req.session.save((err) => {
          if (err) {
              console.error('Session save error:', err);
              return res.render('pages/login', {
                  title: 'Login',
                  message: 'An error occurred. Please try again.',
                  error: "error"
              });
          }
          res.redirect('/home');
      });
  })
  return res.status(200).render('pages/register', {
    title: 'Register',
    message: 'Registration successful! You are now logged in.',
  });
});

app.get('/login', async(req, res) => {
  res.render('pages/login', {title: 'Login'});
});

app.post('/login', async(req, res) => {
  //Check db for user
  let user = null;
  try {
    user = await db.one('SELECT * FROM users WHERE username = $1 LIMIT 1', [req.body.username]);
  } catch (e) { 
    res.status(401);
    return res.render('pages/login', {
      title: 'Login',
      message: 'User not found. If you do not have an account, please register here: ',
      errBtnMsgRgstr: ".", //treated as conditional in login.hbs to show register button
      error: "error" //error field for formatting without giving away any sensitive information
    });
  }
  //hash given password and compare with saved hash
  let match = null
  try{
    match = await bcrypt.compare(req.body.password, user.password);
  } catch (e) {
    console.error('Error comparing passwords:', e);
    res.status(500);
    return res.render('pages/login', {
      title: 'Login',
      message: 'Wrong password. Please try again.',
      error: "error"
    });
  }
  // user not found (just in case)
  if (!match || match === null) {
    res.status(401);
    return res.render('pages/login', {
      title: 'Login',
      message: 'Incorrect username or password.',
      error: "error"
    });
  }
  //rejoice! the user is found
  req.session.regenerate((err) => {
      if (err) {
          console.error('Session regenerate error:', err);
          return res.render('pages/login', {
              title: 'Login',
              message: 'An error occurred. Please try again.',
              error: "error"
          });
      }
      req.session.user = {
          username: user.username
      };
      req.session.save((err) => {
          if (err) {
              console.error('Session save error:', err);
              return res.render('pages/login', {
                  title: 'Login',
                  message: 'An error occurred. Please try again.',
                  error: "error"
              });
          }
          res.redirect('/home');
      });
  });
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

app.post('/upload', function(req, res, next){
  upload(req, res, function(err){
    if(err){
      console.error('Error uploading file:', err);
      return res.status(400).render('pages/submit', {
        title: 'Submit',
        message: 'Error uploading file: ' + err,
        error: "error"
      });
    }
  });
});

//allows access to map.js
// app.use(express.static(path.join(__dirname, '../public')));

app.use('/css', express.static(path.join(__dirname, 'resources/css')));
app.use('/js', express.static(path.join(__dirname, 'resources/js')));

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/home');
});