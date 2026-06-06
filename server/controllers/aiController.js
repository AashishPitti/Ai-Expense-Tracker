const Expense = require("../models/Expense");

const AIReport = require("../models/AIReport");

const deepseek = require("../config/deepseek");

exports.generateInsights = async (req, res) => {
  try {
    const today = new Date();

    const month = today.getMonth() + 1;

    const year = today.getFullYear();

    // STEP 1
    // CHECK IF REPORT EXISTS

    const existingReport = await AIReport.findOne({
      userId: req.user.id,

      month,

      year,
    });

    if (existingReport) {
      return res.json({
        report: existingReport.report,

        financialScore: existingReport.financialScore,

        cached: true,
      });
    }

    // STEP 2
    // GET USER EXPENSES

    const expenses = await Expense.find({
      userId: req.user.id,
    });

    // STEP 3
    // CALCULATE SCORE

    const totalExpense = expenses.reduce(
      (acc, item) => acc + item.amount,

      0,
    );

    let score = 100;

    if (totalExpense > 50000) score -= 20;

    if (totalExpense > 100000) score -= 30;

    // STEP 4
    // FORMAT DATA

    const expenseData = expenses.map((expense) => ({
      title: expense.title,

      amount: expense.amount,

      category: expense.category,
    }));

    // STEP 5
    // CREATE PROMPT

    const prompt = `

Analyze the following expenses:

${JSON.stringify(expenseData, null, 2)}

Provide:

1. Spending Summary

2. Overspending Areas

3. Saving Suggestions

4. Budget Recommendations

5. Financial Health Advice

`;

    // STEP 6
    // CALL DEEPSEEK

    const response = await deepseek.chat.completions.create({
      model: "deepseek-chat",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const report = response.choices[0].message.content;

    // STEP 7
    // SAVE REPORT

    await AIReport.create({
      userId: req.user.id,

      month,

      year,

      report,

      financialScore: score,
    });

    // STEP 8
    // RETURN

    res.json({
      report,

      financialScore: score,

      cached: false,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getReportHistory = async (req, res) => {
  try {
    const reports = await AIReport.find({
      userId: req.user.id,
    }).sort({
      year: -1,
      month: -1,
    });

    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// const Expense = require("../models/Expense");

// const deepseek = require("../config/deepseek");

// exports.generateInsights = async (req, res) => {
//   try {
//     const expenses = await Expense.find({
//       userId: req.user.id,
//     });

//     const formattedExpenses = expenses.map((expense) => ({
//       title: expense.title,

//       amount: expense.amount,

//       category: expense.category,
//     }));

//     const prompt = `
// Analyze the following expenses.

// ${JSON.stringify(formattedExpenses, null, 2)}

// Provide:

// 1. Spending Summary
// 2. Highest Spending Areas
// 3. Savings Suggestions
// 4. Budget Recommendations
// 5. Financial Health Score out of 100

// Respond in clean markdown.
// `;

//     const response = await deepseek.chat.completions.create({
//       model: "deepseek-chat",

//       messages: [
//         {
//           role: "user",

//           content: prompt,
//         },
//       ],
//     });

//     res.json({
//       report: response.choices[0].message.content,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
