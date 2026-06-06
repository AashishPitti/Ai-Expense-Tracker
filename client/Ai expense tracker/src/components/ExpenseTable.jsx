export default function ExpenseTable({ expenses, onDelete, onEdit }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((expense) => (
          <tr key={expense._id}>
            <td>{expense.title}</td>

            <td>₹{expense.amount}</td>

            <td>{expense.category}</td>

            <td>
              <button onClick={() => onEdit(expense)}>Edit</button>

              <button onClick={() => onDelete(expense._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
