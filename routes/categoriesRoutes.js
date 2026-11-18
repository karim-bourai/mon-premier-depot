const router = require('express').Router();
const { body } = require('express-validator');
const ctrl = require('../controllers/categoriesController');
const { verifierToken, administrateur } = require('../middlewares/auth');
const verifier = require('../middlewares/validation');
router.get('/', ctrl.getTous);
router.get('/:id', ctrl.getUn);
router.post('/', verifierToken, administrateur,
  body('nom').trim().notEmpty().isLength({max:100}),
  body('description').optional({nullable:true}).isLength({max:255}), verifier, ctrl.ajouter);
router.put('/:id', verifierToken, administrateur,
  body('nom').optional().trim().notEmpty().isLength({max:100}),
  body('description').optional({nullable:true}).isLength({max:255}), verifier, ctrl.modifier);
router.delete('/:id', verifierToken, administrateur, ctrl.supprimer);
module.exports = router;
