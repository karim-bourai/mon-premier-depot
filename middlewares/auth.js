const jwt = require('jsonwebtoken');
const { Utilisateurs, Roles } = require('../models');

async function verifierToken(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Token manquant' });
  try {
    const donnees = jwt.verify(token, process.env.JWT_SECRET);
    const utilisateur = await Utilisateurs.findByPk(donnees.id, { include: [{ model: Roles }] });
    if (!utilisateur) return res.status(401).json({ message: 'Utilisateur inconnu' });
    req.utilisateur = utilisateur;
    req.nomRole = utilisateur.Role ? utilisateur.Role.nom_role.toLowerCase() : '';
    next();
  } catch (erreur) {
    return res.status(401).json({ message: 'Token invalide ou expire' });
  }
}

function administrateur(req, res, next) {
  if (req.nomRole !== 'administrateur') return res.status(403).json({ message: 'Acces reserve aux administrateurs' });
  next();
}
module.exports = { verifierToken, administrateur };
