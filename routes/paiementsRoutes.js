const router = require('express').Router();
const { body } = require('express-validator');
const c = require('../controllers/paiementsController');
const { verifierToken, administrateur } = require('../middlewares/auth');
const verifier = require('../middlewares/validation');
router.use(verifierToken, administrateur);
router.get('/', c.getTous);
router.get('/:id', c.getUn);
const champs = () => [
  body('reservation_id').isInt({min:1}).toInt(),
  body('montant').isFloat({gt:0}).toFloat(),
  body('date_paiement').isISO8601({strict:true}),
  body('mode_paiement').trim().notEmpty().isLength({max:50})
];
router.post('/', champs(), verifier, c.ajouter);
router.put('/:id', champs().map(champ => champ.optional()), verifier, c.modifier);
router.delete('/:id', c.supprimer);
module.exports = router;
