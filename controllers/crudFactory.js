// Fonctions communes pour les API simples (Roles et Categories).
function creerCrud(Model, champs) {
  return {
    getTous: async (req, res) => {
      try {
        const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
        const limite = Math.min(100, Math.max(1, Number.parseInt(req.query.limite, 10) || 10));
        const resultat = await Model.findAndCountAll({ limit: limite, offset: (page - 1) * limite, order: [['id', 'ASC']] });
        res.json({ total: resultat.count, page, totalPages: Math.ceil(resultat.count / limite), donnees: resultat.rows });
      } catch (e) { res.status(500).json({ message: e.message }); }
    },
    getUn: async (req, res) => {
      try { const item = await Model.findByPk(req.params.id); return item ? res.json(item) : res.status(404).json({ message: 'Introuvable' }); }
      catch (e) { res.status(500).json({ message: e.message }); }
    },
    ajouter: async (req, res) => {
      try {
        const data = Object.fromEntries(champs.filter(c => req.body[c] !== undefined).map(c => [c, req.body[c]]));
        const item = await Model.create(data); res.status(201).json(item);
      } catch (e) { res.status(400).json({ message: e.message }); }
    },
    modifier: async (req, res) => {
      try {
        const item = await Model.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Introuvable' });
        const data = Object.fromEntries(champs.filter(c => req.body[c] !== undefined).map(c => [c, req.body[c]]));
        await item.update(data); res.json(item);
      } catch (e) { res.status(400).json({ message: e.message }); }
    },
    supprimer: async (req, res) => {
      try { const item = await Model.findByPk(req.params.id); if (!item) return res.status(404).json({ message: 'Introuvable' }); await item.destroy(); res.json({ message: 'Suppression reussie' }); }
      catch (e) { res.status(400).json({ message: e.message }); }
    }
  };
}
module.exports = creerCrud;
