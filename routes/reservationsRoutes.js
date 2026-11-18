const router = require('express').Router();
const { body } = require('express-validator');
const c = require('../controllers/reservationsController');
const { verifierToken } = require('../middlewares/auth');
const verifier = require('../middlewares/validation');
router.use(verifierToken);
router.get('/', c.getTous);
router.get('/:id', c.getUn);
router.post('/',
  body('voiture_id').isInt({min:1}).toInt(),
  body('date_debut').isISO8601({strict:true}),
  body('date_fin').isISO8601({strict:true}), verifier, c.ajouter);
router.put('/:id',
  body('voiture_id').optional().isInt({min:1}).toInt(),
  body('date_debut').optional().isISO8601({strict:true}),
  body('date_fin').optional().isISO8601({strict:true}),
  body('statut').optional().isIn(['en_attente','confirmee','annulee']), verifier, c.modifier);
router.delete('/:id', c.supprimer);
module.exports = router;
