// import { PieChart, Pie, Tooltip, Cell } from "recharts";

// export default function ExpenseChart({ data }) {
//   const chartData = Object.entries(data).map(([name, value]) => ({
//     name,
//     value,
//   }));

//   return (
//     <PieChart width={400} height={400}>
//       <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={120} />

//       <Tooltip />
//     </PieChart>
//   );
// }

import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#F97316",
  "#22C55E",
  "#06B6D4",
  "#EAB308",
  "#EF4444",
];

export default function ExpenseChart({ data }) {
  const chartData = Object.entries(data || {}).map(([name, value]) => ({
    name,
    value,
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
      <h2>Expense Distribution</h2>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={140}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
