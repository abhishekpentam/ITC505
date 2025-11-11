const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(logger('dev'));

// Sample route from instructions
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// ---------- Mad Lib API (used by fetch, NO page reload) ----------

server.post('/ITC505/lab-7/madlib', (req, res) => {
  const { heroName, adjective, animal, place, verb, pluralNoun } = req.body;

  // Basic validation
  if (!heroName || !adjective || !animal || !place || !verb || !pluralNoun) {
    return res.status(400).send(`
      <p class="error">
        Please fill out <strong>all six</strong> fields before going mad.
      </p>
    `);
  }

  // Build story HTML snippet (no full page, just the story block)
  const storyHtml = `
    <p>
      Once upon a chilly evening in <strong>${place}</strong>, there lived a very
      <strong>${adjective}</strong> <strong>${animal}</strong> named
      <strong>${heroName}</strong>.
    </p>
    <p>
      Every day, ${heroName} loved to <strong>${verb}</strong> with a pile of
      <strong>${pluralNoun}</strong>, which always made the neighbors laugh.
      One day, ${heroName} brought those ${pluralNoun} to campus in
      <strong>${place}</strong> so every ITC-505 student could take a break,
      smile, and remember that even web servers can tell silly stories.
    </p>
  `;

  res.send(storyHtml);
});

// ---------- Static files (serves index.html, other labs, etc.) ----------

const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Port logic from instructions
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}

server.listen(port, () => console.log('Ready on localhost!'));
