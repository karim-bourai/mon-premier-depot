const { Op } = require('sequelize');
const { Reservations, Voitures } = require('../models');
const { matchedData } = require('express-validator');

async function conflit(voiture_id, date_debut, date_fin, saufId = null) {
  const where = {
    voiture_id,
    statut: { [Op.notIn]: ['annulee', 'Annulee', 'annulée', 'Annulée'] },
    date_debut: { [Op.lte]: date_fin },
    date_fin: { [Op.gte]: date_debut }
  };
  if (saufId) where.id = { [Op.ne]: saufId };
  return (await Reservations.count({ where })) > 0;
}
exports.getTous = async(req,res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page,10)||1);
    const limite = Math.min(100, Math.max(1, parseInt(req.query.limite,10)||10));
    const where = req.nomRole === 'administrateur' ? {} : { utilisateur_id: req.utilisateur.id };
    const r = await Reservations.findAndCountAll({ where, include: [Voitures], limit: limite, offset:(page-1)*limite, order:[['id','DESC']] });
    res.json({ total:r.count, page, donnees:r.rows });
  } catch(e) { res.status(500).json({ message:e.message }); }
};
exports.getUn = async(req,res) => {
  try {
    const r = await Reservations.findByPk(req.params.id);
    if(!r) return res.status(404).json({ message:'Reservation introuvable' });
    if(req.nomRole !== 'administrateur' && r.utilisateur_id !== req.utilisateur.id) return res.status(403).json({message:'Acces refuse'});
    res.json(r);
  } catch(e) { res.status(500).json({ message:e.message }); }
};
exports.ajouter = async(req,res) => {
  try {
    const { voiture_id, date_debut, date_fin } = matchedData(req);
    if(date_fin < date_debut) return res.status(400).json({ message:'La date de fin doit suivre la date de debut' });
    if(!(await Voitures.findByPk(voiture_id))) return res.status(404).json({message:'Voiture introuvable'});
    if(await conflit(voiture_id,date_debut,date_fin)) return res.status(409).json({message:'Voiture deja reservee pendant cette periode'});
    const r = await Reservations.create({ voiture_id, date_debut, date_fin, utilisateur_id: req.utilisateur.id, statut:'en_attente' });
    res.status(201).json(r);
  } catch(e) { res.status(400).json({ message:e.message }); }
};
exports.modifier = async(req,res) => {
  try {
    const r = await Reservations.findByPk(req.params.id);
    if(!r) return res.status(404).json({message:'Reservation introuvable'});
    if(req.nomRole !== 'administrateur' && r.utilisateur_id !== req.utilisateur.id) return res.status(403).json({message:'Acces refuse'});
    const data = matchedData(req, { locations:['body'] });
    if(req.nomRole !== 'administrateur') delete data.statut;
    const debut = data.date_debut || r.date_debut, fin = data.date_fin || r.date_fin;
    const voiture = data.voiture_id || r.voiture_id;
    if(fin < debut) return res.status(400).json({message:'Dates invalides'});
    if((data.statut || r.statut) !== 'annulee' && await conflit(voiture,debut,fin,r.id)) return res.status(409).json({ message:'Voiture deja reservee' });
    await r.update(data); res.json(r);
  } catch(e) { res.status(400).json({message:e.message}); }
};
exports.supprimer = async(req,res) => {
  try {
    const r = await Reservations.findByPk(req.params.id);
    if(!r) return res.status(404).json({message:'Reservation introuvable'});
    if(req.nomRole !== 'administrateur' && r.utilisateur_id !== req.utilisateur.id) return res.status(403).json({message:'Acces refuse'});
    // Annulation plutot que suppression, pour garder l'historique des paiements.
    await r.update({ statut:'annulee' }); res.json({message:'Reservation annulee'});
  } catch(e) { res.status(400).json({message:e.message}); }
};
