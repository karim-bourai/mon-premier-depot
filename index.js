const express = require('express');

const app = express();
app.use(express.static('public'));

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log('Serveur demarre sur http://localhost:3000');
});