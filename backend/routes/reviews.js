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
  const { title, content, picker } = req.body;
  const sql = 'INSERT INTO reviews (title, content, picker) VALUES (?, ?, ?)';

  db.run(sql, [title, content, picker], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, content, picker });
  });
});

// DELETE route to remove a review
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM reviews WHERE id = ?';
  const { id } = req.params; // Get the review ID from the request parameters

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Review not found' }); // Handle case where no rows were deleted
    }
    res.status(204).send(); // Send a No Content status response
  });
});

module.exports = router;
