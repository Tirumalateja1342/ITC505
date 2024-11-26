const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Routes
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Serve static files
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// POST handler for mad lib submission
server.post('/ITC505/lab-7/index.html', (req, res) => {
  const { adjective, noun, verb, place, pluralNoun } = req.body;

  if (!adjective || !noun || !verb || !place || !pluralNoun) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
    return;
  }

  const madLib = `Once upon a time, in a ${adjective} ${place}, there lived a ${noun} who loved to ${verb}. This ${noun} had many ${pluralNoun} and they all lived happily ever after.`;
  res.send(`
    <h1>Submission Successful</h1>
    <p>${madLib}</p>
    <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
  `);
});

// Start server
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}
server.listen(port, () => console.log(`Ready on localhost:${port}`));
