const Investment = require('../models/investment');

exports.getAllInvestments = async (req, res) => {
  try {
    const investments = await Investment.find();
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createInvestment = async (req, res) => {
  const { name, amount, type, userId, startDate, endDate, description } = req.body;

  try {
    const investment = new Investment({
      name,
      amount,
      type,
      userId,
      startDate,
      endDate,
      description,
    });

    const newInvestment = await investment.save();
    res.status(201).json({message: 'Investment created successfully',
    investment:newInvestment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateInvestment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, type, startDate, endDate, description } = req.body;

    const investment = await Investment.findById(id);
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    investment.name = name;
    investment.amount = amount;
    investment.type = type;
    investment.startDate = startDate;
    investment.endDate = endDate;
    investment.description = description;

    const updatedInvestment = await investment.save();
    res.json(updatedInvestment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteInvestment = async (req, res) => {
  try {
    const { id } = req.params;

    const investment = await Investment.findById(id);
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    await investment.deleteOne();
    res.json({ message: 'Investment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
