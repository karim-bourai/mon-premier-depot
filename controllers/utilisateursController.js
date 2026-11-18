const { Utilisateurs, Roles } = require('../models');
const bcrypt = require('bcryptjs');
const { matchedData } = require('express-validator');
const champsPublics = ['id', 'prenom', 'nom', 'email', 'role_id'];
exports.getTous = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limite = Math.min(100, Math.max(1, parseInt(req.query.limite, 10) || 10));
    const r = await Utilisateurs.findAndCountAll({ attributes: champsPublics, include: [Roles], limit: limite, offset: (page - 1) * limite, order: [['id','ASC']] });
    res.json({ total: r.count, page, donnees: r.rows });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
exports.getUn = async (req, res) => {
  try { const u = await Utilisateurs.findByPk(req.params.id, { attributes: champsPublics, include: [Roles] }); return u ? res.json(u) : res.status(404).json({ message: 'Utilisateur introuvable' }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};
exports.modifier = async (req, res) => {
  try {
    const u = await Utilisateurs.findByPk(req.params.id);
    if (!u) return res.status(404).json({ message: 'Utilisateur introuvable' });
    const data = matchedData(req, { locations: ['body'] });
    if (data.mot_de_passe) data.mot_de_passe = await bcrypt.hash(data.mot_de_passe, 10);
    await u.update(data);
    res.json({ id: u.id, prenom: u.prenom, nom: u.nom, email: u.email, role_id: u.role_id });
  } catch (e) { res.status(400).json({ message: e.message }); }
};
exports.supprimer = async (req, res) => {
  try {
    const u = await Utilisateurs.findByPk(req.params.id);
    if (!u) return res.status(404).json({ message: 'Utilisateur introuvable' });
    await u.destroy(); res.json({ message: 'Utilisateur supprime' });
  } catch (e) { res.status(400).json({ message: e.message }); }
};
