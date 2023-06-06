const {getAllSavings,createSavings, updateSavings, deleteSavings} = require('../controllers/saving');
const router = require('express').Router();

router.get('/', getAllSavings);
router.post('/', createSavings);
router.put('/:id', updateSavings);
router.delete('/:id', deleteSavings);

module.exports = router;
