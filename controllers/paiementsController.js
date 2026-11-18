const { Paiements, Reservations } = require('../models');
const { matchedData } = require('express-validator');
exports.getTous = async(req,res) => {
  try {
    const page=Math.max(1,parseInt(req.query.page,10)||1), limite=Math.min(100,Math.max(1,parseInt(req.query.limite,10)||10));
    const r=await Paiements.findAndCountAll({include:[Reservations],limit:limite,offset:(page-1)*limite,order:[['id','DESC']]});
    res.json({total:r.count,page,donnees:r.rows});
  } catch(e) {res.status(500).json({message:e.message});}
};
exports.getUn = async(req,res) => {
  try {const p=await Paiements.findByPk(req.params.id);return p?res.json(p):res.status(404).json({message:'Paiement introuvable'});}
  catch(e){res.status(500).json({message:e.message});}
};
exports.ajouter = async(req,res) => {
  try {
    const data=matchedData(req,{locations:['body']});
    if(!(await Reservations.findByPk(data.reservation_id)))return res.status(404).json({message:'Reservation introuvable'});
    const p=await Paiements.create(data);res.status(201).json(p);
  }catch(e){res.status(400).json({message:e.message});}
};
exports.modifier = async(req,res) => {
  try {const p=await Paiements.findByPk(req.params.id);if(!p)return res.status(404).json({message:'Paiement introuvable'});await p.update(matchedData(req,{locations:['body']}));res.json(p);}
  catch(e){res.status(400).json({message:e.message});}
};
exports.supprimer = async(req,res) => {
  try {const p=await Paiements.findByPk(req.params.id);if(!p)return res.status(404).json({message:'Paiement introuvable'});await p.destroy();res.json({message:'Paiement supprime'});}
  catch(e){res.status(400).json({message:e.message});}
};
