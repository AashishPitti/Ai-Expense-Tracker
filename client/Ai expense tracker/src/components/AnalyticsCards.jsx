export default function AnalyticsCards({ analytics }) {
  return (
    <div>
      <h3>Total Expenses: ₹{analytics.totalExpense}</h3>

      <h3>
        Highest Category:
        {analytics.highestCategory}
      </h3>
    </div>
  );
}
