const Budget = require('../models/budget');

// Get all budgets
exports.getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(422).json({ message: 'Somthing went wrong' });
  }
};

// Create a new budget
exports.createBudget = async (req, res) => {
  const { category, amount, startDate, endDate } = req.body;

  try {
    const budget = new Budget({
      category,
      amount,
      startDate,
      endDate,
    });

    const newBudget = await budget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update budget
exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, startDate, endDate } = req.body;

    const budget = await Budget.findById(id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    budget.category = category;
    budget.amount = amount;
    budget.startDate = startDate;
    budget.endDate = endDate;

    const updatedBudget = await budget.save();
    res.json(updatedBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete budget
exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const budget = await Budget.findById(id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    await budget.deleteOne();
    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(422).json({ message: 'Something went wrong' });
  }
};
