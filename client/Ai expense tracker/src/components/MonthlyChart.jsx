// import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// export default function MonthlyChart({ expenses }) {
//   const data = expenses.map((item) => ({
//     name: new Date(item.date).toLocaleDateString(),
//     amount: item.amount,
//   }));

//   return (
//     <BarChart width={700} height={300} data={data}>
//       <XAxis dataKey="name" />

//       <YAxis />

//       <Tooltip />

//       <Bar dataKey="amount" />
//     </BarChart>
//   );
// }

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyChart({ expenses }) {
  const data = (expenses || []).map((item) => ({
    date: new Date(item.date).toLocaleDateString(),

    amount: item.amount,
  }));

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "16px",
        marginTop: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Expense Trends</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="amount" fill="#6366F1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
