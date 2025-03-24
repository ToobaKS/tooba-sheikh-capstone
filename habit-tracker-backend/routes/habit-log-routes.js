import express from "express";
import * as habitLogController from "../controllers/habit-log-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Log habit completion for today
router.post("/:habit_id", protect, habitLogController.logHabitCompletion);

// Get all habit logs for the user
router.get("/", protect, habitLogController.getHabitLogs);

router.get("/today/:categoryName", protect, habitLogController.getTodayLogs);

// Get habit logs for a specific week (supports `weekOffset` query param)
router.get("/week", protect, habitLogController.getHabitLogsByWeek);

export default router;
