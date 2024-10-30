// Initialize database schema
const db = require('./database');

db.serialize(() => {
  // Create the reviews table with the picker field
  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    picker TEXT, -- Add the optional picker field
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating table: ' + err.message);
    } else {
      console.log('Reviews table created or already exists.');

      // Insert default entries if the table is empty
      const insertDefaultReviews = `INSERT INTO reviews (title, content, picker) VALUES (?, ?, ?)`;

      db.run(insertDefaultReviews, 
        ["His House", "Mum wasn't too fussed [5], Sean thought it was ok, Silent Hill vibe to it [7], Lee really liked it [9]", "Mum"],
        function(err) {
          if (err) {
            console.error('Error inserting default entries: ' + err.message);
          } else {
            console.log(`Inserted ${this.changes} default entries.`);
          }
        });
    }
  });
});

