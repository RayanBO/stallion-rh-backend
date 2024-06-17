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
  db.run('INSERT INTO messages (senderId, recipientId, content) VALUES (?, ?, ?)', [senderId, recipientId, content], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to send message' });
    }
    res.status(200).json({ message: 'Message sent successfully', messageId: this.lastID });
  });
});


// ----------------------------------------------------------------

router.post('/login', (req, res) => {
  const { interv_user, interv_psw } = req.body;
  db.all('SELECT * FROM intervenants WHERE interv_user = ?', [interv_user], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur' });
    }
    if (!rows || rows == null || rows.length == 0) {
      return res.status(200).json({ message: 'Compte inconnue' });
    }
    var intervenant = {}
    var isUserValide = false

    rows.forEach(row => {
      if (row.interv_psw == interv_psw) {
        intervenant = row
        isUserValide = true
      }
    });

    if (isUserValide) {
      return res.status(200).json({ message: 'success', intervenant: intervenant });
    } else {
      return res.status(200).json({ message: 'Mot de passe incorrect ' });
    }
  });
});


// Get all habilitation
router.post('/habilitation', (req, res) => {
  const query = `
    SELECT 
    t.typo_lib,
    t.typo_code,
    (SELECT ih.hab_access_statut FROM intervenants_habilitation ih 
    WHERE ih.hab_nom = t.typo_lib AND ih.interv_code = ? ORDER BY ih.hab_id DESC LIMIT 1 )
    AS hab_access_statut
    FROM 
    typologies t 
    WHERE t.typo_groupe ='HABILITATION INTERVENANT'
  `
  const { interv_code } = req.body;
  db.all(query, [interv_code], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur de select habilitation' });
    }
    res.status(200).json(rows);
  });
});



module.exports = router;
