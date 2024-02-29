const sql = require("../config/db.js");

const Netflix = (netflix) => {
    this.type_titre = netflix.type_titre
}

/**
 * Affiche un film ou une série selon son type sur plusieurs pages (s'il y a lieu)
 * @param {le type du titre de film : soit un film ou une série} type_titre
 * @returns Si fonctionne, me retourne mon résultat sinon retourne erreur
 */
Netflix.selectionnerCinema = (type_titre, offset) => {
    return new Promise((resolve, reject) => {
        const requete = 'SELECT show_id, title FROM netflix_titles WHERE show_type = ? LIMIT 10 OFFSET ?';
        const parametre_type = [type_titre, offset];

        sql.query(requete, parametre_type, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            }
            resolve(resultat);
        })
    })
}

module.exports = Netflix;