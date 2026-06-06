const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { generateInsights } = require("../controllers/aiController");

router.get("/report", protect, generateInsights);

module.exports = router;
