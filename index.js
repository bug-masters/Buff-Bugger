const express = require('express');
const pgp = require('pg-promise')();
require('dotenv').config();

const app = express();

// DB config (IMPORTANT: host is "db", not localhost)
const db = pgp({
  host: 'db',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
});

// test route
app.get('/', async (req, res) => {
  try {
    const result = await db.any('SELECT * FROM users;');
    res.send(`
      <h1>Buff Bugger Running</h1>
      <p>Users in DB: ${result.length}</p>
    `);
  } catch (err) {
    console.error(err);
    res.send('Database error');
  }
});

// start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});