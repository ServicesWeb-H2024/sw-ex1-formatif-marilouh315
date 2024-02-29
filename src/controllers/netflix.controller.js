const netflixModel = require("../models/netflix.model.js");

//RETOURNER UN FILM/SÉRIE - VÉRIFICATION TYPE_TITRE(FILM OU SÉRIE)
exports.selectionnerCinema = (req, res) => {

    type_titre = req.params.type_titre.toLowerCase();
    if (type_titre == "film") {
        type_titre = "Movie";
    }
    else if (type_titre == "serie") {
        type_titre = "TV Show";
    }
    //Si c'est autre que "film" ou "serie"
    else {
        res.status(400);
        res.send({
            "erreur": `Le type '${type_titre}' est invalide : le type est autre que "film" ou "serie"`
        });
        return;
    }

    var page = parseInt(req.query.page);
    //Mettre par défaut la première page 
    if (page <= 0 || page == null || !req.query.page || isNaN(page)){
        page = 1;
    }

    const limit = 10;
    const offset = (page - 1) * limit;

    const prochain = netflix_resultat.length === limit; // Vérifie si la longueur des résultats est égale à la limite (ce qui signifie qu'il y a plus de résultats à afficher)

    let prochainURL = null;
    if (prochain) {
        prochainURL = "/api/titres/" + type_titre + "?page=" + (page + 1);
    }

    // Appel à la fonction d'afficher un film ou série
    netflixModel.selectionnerCinema(type_titre, offset)
    // Si c'est un succès
    .then((netflix_resultat) => {
        // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 400
        if (!netflix_resultat) {
            res.status(400);
            res.send({
                "erreur": `Le type '${type_titre}' est invalide`
            });
            return;
        }
        // res.send(netflix_resultat);
        res.status(200).json({
            result: netflix_resultat,
            filtre: type_titre,
            page: page,
            url_page_suivante: prochainURL
        });
    })
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération du film Netflix"
        });
    });
};
