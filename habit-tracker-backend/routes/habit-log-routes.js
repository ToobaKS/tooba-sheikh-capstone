import express from "express";
import * as habitLogController from "../controllers/habit-log-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Fetch completed habit logs for the current or previous weeks.
 * Users can pass `weekOffset` as a query parameter to navigate to past weeks.
 */
router.get("/week", protect, habitLogController.getHabitLogsByWeek);

/**
 * Log a habit completion.
 * Requires `habit_id` in the request body.
 */
router.post("/", protect, habitLogController.logHabitCompletion);

/**
 * Delete a habit log entry.
 * Requires `log_id` as a URL parameter.
 */
router.delete("/:id", protect, habitLogController.deleteHabitLog);

export default router;
;
