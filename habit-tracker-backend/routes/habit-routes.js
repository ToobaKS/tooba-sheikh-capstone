import express from "express";
import * as habitController from "../controllers/habit-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/:category_name")
  .get(protect, habitController.getHabitsByCategory); 

router.route("/").post(protect, habitController.createHabit); 

router
  .route("/:id")
  .delete(protect, habitController.deleteHabit)
  .patch(protect, habitController.updateHabit);

export default router;
