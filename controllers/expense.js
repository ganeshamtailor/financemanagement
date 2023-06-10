const ExpenseSchema = require("../models/expense")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date}  = req.body
    const userId = req.user.id;
    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        userId
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(422).json({message: err.message})
    }
}

exports.getExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      const expense = await ExpenseSchema.findOne({ _id: id, userId });
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      res.status(200).json(expense);
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  };

exports.getExpenses = async (req, res) =>{
    const userId = req.user.id;
    try {
        const incomes = await ExpenseSchema.find({ userId }).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(422).json({message: err.message})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    const userId = req.user.id;
    ExpenseSchema.findByIdAndDelete({ _id: id, userId })
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(422).json({message: err.message})
        })
}
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, amount, category, description, date } = req.body;

  try {
    const updatedExpense = await ExpenseSchema.findOneAndUpdate(
      { _id: id, userId },
      { title, amount, category, description, date },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense Updated", expense: updatedExpense });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};