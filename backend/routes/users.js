var express = require('express');
var router = express.Router();
const db = require('../database')
const bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Login route
router.get('/login', (req, res) => {
  res.send('login get successful')
})

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT password FROM users WHERE username = ?`, [username], (err, row) => {
    if (err) {
      console.error('Error querying the database: ' + err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!row) {
      // No user found
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the stored password
    bcrypt.compare(password, row.password, (err, result) => {
      if (result) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  });
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password: ' + err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Insert user with hashed password into database
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function (err) {
      if (err) {
        console.error('Error creating user: ' + err.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});


module.exports = router;
