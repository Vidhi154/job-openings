const express = require("express");
const Chat = require("../models/Chat");
const askGemini = require("../llm/gemini");
const { getUser, updateMemory } = require("../memory/userMemory");

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, message } = req.body;

  const user = await getUser(userId);

  const prompt = `
You are Nova, a human-like chatbot.
User profile:
Name: ${user.name || "unknown"}
Tone: ${user.tone}
Preferences: ${user.preferences.join(", ")}

Memory:
${user.memory.slice(-5).join("\n")}

User says: ${message}

Reply naturally. Do not say you are an AI.
`;

  const reply = await askGemini(prompt);

  await Chat.create({ userId, message, reply });
  await updateMemory(user, message);

  res.json({ reply });
});

module.exports = router;
