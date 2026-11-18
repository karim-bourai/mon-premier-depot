require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/roles', require('./routes/rolesRoutes'));
app.use('/api/utilisateurs', require('./routes/utilisateursRoutes'));
app.use('/api/categories', require('./routes/categoriesRoutes'));
app.use('/api/voitures', require('./routes/voituresRoutes'));
app.use('/api/reservations', require('./routes/reservationsRoutes'));
app.use('/api/paiements', require('./routes/paiementsRoutes'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.use((req, res) => res.status(404).json({ message: 'Route introuvable' }));
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ message: err.status ? err.message : 'Erreur du serveur' });
});

const PORT = process.env.PORT || 3000;
sequelize.authenticate()
  .then(() => app.listen(PORT, () => console.log(`Serveur demarre sur http://localhost:${PORT}`)))
  .catch(err => { console.error('Connexion MySQL impossible :', err.message); process.exit(1); });
