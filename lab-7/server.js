const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Original sample route from instructions
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// ---------- Helper to render the Mad Lib page (story under button) ----------

function renderMadLibPage(formData, storyHtml = '') {
  const {
    heroName = '',
    adjective = '',
    animal = '',
    place = '',
    verb = '',
    pluralNoun = '',
  } = formData || {};

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ITC505 Lab 7: Mad Lib</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0f172a;
      color: #e5e7eb;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      text-align: center;
      padding: 1.25rem 0.75rem 0.5rem;
    }
    header h1 {
      margin: 0;
      font-size: 1.7rem;
    }
    header p {
      margin: 0.3rem 0 0;
      font-size: 0.9rem;
      color: #9ca3af;
    }
    main {
      flex: 1;
      width: min(720px, 100% - 2rem);
      margin: 0 auto 1.25rem;
    }
    .card {
      margin-top: 1rem;
      background: #020617;
      border-radius: 1rem;
      padding: 1.3rem 1.2rem 1rem;
      border: 1px solid #1f2937;
      box-shadow: 0 14px 30px rgba(0, 0, 0, 0.6);
    }
    h2 {
      margin-top: 0;
      font-size: 1.2rem;
    }
    form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.9rem 1rem;
      margin-top: 0.4rem;
    }
    @media (max-width: 600px) {
      form {
        grid-template-columns: 1fr;
      }
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    label {
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #9ca3af;
    }
    label span.req {
      color: #fbbf24;
      margin-left: 0.15rem;
    }
    input[type="text"] {
      padding: 0.55rem 0.7rem;
      border-radius: 0.6rem;
      border: 1px solid #374151;
      background: #020617;
      color: #e5e7eb;
      font-size: 0.95rem;
      outline: none;
    }
    input[type="text"]:focus {
      border-color: #fbbf24;
      box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.7);
    }
    .hint {
      grid-column: 1 / -1;
      font-size: 0.8rem;
      color: #9ca3af;
      margin: 0.1rem 0 0.35rem;
    }
    .actions {
      grid-column: 1 / -1;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-top: 0.2rem;
    }
    button[type="submit"] {
      border: none;
      border-radius: 999px;
      padding: 0.55rem 1.3rem;
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      background: linear-gradient(135deg, #fbbf24, #f97316);
      color: #111827;
      box-shadow: 0 10px 22px rgba(0, 0, 0, 0.65);
    }
    .progress {
      font-size: 0.8rem;
      color: #9ca3af;
    }
    .progress strong {
      color: #fbbf24;
    }
    .error {
      margin: 0.5rem 0 0.4rem;
      font-size: 0.85rem;
      color: #f97373;
    }
    .story {
      margin-top: 0.75rem;
      padding: 0.9rem 0.8rem;
      border-radius: 0.75rem;
      background: #020617;
      border: 1px dashed #4b5563;
      font-size: 0.95rem;
      line-height: 1.6;
    }
    .story strong {
      color: #fde68a;
    }
    .placeholder {
      color: #9ca3af;
      font-size: 0.9rem;
    }
    #addendum {
      margin-top: 0.9rem;
      font-size: 0.86rem;
      color: #9ca3af;
    }
    #addendum h3 {
      margin: 0 0 0.35rem;
      font-size: 0.95rem;
      color: #e5e7eb;
    }
    #addendum p {
      margin: 0.3rem 0;
    }
    footer {
      border-top: 1px solid #1f2937;
      padding: 0.55rem 1.3rem 0.65rem;
      font-size: 0.78rem;
      color: #9ca3af;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.4rem;
      background: #020617;
    }
    #lastModified {
      color: #fbbf24;
    }
  </style>
