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

init();