const router = require('express').Router();
const { body } = require('express-validator');
const c = require('../controllers/authController');
const verifier = require('../middlewares/validation');
const { verifierToken } = require('../middlewares/auth');
router.post('/inscription',
  body('prenom').trim().notEmpty().isLength({max:100}),
  body('nom').trim().notEmpty().isLength({max:100}),
  body('email').trim().isEmail().normalizeEmail(),
  body('mot_de_passe').isLength({min:8}), verifier, c.inscription);
router.post('/connexion',
  body('email').trim().isEmail().normalizeEmail(),
  body('mot_de_passe').notEmpty(), verifier, c.connexion);
router.get('/profil', verifierToken, c.profil);
module.exports = router;
