const { Op } = require('sequelize');
const { Voitures, Categories } = require('../models');
const { matchedData } = require('express-validator');
const liste = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page,10) || 1);
    const limite = Math.min(100, Math.max(1, parseInt(req.query.limite,10) || 10));
    const where = {};
    if (req.query.categorie_id) where.categorie_id = req.query.categorie_id;
    if (req.query.marque) where.marque = { [Op.like]: `%${req.query.marque}%` };
    const r = await Voitures.findAndCountAll({ where, include: [Categories], limit: limite, offset: (page-1)*limite, order: [['id','ASC']] });
    res.json({ total: r.count, page, totalPages: Math.ceil(r.count/limite), donnees: r.rows });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
exports.getTous = liste;
exports.getUn = async (req,res) => {
  try { const v = await Voitures.findByPk(req.params.id, { include: [Categories] }); return v ? res.json(v) : res.status(404).json({ message: 'Voiture introuvable' }); }
  catch(e) { res.status(500).json({ message: e.message }); }
};
exports.ajouter = async (req,res) => {
  try {
    const data = matchedData(req, { locations: ['body'] });
    if(req.file) data.photo = '/uploads/' + req.file.filename;
    const voiture = await Voitures.create(data); res.status(201).json(voiture);
  } catch(e) { res.status(400).json({ message: e.message }); }
};
exports.modifier = async (req,res) => {
  try {
    const v = await Voitures.findByPk(req.params.id);
    if(!v) return res.status(404).json({ message: 'Voiture introuvable' });
    const data = matchedData(req, { locations: ['body'] });
    if(req.file) data.photo = '/uploads/' + req.file.filename;
    await v.update(data); res.json(v);
  } catch(e) { res.status(400).json({ message: e.message }); }
};
exports.supprimer = async(req,res) => {
  try { const v = await Voitures.findByPk(req.params.id); if(!v) return res.status(404).json({ message: 'Voiture introuvable' }); await v.destroy(); res.json({ message: 'Voiture supprimee' }); }
  catch(e) { res.status(400).json({ message: e.message }); }
};
