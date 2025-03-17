import express from "express";
import * as habitController from "../controllers/habit-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/:category_name")
  .get(protect, habitController.getHabitsByCategory); // Get all habits for a category

router.route("/").post(protect, habitController.createHabit); // Create a habit

router
  .route("/:id")
  .delete(protect, habitController.deleteHabit)
  .patch(protect, habitController.updateHabit); // Update habit name/description

export default router;
