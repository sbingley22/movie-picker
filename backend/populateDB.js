// populateDB.js
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt')

const populateDB = () => {
  // Path to the database file
  const dbPath = path.join(__dirname, 'data', 'database3.sqlite');

  // Create or open the database
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database ' + err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });

  db.serialize(() => {
    // Check if the reviews table exists, if not create it
    db.run(`CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      picker TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('Error creating reviews table: ' + err.message);
      } else {
        console.log('Reviews table created or already exists.');

        const defaultReviews = [
          ["His House", "Mum wasn't too fussed [5], Sean thought it was ok, Silent Hill vibe to it [7], Lee really liked it [9]", "Mum"],
          ["Omen 2", "Parents really liked it, Sean and Lee thought it was just ok, a bit like a prerunner to Final Destination", "Mum"],
          ["Omen", "Parents really liked it, Sean and Lee thought it was pretty good", "Dad"],
        ];

        // Insert default entries if the table is empty
        const insertDefaultReviews = `INSERT INTO reviews (title, content, picker) VALUES (?, ?, ?)`;

        defaultReviews.forEach(review => {
          db.run(insertDefaultReviews, review, function(err) {
            if (err) {
              console.error('Error inserting default entry: ' + err.message);
            } else {
              console.log(`Inserted ${this.changes} default entry: ${review[0]}`);
            }
          });
        });
      }
    });

    // Check if the users table exists, if not create it
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Error creating users table: ' + err.message);
      } else {
        console.log('Users table created or already exists.');

        
        // Hash and insert the admin password
        const hashedPassword = bcrypt.hashSync("password", 10);
        const insertAdmin = `INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`;
        db.run(insertAdmin, ["admin", hashedPassword], (err) => {
          if (err) {
            console.error('Error inserting default admin user: ' + err.message);
          } else {
            console.log('Default admin account created with username: "admin" and password: "password"');
          }
        });
      }
    });
  });
}

module.exports = populateDB;
