const express = require('express');
const router = express.Router();
const path = require('path');

// Liste des utilisateurs actifs
let activeUsers = [];

// Fonction pour obtenir l'adresse IP du socket
const getIp = (socket) => {
    const ip = socket.request.connection.remoteAddress;
    return ip.startsWith('::ffff:') ? ip.substr(7) : ip;
};

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'session.html'));
});

router.get('/data', (req, res) => {
    res.json(activeUsers);
});

module.exports = { router, activeUsers, getIp };
