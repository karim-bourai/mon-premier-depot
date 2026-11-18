const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Roles, Utilisateurs } = require('../models');
const { matchedData } = require('express-validator');

exports.inscription = async (req, res) => {
  try {
    const { prenom, nom, email, mot_de_passe } = matchedData(req);
    const existe = await Utilisateurs.findOne({ where: { email } });
    if (existe) return res.status(409).json({ message: 'Email deja utilise' });
    const [role] = await Roles.findOrCreate({ where: { nom_role: 'Client' }, defaults: { nom_role: 'Client' } });
    const hash = await bcrypt.hash(mot_de_passe, 10);
    const u = await Utilisateurs.create({ prenom, nom, email, mot_de_passe: hash, role_id: role.id });
    res.status(201).json({ id: u.id, prenom: u.prenom, nom: u.nom, email: u.email, role: 'Client' });
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.connexion = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) return res.status(500).json({ message: 'JWT_SECRET manquant dans .env' });
    const { email, mot_de_passe } = matchedData(req);
    const u = await Utilisateurs.findOne({ where: { email }, include: [{ model: Roles }] });
    if (!u || !(await bcrypt.compare(mot_de_passe, u.mot_de_passe))) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    const token = jwt.sign({ id: u.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, utilisateur: { id: u.id, prenom: u.prenom, nom: u.nom, email: u.email, role: u.Role?.nom_role } });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
exports.profil = (req, res) => res.json({ id: req.utilisateur.id, prenom: req.utilisateur.prenom, nom: req.utilisateur.nom, email: req.utilisateur.email, role: req.nomRole });
