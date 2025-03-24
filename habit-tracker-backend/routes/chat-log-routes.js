import express from "express";
import * as chatLogController from "../controllers/chat-log-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, chatLogController.chatWithBot)
  .get(protect, chatLogController.getChatHistory);

export default router;
