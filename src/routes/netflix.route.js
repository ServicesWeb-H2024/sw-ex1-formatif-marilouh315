const express = require('express');
const router = express.Router();
// À ajuster selon la structure
const netflixController = require('../controllers/netflix.controller.js');

router.get('/liste', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8'); //Permet de changer le format de réponse en html
    res.send("Allo toi");
    res.end();
});

//Afficher film ou série par son type_titre (par pagination)
router.get('/:type_titre', netflixController.selectionnerCinema);

module.exports = router;