const { getAllAccountsPayable, createAccountsPayable, updateAccountsPayable, deleteAccountsPayable } = require('../controllers/accountpayable');
const router = require('express').Router();

router.get('/', getAllAccountsPayable);
router.post('/', createAccountsPayable);
router.put('/:id', updateAccountsPayable);
router.delete('/:id', deleteAccountsPayable);

module.exports = router;
