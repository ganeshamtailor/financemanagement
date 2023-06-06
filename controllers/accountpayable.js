const AccountsPayable = require('../models/accountpayable');

// Get all accounts payable transactions
exports.getAllAccountsPayable = async (req, res) => {
  try {
    const transactions = await AccountsPayable.find();
    res.json(transactions);
  } catch (error) {
    res.status(422).json({ message: "Somthing went wrong" });
  }
};

// Create a new accounts payable transaction
exports.createAccountsPayable = async (req, res) => {
  const { vendor, invoiceNumber, amount, dueDate, paymentDate } = req.body;

  try {
    const transaction = new AccountsPayable({
      vendor,
      invoiceNumber,
      amount,
      dueDate,
      paymentDate
    });

    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(422).json({ message: 'Somthing went wrong' });
  }
};

// Update accounts payable transaction
exports.updateAccountsPayable = async (req, res) => {
  try {
    const { id } = req.params;
    const { vendor, invoiceNumber, amount, dueDate, paid, paymentDate } = req.body;

    const transaction = await AccountsPayable.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.vendor = vendor;
    transaction.invoiceNumber = invoiceNumber;
    transaction.amount = amount;
    transaction.dueDate = dueDate;
    transaction.paid = paid;
    transaction.paymentDate = paymentDate;

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(422).json({ message: 'Somthing went wrong' });
  }
};


exports.deleteAccountsPayable = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await AccountsPayable.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await transaction.deleteOne();
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(422).json({ message: 'Somthing went wrong' });
  }
};
