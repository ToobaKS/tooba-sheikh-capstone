import express from "express";
import * as habitLogController from "../controllers/habit-log-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:habit_id", protect, habitLogController.logHabitCompletion);

router.get("/", protect, habitLogController.getHabitLogs);

router.get("/today/:categoryName", protect, habitLogController.getTodayLogs);

router.get("/week", protect, habitLogController.getHabitLogsByWeek);

export default router;
