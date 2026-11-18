const router = require('express').Router();
const { body } = require('express-validator');
const c = require('../controllers/utilisateursController');
const { verifierToken, administrateur } = require('../middlewares/auth');
const verifier = require('../middlewares/validation');
router.use(verifierToken, administrateur);
router.get('/', c.getTous);
router.get('/:id', c.getUn);
router.put('/:id',
  body('prenom').optional().trim().notEmpty().isLength({max:100}),
  body('nom').optional().trim().notEmpty().isLength({max:100}),
  body('email').optional().trim().isEmail().normalizeEmail(),
  body('mot_de_passe').optional().isLength({min:8}),
  body('role_id').optional().isInt({min:1}).toInt(), verifier, c.modifier);
router.delete('/:id', c.supprimer);
// L'ajout d'un utilisateur passe par POST /api/auth/inscription.
module.exports = router;
