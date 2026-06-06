import { useState, useEffect } from "react";

export default function ExpenseForm({ onSubmit, editingExpense }) {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setExpense(editingExpense);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(expense);

    setExpense({
      title: "",
      amount: "",
      category: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={expense.title}
        onChange={(e) =>
          setExpense({
            ...expense,
            title: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Amount"
        value={expense.amount}
        onChange={(e) =>
          setExpense({
            ...expense,
            amount: e.target.value,
          })
        }
      />

      <select
        value={expense.category}
        onChange={(e) =>
          setExpense({
            ...expense,
            category: e.target.value,
          })
        }
      >
        <option value="">Category</option>

        <option>Food</option>

        <option>Transport</option>

        <option>Shopping</option>

        <option>Bills</option>

        <option>Health</option>
      </select>

      <button>{editingExpense ? "Update Expense" : "Add Expense"}</button>

      {/* <button>Add Expense</button> */}
    </form>
  );
}
