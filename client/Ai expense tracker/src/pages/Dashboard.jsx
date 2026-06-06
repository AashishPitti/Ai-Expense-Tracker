import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";

import AnalyticsCards from "../components/AnalyticsCards";
import ExpenseChart from "../components/ExpenseChart";
import MonthlyChart from "../components/MonthlyChart";

import { getAnalytics } from "../services/analyticsServices";

import {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
} from "../services/expenseService";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const [editingExpense, setEditingExpense] = useState(null);

  const [analytics, setAnalytics] = useState(null);

  // Fetch Expenses
  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();

      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Analytics
  const fetchAnalytics = async () => {
    try {
      const res = await getAnalytics();

      setAnalytics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchAnalytics();
  }, []);

  // Add or Update Expense
  const handleSubmit = async (expense) => {
    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, expense);

        setEditingExpense(null);
      } else {
        await createExpense(expense);
      }

      await fetchExpenses();
      await fetchAnalytics();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Expense
  const removeExpense = async (id) => {
    try {
      await deleteExpense(id);

      await fetchExpenses();
      await fetchAnalytics();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "20px",
        }}
      >
        <h1>Expense Dashboard</h1>

        {/* Analytics Section */}

        {analytics && (
          <>
            <AnalyticsCards analytics={analytics} />

            <ExpenseChart data={analytics.categoryData} />

            <MonthlyChart expenses={analytics.expenses} />
          </>
        )}

        {/* Expense Form */}

        <ExpenseForm onSubmit={handleSubmit} editingExpense={editingExpense} />

        {/* Expense Table */}

        <ExpenseTable
          expenses={expenses}
          onDelete={removeExpense}
          onEdit={setEditingExpense}
        />
      </div>
    </>
  );
}
