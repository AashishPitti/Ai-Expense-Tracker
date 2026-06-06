const Expense = require("../models/Expense");

const deepseek = require("../config/deepseek");

exports.generateInsights = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.user.id,
    });

    const formattedExpenses = expenses.map((expense) => ({
      title: expense.title,

      amount: expense.amount,

      category: expense.category,
    }));

    const prompt = `
Analyze the following expenses.

${JSON.stringify(formattedExpenses, null, 2)}

Provide:

1. Spending Summary
2. Highest Spending Areas
3. Savings Suggestions
4. Budget Recommendations
5. Financial Health Score out of 100

Respond in clean markdown.
`;

    const response = await deepseek.chat.completions.create({
      model: "deepseek-chat",

      messages: [
        {
          role: "user",

          content: prompt,
        },
      ],
    });

    res.json({
      report: response.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
