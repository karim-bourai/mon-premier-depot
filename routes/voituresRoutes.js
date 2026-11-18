const router = require('express').Router();
const { body } = require('express-validator');
const c = require('../controllers/voituresController');
const { verifierToken, administrateur } = require('../middlewares/auth');
const verifier = require('../middlewares/validation');
const upload = require('../middlewares/upload');
const champs = () => [
  body('marque').trim().notEmpty().isLength({max:100}),
  body('modele').trim().notEmpty().isLength({max:100}),
  body('annee').isInt({min:1900,max:2100}).toInt(),
  body('immatriculation').trim().notEmpty().isLength({max:50}),
  body('prix_jour').isFloat({gt:0}).toFloat(),
  body('categorie_id').isInt({min:1}).toInt()
];
router.get('/', c.getTous);
router.get('/:id', c.getUn);
router.post('/', verifierToken, administrateur, upload.single('photo'), champs(), verifier, c.ajouter);
router.put('/:id', verifierToken, administrateur, upload.single('photo'),
  champs().map(champ => champ.optional()), verifier, c.modifier);
router.delete('/:id', verifierToken, administrateur, c.supprimer);
module.exports = router;
