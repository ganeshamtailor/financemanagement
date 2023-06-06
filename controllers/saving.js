const Savings = require('../models/saving');

exports.getAllSavings = async (req, res) => {
  try {
    const savings = await Savings.find();
    res.json(savings);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

exports.createSavings = async (req, res) => {
  const { userId, amount, description, type } = req.body;

  try {
    const savings = new Savings({
      userId,
      type,
      amount,
      description,
    });

    const newSavings = await savings.save();
    res.status(201).json({message: "Savings create successfully",
    savings: newSavings});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSavings = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, amount, description, type } = req.body;

    const savings = await Savings.findById(id);
    if (!savings) {
      return res.status(404).json({ message: 'Savings not found' });
    }

    savings.userId = userId;
    savings.amount = amount;
    savings.description = description;
    savings.type = type;

    const updatedSavings = await savings.save();
    res.json(updatedSavings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSavings = async (req, res) => {
  try {
    const { id } = req.params;

    const savings = await Savings.findById(id);
    if (!savings) {
      return res.status(404).json({ message: 'Savings not found' });
    }

    await savings.deleteOne();
    res.json({ message: 'Savings deleted successfully' });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};