</head>
<body>
  <header>
    <h1>Lab 7: Mad Lib</h1>
    <p>ITC-505 &mdash; ExpressJS form + server response</p>
  </header>

  <main>
    <section class="card">
      <h2>Mad Lib Form</h2>
      <form action="/ITC505/lab-7/index.html" method="POST">
        <p class="hint">Fill all fields, then click <strong>Go Mad!</strong>. Your story will appear just below the button.</p>

        <div class="field">
          <label for="heroName">Hero's Name <span class="req">*</span></label>
          <input type="text" id="heroName" name="heroName" value="${heroName}" placeholder="e.g., Arjun" required>
        </div>

        <div class="field">
          <label for="adjective">Adjective <span class="req">*</span></label>
          <input type="text" id="adjective" name="adjective" value="${adjective}" placeholder="e.g., brave" required>
        </div>

        <div class="field">
          <label for="animal">Animal <span class="req">*</span></label>
          <input type="text" id="animal" name="animal" value="${animal}" placeholder="e.g., tiger" required>
        </div>

        <div class="field">
          <label for="place">Place <span class="req">*</span></label>
          <input type="text" id="place" name="place" value="${place}" placeholder="e.g., Flagstaff" required>
        </div>

        <div class="field">
          <label for="verb">Verb (present tense) <span class="req">*</span></label>
          <input type="text" id="verb" name="verb" value="${verb}" placeholder="e.g., dance" required>
        </div>

        <div class="field">
          <label for="pluralNoun">Plural Noun <span class="req">*</span></label>
          <input type="text" id="pluralNoun" name="pluralNoun" value="${pluralNoun}" placeholder="e.g., sandwiches" required>
        </div>

        <div class="actions">
          <button type="submit">Go Mad!</button>
          <p class="progress" id="progressText">
            Filled <strong>0</strong> / 6 fields
          </p>
        </div>
      </form>

      <!-- STORY + ADDENDUM APPEAR DIRECTLY BELOW THE BUTTON -->
      <div class="story">
        ${storyHtml || `
        <p class="placeholder">
          Your mad lib story will appear here after you submit the form. Try values like:<br>
          Name: <strong>Arjun</strong>, Adjective: <strong>brave</strong>, Animal: <strong>tiger</strong>,
          Place: <strong>Flagstaff</strong>, Verb: <strong>dance</strong>, Plural Noun: <strong>sandwiches</strong>.
        </p>
        `}
      </div>

      <div id="addendum">
        <h3>Addendum</h3>
        <p>
          This page implements a Mad Lib using an HTML <code>&lt;form&gt;</code> that sends a
          <strong>POST</strong> request back to the same URL (<code>/ITC505/lab-7/index.html</code>).
          The ExpressJS server reads the six input values from <code>req.body</code> and combines
          them into a short story.
        </p>
        <p>
          If any required field is missing, the server responds with this same page layout and an
          error message instead of the story. When all fields are filled in, the server injects the
          completed story into the HTML so it shows up directly <strong>under the submit button</strong>
          on the same page.
        </p>
        <p>
          I also added a small front-end script to count how many fields are filled and show the
          “Filled X / 6 fields” message. The required <code>document.lastModified</code> script in
          the footer displays when the page was last updated, as requested in the lab instructions.
        </p>
      </div>
    </section>
  </main>

  <footer>
    <p>Last updated: <span id="lastModified"></span></p>
    <p>ITC-505 &bull; Lab 7: Mad Lib</p>
  </footer>

  <script type="text/javascript">
    // Required Last Modified script
    var x = document.lastModified;
    document.getElementById('lastModified').textContent = x;

    // Progress counter
    const inputs = Array.from(document.querySelectorAll('input[type="text"]'));
    const progressEl = document.getElementById('progressText');

    function updateProgress() {
      const filled = inputs.filter(i => i.value.trim().length > 0).length;
      progressEl.innerHTML = 'Filled <strong>' + filled + '</strong> / ' + inputs.length + ' fields';
    }

    inputs.forEach(input => input.addEventListener('input', updateProgress));
    updateProgress();
  </script>
</body>
</html>`;
}

// ---------- POST handler for the form ----------

function handleMadLibPost(req, res) {
  const { heroName, adjective, animal, place, verb, pluralNoun } = req.body;

  // Validate all fields
  if (!heroName || !adjective || !animal || !place || !verb || !pluralNoun) {
    const errorHtml = `
      <p class="error">
        Please fill out <strong>all six</strong> fields before going mad.
      </p>`;
    const page = renderMadLibPage(req.body, errorHtml);
    res.send(page);
    return;
  }

  // Build the story
  const story = `
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
    </p>`;

  const page = renderMadLibPage(req.body, story);
  res.send(page);
}

// POST routes (same URL the form is served from)
server.post('/ITC505/lab-7/index.html', handleMadLibPost);
server.post('/ITC505/lab-7/', handleMadLibPost);

// Static files (other labs)
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Port logic from instructions
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}

server.listen(port, () => console.log('Ready on localhost!'));
