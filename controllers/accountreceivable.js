const AccountsReceivable = require('../models/accountreceivable');

// Get all accounts receivable transactions
exports.getAllAccountsReceivable = async (req, res) => {
  try {
    const transactions = await AccountsReceivable.find();
    res.json(transactions);
  } catch (error) {
    res.status(422).json({ message: 'Somthing went wrong' });
  }
};

// Create a new accounts receivable transaction
exports.createAccountsReceivable = async (req, res) => {
  const { customer, invoiceNumber, amount, dueDate } = req.body;

  try {
    const transaction = new AccountsReceivable({
      customer,
      invoiceNumber,
      amount,
      dueDate,
    });

    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(422).json({ message: 'Somthing went weong' });
  }
};

// Update accounts receivable transaction
exports.updateAccountsReceivable = async (req, res) => {
  try {
    const { id } = req.params;
    const { customer, invoiceNumber, amount, dueDate, paid, paymentDate } = req.body;

    const transaction = await AccountsReceivable.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.customer = customer;
    transaction.invoiceNumber = invoiceNumber;
    transaction.amount = amount;
    transaction.dueDate = dueDate;
    transaction.paid = paid;
    transaction.paymentDate = paymentDate;

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete accounts receivable transaction
exports.deleteAccountsReceivable = async (req, res) => {
    try {
      const { id } = req.params;
  
      const transaction = await AccountsReceivable.findById(id);
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
  
      await transaction.deleteOne();
      res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      res.status(422).json({ message: 'Somthing went wrong' });
    }
  };