const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const pythonBridge = require("../services/pythonBridge");

router.post("/advisor/message", authMiddleware, async (req, res) => {
    try {
        const { userMessage, existingProfile, conversationHistory } = req.body;
        const sessionId = req.user.id;
        const result = await pythonBridge.advisorMessage(
            sessionId,
            userMessage,
            existingProfile || {},
            conversationHistory || []
        );
        res.json(result);
    } catch (err) {
        console.error("Advisor error:", err.message);
        res.status(500).json({ error: "Advisor failed" });
    }
});

router.post("/backtest", authMiddleware, async (req, res) => {
    try {
        const { allocation, years } = req.body;
        const result = await pythonBridge.runBacktest(allocation, years || 5);
        res.json(result);
    } catch (err) {
        console.error("Backtest error:", err.message);
        res.status(500).json({ error: "Backtest failed" });
    }
});

router.post("/analyze-stock", authMiddleware, async (req, res) => {
    try {
        const { query } = req.body;
        const result = await pythonBridge.analyzeStock(query);
        res.json(result);
    } catch (err) {
        console.error("Stock analysis error:", err.message);
        res.status(500).json({ error: "Stock analysis failed" });
    }
});

module.exports = router;
