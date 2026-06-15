import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini SDK with User-Agent set to 'aistudio-build'
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API chat route for Gemini chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, role } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      const formattedHistory = (history || []).map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      // Dynamically select model's system instructions based on roles to have unique vibes
      let systemInstruction = "You are Apollo AI, a helpful, encouraging, and sophisticated competency and development chatbot advisor. Keep answers concise, highly structured, engaging, and in markdown format. Use bullet points and appropriate text styling. You specialize in software development competencies like RAG systems, secure container gates, zero-trust security, DevOps, and team training pathways.";

      if (role === 'Manager') {
        systemInstruction = "You are Apollo AI, an expert strategic operations, leadership, and workspace competency chatbot advisor. You are talking to a Manager/Leader at Apollo. Your objective is to assist with aggregate team performance analytics, identifying and planning how to bridge competency gaps, defining pathways, and maximizing learning scores across departments. Frame guidance around high-level metrics, strategic alignment, and team path optimization. Keep answers concise, highly structured, engaging, and in markdown format. Use bullet points.";
      } else if (role === 'Associate') {
        systemInstruction = "You are Apollo AI, a friendly, encouraging personal tutor and training companion. You are talking to an Associate employee (named Adore Patel) at Apollo. Your objective is to help her understand her specific, active courses, study assigned modules (like RAG context overlap models, zero-trust containers, and security pipelines), and give smart study tips to get 'Behind' skills on track. Frame advice around individual curiosity, growth, quiz preparation, and daily workflows. Keep answers concise, highly structured, engaging, and in markdown format. Use bullet points.";
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          ...formattedHistory,
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: systemInstruction
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Chat error:", error);
      res.status(500).json({ error: error.message || "Failed to generate response." });
    }
  });

  // Vite middleware for development or serving index.html in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
