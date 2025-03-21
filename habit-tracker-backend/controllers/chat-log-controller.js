import axios from "axios";
import "dotenv/config";
import initKnex from "knex";
import configuration from "../knexfile.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const knex = initKnex(configuration);
const GEMINI_API_KEY = process.env.API_KEY;

async function chat(text) {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent({
      contents: [{ parts: [{ text }] }],
    });

    // Extract the response text
    const botResponse =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm not sure how to respond.";

    return botResponse;

  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
}
/**
 * Chatbot endpoint - Handles user input and returns a response from Gemini API.
 */
export const chatWithBot = async (req, res) => {
  const { user_message } = req.body;
  const user_id = req.user.id; // Extract user ID from JWT

  if (!user_message) {
    return res.status(400).json({ error: "User message is required." });
  }

  try {
    // Send request to Gemini API
    const bot_response = await chat(user_message);

    // Save chat to the database
    const [id] = await knex("chat_log").insert({
      user_id,
      user_message,
      bot_response,
    });

    const savedChat = await knex("chat_log").where({ id }).first();

    res.status(200).json(savedChat);
  } catch (error) {
    res.status(500).json({
      error: "Failed to get a response from the chatbot.",
      details: error.message,
    });
  }
};

/**
 * Get previous chat history for the logged-in user.
 */
export const getChatHistory = async (req, res) => {
  const user_id = req.user.id;

  try {
    const chatHistory = await knex("chat_log")
      .where({ user_id })
      .orderBy("timestamp", "desc");
    res.status(200).json(chatHistory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching chat history", details: error.message });
  }
};
