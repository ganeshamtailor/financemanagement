const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const router = require('express').Router();
const { verifyUser } = require('../middleware/verifyToken')

router.post('/add-income', verifyUser, addIncome)
    .get('/get-incomes', verifyUser, getIncomes)
    .delete('/delete-income/:id', verifyUser, deleteIncome)
    .post('/add-expense', verifyUser, addExpense)
    .get('/get-expenses', verifyUser, getExpense)
    .delete('/delete-expense/:id', verifyUser, deleteExpense)

module.exports = router