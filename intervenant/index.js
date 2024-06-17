const express = require('express');
const router = express.Router();
const db = require('../database'); // Assurez-vous que le chemin est correct pour votre configuration


// Get all users
router.get('/listes', (req, res) => {
    db.all('SELECT * FROM intervenants', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to retrieve intervenants' });
        }
        res.status(200).json(rows);
    });
});


router.post('/new', (req, res) => {
    const sqlGetSequance = "SELECT max(interv_id)+1 AS next from intervenants"
    var id = 0
    db.all(sqlGetSequance, [], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'ERROR ON GE SEQUANCE' })
        }
        id = rows[0].next

        const {
            interv_code,
            interv_adresse,
            interv_code_activation,
            interv_date_activation,
            interv_email,
            interv_isactif,
            interv_niv_manager,
            interv_nom_prenom,
            interv_psw,
            interv_remarque,
            interv_service,
            interv_super_admin,
            interv_tel1,
            interv_tel2,
            interv_titre,
            interv_user,
            interv_ville } = req.body;

        db.run(`INSERT INTO intervenants (
            interv_id,
            interv_code,
            interv_adresse,
            interv_code_activation,
            interv_date_activation,
            interv_email,
            interv_isactif,
            interv_niv_manager,
            interv_nom_prenom,
            interv_psw,
            interv_remarque,
            interv_service,
            interv_super_admin,
            interv_tel1,
            interv_tel2,
            interv_titre,
            interv_user,
            interv_ville
            ) VALUES (?,?,?,?,? ,?,?,?,?,? ,?,?,?,?,? ,?,?,?)`, [
            id,
            interv_code,
            interv_adresse,
            interv_code_activation,
            interv_date_activation,
            interv_email,
            interv_isactif,
            interv_niv_manager,
            interv_nom_prenom,
            interv_psw,
            interv_remarque,
            interv_service,
            interv_super_admin,
            interv_tel1,
            interv_tel2,
            interv_titre,
            interv_user,
            interv_ville
        ], function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Failed to register user' });
            }
            res.status(200).json({ message: 'succes' });
        });
    })
});


router.post('/update', (req, res) => {
    const {
        interv_adresse,
        interv_code_activation,
        interv_date_activation,
        interv_email,
        interv_isactif,
        interv_niv_manager,
        interv_nom_prenom,
        interv_psw,
        interv_remarque,
        interv_service,
        interv_super_admin,
        interv_tel1,
        interv_tel2,
        interv_titre,
        interv_user,
        interv_ville,
        interv_id } = req.body;

    db.run(`UPDATE intervenants SET
            interv_adresse = ?,
            interv_code_activation = ?,
            interv_date_activation = ?,
            interv_email = ?,
            interv_isactif = ?,
            interv_niv_manager = ?,
            interv_nom_prenom = ?,
            interv_psw = ?,
            interv_remarque = ?,
            interv_service = ?,
            interv_super_admin = ?,
            interv_tel1 = ?,
            interv_tel2 = ?,
            interv_titre = ?,
            interv_user = ?,
            interv_ville = ?
            WHERE interv_id = ? `, [
        interv_adresse,
        interv_code_activation,
        interv_date_activation,
        interv_email,
        interv_isactif,
        interv_niv_manager,
        interv_nom_prenom,
        interv_psw,
        interv_remarque,
        interv_service,
        interv_super_admin,
        interv_tel1,
        interv_tel2,
        interv_titre,
        interv_user,
        interv_ville,
        interv_id
    ], function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Failed to update user' });
        }
        res.status(200).json({ message: 'succes' });
    });
});


router.post('/delete', (req, res) => {
    const { interv_id } = req.body;

    db.run(`DELETE FROM intervenants WHERE interv_id=? `, [interv_id], function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Failed to delete user' });
        }
        res.status(200).json({ message: 'succes' });
    });
});



module.exports = router;