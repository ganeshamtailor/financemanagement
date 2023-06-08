const { addIncome, getIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { addExpense, getExpense, getExpenses, deleteExpense } = require('../controllers/expense');
const router = require('express').Router();
const { verifyUser } = require('../middleware/verifyToken')

router.post('/add-income', verifyUser, addIncome)
    .get('/get-income/:id', verifyUser, getIncome)
    .get('/get-incomes', verifyUser, getIncomes)
    .delete('/delete-income/:id', verifyUser, deleteIncome)
    .post('/add-expense', verifyUser, addExpense)
    .get('/get-expense/:id', verifyUser, getExpense)
    .get('/get-expenses', verifyUser, getExpenses)
    .delete('/delete-expense/:id', verifyUser, deleteExpense)

module.exports = router