const axios = require("axios");

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || "http://localhost:8000";

exports.advisorMessage = async (sessionId, userMessage, existingProfile = {}, conversationHistory = []) => {
    const res = await axios.post(`${AI_ENGINE_URL}/advisor/message`, {
        session_id: sessionId,
        user_message: userMessage,
        existing_profile: existingProfile,
        conversation_history: conversationHistory,
    });
    return res.data;
};

exports.runBacktest = async (allocation, years = 5) => {
    const res = await axios.post(`${AI_ENGINE_URL}/backtest`, {
        allocation,
        years,
    });
    return res.data;
};

exports.analyzeStock = async (query) => {
    const res = await axios.post(`${AI_ENGINE_URL}/analyze-stock`, { query });
    return res.data;
};
