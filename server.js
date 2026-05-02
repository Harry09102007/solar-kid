import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// ✅ Serve frontend (IMPORTANT)
app.use(express.static(path.join(__dirname, "dist")));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const systemInstruction = `
You are CosmoGuide AI, a friendly GenZ space guide 🚀.
Max 2 sentences. Use slang like "no cap", "lit".
Only talk about space 🪐.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction
    });

    const latestMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: [],
    });

    const result = await chat.sendMessage(latestMessage);
    const aiMessageText = result.response.text();

    res.json({
      message: {
        role: "assistant",
        content: aiMessageText
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong 🚀"
    });
  }
});


// ✅ FIXED Catch-all route (THIS is the only change)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});