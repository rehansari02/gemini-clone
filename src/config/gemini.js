import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY; // apni API key env file me rakho
const genAI = new GoogleGenerativeAI(API_KEY);

let MODEL_NAME = "gemini-2.5-flash"; // default model

// 🔹 Function: list all available models (for debugging)
async function listModels() {
  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    const data = await resp.json();
    console.log("✅ Available models:", data);
  } catch (err) {
    console.error("❌ Error fetching models:", err);
  }
}

// 🔹 Function: run chat with Gemini
async function runChat(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("❌ Error in runChat:", err);

    // fallback model if first fails
    if (MODEL_NAME === "gemini-2.5-flash") {
      console.warn("⚠️ Falling back to gemini-2.5-pro...");
      MODEL_NAME = "gemini-2.5-pro";
      return runChat(prompt);
    } else {
      console.error("❌ Both models failed.");
      await listModels(); // show available models
      return "Error: Unable to fetch response.";
    }
  }
}

export default runChat;
