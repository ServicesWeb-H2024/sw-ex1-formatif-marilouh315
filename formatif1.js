const express = require('express');
const morgan = require('morgan');

// Créer une application express
const app = express();
const PORT = 3000;

const routeNetflix = require('./src/routes/netflix.route.js');

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/titres', routeNetflix);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});