
const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    const chat = ai.chats.create({
     model: "gemini-3.8-flash",
      history,
      config: {
        systemInstruction:
          "You are UniCareer, a friendly AI career guidance assistant for university students. Help students explore careers, understand skills, identify learning needs, and plan their professional development. Give clear, practical, encouraging answers.",
      },
    });

    const response = await chat.sendMessage({
      message: message.trim(),
    });

    res.json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.error("Gemini API Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to get an AI response. Please try again.",
    });
  }
});

module.exports = router;
