const express = require('express');
const router = express.Router();
const db = require('./database');

// Signup route
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Failed to register user' });
        }
        res.status(200).json({ message: 'User registered successfully', userId: this.lastID });
    });
});

// Update user
router.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    db.run('UPDATE users SET username = ?, password = ? WHERE id = ?', [username, password, id], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Failed to update user' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    });
});



// Message route
router.post('/messages', (req, res) => {
    const { senderId, recipientId, content } = req.body;
    db.run('INSERT INTO messages (senderId, recipientId, content) VALUES (?, ?, ?)', [senderId, recipientId, content], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Failed to send message' });
      }
      res.status(200).json({ message: 'Message sent successfully', messageId: this.lastID });
    });
  });

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed' });
      }
      if (!row) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      res.status(200).json({ message: 'Login successful', userId: row.id });
    });
  });
  

// Get all users
router.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to retrieve users' });
        }
        res.status(200).json(rows);
    });
});


module.exports = router;
