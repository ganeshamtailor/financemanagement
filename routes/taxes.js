const {getAllTaxes, createTax, updateTax, deleteTax} = require('../controllers/tax');
const router = require('express').Router();

router.get('/', getAllTaxes);
router.post('/', createTax);
router.put('/:id', updateTax);
router.delete('/:id', deleteTax);

module.exports = router;
