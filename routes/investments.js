const { getAllInvestments, createInvestment, updateInvestment, deleteInvestment} = require('../controllers/investment');
const router = require('express').Router();

router.get('/', getAllInvestments);
router.post('/', createInvestment);
router.put('/:id', updateInvestment);
router.delete('/:id', deleteInvestment);

module.exports = router;
