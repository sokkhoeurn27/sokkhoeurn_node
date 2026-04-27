const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

// GET all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  db.query(
    'SELECT * FROM users WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(results[0]);
    }
  );
});

// CREATE user
app.post('/users', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  db.query(
    'INSERT INTO users (name) VALUES (?)',
    [req.body.name],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        id: result.insertId,
        name: req.body.name
      });
    }
  );
});

// UPDATE user
app.put('/users/:id', (req, res) => {
  db.query(
    'UPDATE users SET name = ? WHERE id = ?',
    [req.body.name, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ id: req.params.id, name: req.body.name });
    }
  );
});

// DELETE user
app.delete('/users/:id', (req, res) => {
  db.query(
    'DELETE FROM users WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
    }
  );
});

app.listen(3002, () => {
  console.log('Server running on http://localhost:3002');
});