const router = require('express').Router();
const { getAllBudgets ,createBudget, updateBudget, deleteBudget} = require('../controllers/budget');

router.get('/', getAllBudgets);
router.post('/', createBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

module.exports = router;
