
const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const Groq = require("groq-sdk");

const router = express.Router();

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT =
  "You are UniCareer, a friendly AI career guidance assistant for university students. Help students explore careers, understand skills, identify learning needs, and plan their professional development. Give clear, practical, encouraging answers.";

router.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    try {
      const chat = gemini.chats.create({
        model: "gemini-3.8-flash",
        history,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
      });

      let response;

      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          response = await chat.sendMessage({
            message: message.trim(),
          });
          break;
        } catch (error) {
          const is503 =
            String(error.message).includes("503") ||
            String(error.message).includes("UNAVAILABLE");

          if (!is503 || attempt === 3) {
            throw error;
          }

          console.log(`Gemini busy. Retrying in ${attempt * 2} seconds...`);

          await new Promise((resolve) =>
            setTimeout(resolve, attempt * 2000)
          );
        }
      }

      if (response && response.text) {
        return res.json({
          success: true,
          reply: response.text,
          provider: "Gemini",
        });
      }

      throw new Error("Gemini returned an empty response.");
    } catch (geminiError) {
      console.error("Gemini failed:", geminiError.message);
    }

    try {
      const messages = [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...history
          .filter((item) => item.parts?.some((part) => part.text))
          .map((item) => ({
            role: item.role === "model" ? "assistant" : "user",
            content: item.parts
              .map((part) => part.text || "")
              .join("\n"),
          })),
        {
          role: "user",
          content: message.trim(),
        },
      ];

      const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      });

      const reply = completion.choices[0]?.message?.content;

      if (!reply) {
        throw new Error("Groq returned an empty response.");
      }

      return res.json({
        success: true,
        reply,
        provider: "Groq",
      });
    } catch (groqError) {
      console.error("Groq failed:", groqError.message);

      return res.status(503).json({
        success: false,
        message:
          "Both AI services are temporarily unavailable. Please try again later.",
      });
    }
  } catch (error) {
    console.error("AI Chat Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to process your request.",
    });
  }
});

module.exports = router;
