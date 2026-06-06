const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.send("Expense Tracker API Running");
});
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/expenses", require("./routes/expenseRoutes"));

app.use("/api/analytics", require("./routes/analyticsRoutes"));

app.use("/api/ai", require("./routes/aiRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
