var express = require('express');
var router = express.Router();
const db = require('../database')

router.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM reviews'; // Query to select all entries from the reviews table

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message }); // Handle any errors
    }
    res.status(200).json(rows); // Send the array of reviews as JSON
  });
});

router.post('/', (req, res) => {
  const { title, content } = req.body;
  const sql = 'INSERT INTO reviews (title, content, picker) VALUES (?, ?, ?)';

  db.run(sql, [title, content, picker], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, content, picker });
  });
});

module.exports = router;
