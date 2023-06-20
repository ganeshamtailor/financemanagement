const IncomeSchema = require('../models/income');

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const userId = req.user.id
  const income = new IncomeSchema({
    title,
    amount,
    category,
    description,
    date,
    userId,
  });

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number!' });
    }

    await income.save();
    console.log('Income added successfully');
    res.status(200).json({ message: 'Income Added' });
  } catch (error) {
    console.log('Error adding income:', error);
    res.status(422).json({ message: error.message });
  }
};


exports.getIncome = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      const income = await IncomeSchema.findOne({ _id: id, userId })
      if (!income) {
        return res.status(404).json({ message: 'Income not found' });
      }
      res.status(200).json(income);
    } catch (error) {
      res.status(422).json({ message: 'Something went wrong' });
    }
  };

exports.getIncomes = async (req, res) =>{
    const userId = req.user.id;
    try {
        const incomes = await IncomeSchema.find({ userId }).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(422).json({message: 'Something went wrong'})
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    const userId = req.user.id;
    try {
        const deletedIncome = await IncomeSchema.findOneAndDelete({ _id: id, userId });
        if (!deletedIncome) {
          return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json({ message: 'Income Deleted' });
      } catch (error) {
        res.status(422).json({ message: 'Something went wrong' });
      }
};
exports.updateIncome = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, amount, category, description, date } = req.body;
  try {
    const updatedIncome = await IncomeSchema.findOneAndUpdate(
      { _id: id, userId },
      { title, amount, category, description, date },
      { new: true }
    );
    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({ message: "Income Updated", income: updatedIncome });
  } catch (error) {
    res.status(422).json({ message: "Something went wrong" });
  }
};