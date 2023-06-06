const mongoose = require('mongoose');

const accountsReceivableSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  invoiceNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paid: { type: Boolean, default: false },
  paymentDate: { type: Date, required: true },
});

const AccountsReceivable = mongoose.model('AccountsReceivable', accountsReceivableSchema);

module.exports = AccountsReceivable;
