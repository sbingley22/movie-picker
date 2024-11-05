const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Create a new database file if it doesn't exist
const dbPath = path.join(__dirname, 'data', 'database3.sqlite');
//const dbPath = process.env.DATABASE_URL || path.join(__dirname, 'data', 'database.sqlite')

// Ensure the data directory exists
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true }); // Create the directory if it doesn't exist
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;
