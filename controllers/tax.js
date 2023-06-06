const Tax = require('../models/tax');

exports.getAllTaxes = async (req, res) => {
  try {
    const taxes = await Tax.find().populate('userId');
    res.json(taxes);
  } catch (error) {
    res.status(422).json({ message: 'Somthing went wrong' });
  }
};

exports.createTax = async (req, res) => {
  const { userId, name, amount, description } = req.body;

  try {
    const tax = new Tax({
      userId,
      name,
      amount,
      description,
    });

    const newTax = await tax.save();
    res.status(201).json(newTax);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTax = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, description } = req.body;

    const tax = await Tax.findById(id);
    if (!tax) {
      return res.status(404).json({ message: 'Tax not found' });
    }

    tax.name = name;
    tax.amount = amount;
    tax.description = description;

    const updatedTax = await tax.save();
    res.json(updatedTax);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTax = async (req, res) => {
  try {
    const { id } = req.params;

    const tax = await Tax.findById(id);
    if (!tax) {
      return res.status(404).json({ message: 'Tax not found' });
    }

    await tax.deleteOne();
    res.json({ message: 'Tax deleted successfully' });
  } catch (error) {
    res.status(422).json({ message: 'Somthing went wrong' });
  }
};
