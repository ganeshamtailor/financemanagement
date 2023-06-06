const router = require('express').Router();
const { getAllInvestments, createInvestment, updateInvestment, deleteInvestment} = require('../controllers/investment');


router.get('/', getAllInvestments);
router.post('/', createInvestment);
router.put('/:id', updateInvestment);
router.delete('/:id', deleteInvestment);

module.exports = router;
