const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database'); // Assurez-vous que le chemin est correct pour votre configuration

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'import.html'));
});

router.post('/data', (req, res) => {
    const data = req.body;

    const tableName = Object.keys(data)[0];
    const records = data[tableName];

    // Créer la table si elle n'existe pas
    const columns = Object.keys(records[0]).map(col => `${col} TEXT`).join(', ');
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Erreur lors de la création de la table.');
        }

        // Insérer les données dans la table
        const placeholders = Object.keys(records[0]).map(() => '?').join(', ');
        const insertQuery = `INSERT INTO ${tableName} (${Object.keys(records[0]).join(', ')}) VALUES (${placeholders})`;

        records.forEach(record => {
            const values = Object.values(record);
            db.run(insertQuery, values, (err) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Erreur lors de l\'insertion des données.');
                }
            });
        });

        res.send('Données importées avec succès.');
    });
});

module.exports = router;
