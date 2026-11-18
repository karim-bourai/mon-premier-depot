const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Bienvenue dans notre projet de conception web !');
});

app.listen(PORT, () => {
    console.log('Serveur demarre sur http://localhost:3000');
});