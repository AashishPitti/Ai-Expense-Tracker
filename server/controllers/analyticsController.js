const Expense = require("../models/Expense");

exports.getAnalytics = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.user.id,
    });

    const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);

    const categories = {};

    expenses.forEach((expense) => {
      categories[expense.category] =
        (categories[expense.category] || 0) + expense.amount;
    });

    let highestCategory = "";

    let highestAmount = 0;

    Object.entries(categories).forEach(([category, amount]) => {
      if (amount > highestAmount) {
        highestAmount = amount;

        highestCategory = category;
      }
    });

    res.json({
      totalExpense,
      highestCategory,
      categoryData: categories,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
