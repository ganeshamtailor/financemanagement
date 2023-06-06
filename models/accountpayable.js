const mongoose = require('mongoose');

const accountsPayableSchema = new mongoose.Schema({
  vendor: { type: String, required: true },
  invoiceNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paid: { type: Boolean, default: false },
  paymentDate: { type: Date, required: true },
});

const AccountsPayable = mongoose.model('AccountsPayable', accountsPayableSchema);

module.exports = AccountsPayable;