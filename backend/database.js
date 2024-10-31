const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database file if it doesn't exist
//const dbPath = path.join(__dirname, 'database.sqlite');
const dbPath = process.env.DATABASE_URL || path.join(__dirname, 'data', 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;
