const express = require('express');
const router = express.Router();
const db = require('../database');
const fs = require('fs');
const path = require('path');
const populateDB = require('../populateDB.js')

// Path to the database file
const dbPath = path.join(__dirname, '../data', 'database3.sqlite');

// Route to rerun populate database.
router.get('/repopulatedatabase', (req, res) => {
  try {
    populateDB(); // Call the function to populate the database
    res.status(200).json({ message: 'Database repopulated successfully.' });
  } catch (error) {
    console.error('Error repopulating the database:', error);
    res.status(500).json({ error: 'Failed to repopulate the database.' });
  }
})

// Route to delete the entire database file
router.get('/deletedatabase', (req, res) => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
      return res.status(500).send('Failed to close database.');
    }

    fs.unlink(dbPath, (err) => {
      if (err) {
        console.error('Error deleting database file:', err.message);
        res.status(500).send('Failed to delete database file.');
      } else {
        console.log('Database file deleted.');
        res.send('Database deleted successfully.');
      }
    });
  });
});

// Route to delete the users table
router.get('/deleteusers', (req, res) => {
  db.run('DROP TABLE IF EXISTS users', (err) => {
    if (err) {
      console.error('Error deleting users table:', err.message);
      res.status(500).send('Failed to delete users table.');
    } else {
      console.log('Users table deleted.');
      res.send('Users table deleted successfully.');
    }
  });
});

// Route to delete the reviews table
router.get('/deletereviews', (req, res) => {
  db.run('DROP TABLE IF EXISTS reviews', (err) => {
    if (err) {
      console.error('Error deleting reviews table:', err.message);
      res.status(500).send('Failed to delete reviews table.');
    } else {
      console.log('Reviews table deleted.');
      res.send('Reviews table deleted successfully.');
    }
  });
});

module.exports = router;
