import axios from "axios";
import "dotenv/config";
import initKnex from "knex";
import configuration from "../knexfile.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const knex = initKnex(configuration);
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function chat(text) {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction:
        "Your name is Croot, a helper for people who want to talk" + 
        " about thier day." + 
        " You are embedded inside a habit tracker website. Always" + 
        " be compassionate and have a bubbly personaility when needed" + 
        " I will pass in the history of the last few chats to ensure you" + 
        " know whats happening. Also the response will put into a jsx so" + 
        " make sure the effects you use can be rendered in jsx" +
        " and make plant puns once in a while and the responses should be short until unless its necessary",
    });

    const result = await model.generateContent({
      contents: [{ parts: [{ text }] }],
    });

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
  const user_id = req.user.id; 

  if (!user_message) {
    return res.status(400).json({ error: "User message is required." });
  }

  try {
    const bot_response = await chat(user_message);

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
      .where({ user_id: req.user.id })
      .orderBy("timestamp", "asc");
    res.status(200).json(chatHistory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching chat history", details: error.message });
  }
};
