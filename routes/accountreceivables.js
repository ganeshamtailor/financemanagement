
const router = require('express').Router();
const { getAllAccountsReceivable ,createAccountsReceivable, updateAccountsReceivable, deleteAccountsReceivable} = require('../controllers/accountreceivable');

router.get('/', getAllAccountsReceivable);
router.post('/', createAccountsReceivable);
router.put('/:id', updateAccountsReceivable);
router.delete('/:id', deleteAccountsReceivable);

module.exports = router;
