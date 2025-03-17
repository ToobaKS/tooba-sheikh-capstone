import express from "express";
import * as wateringLogController from "../controllers/watering-log-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Log watering for a category (if completion threshold met)
router.post("/:category_id", protect, wateringLogController.logWatering);

// ✅ Get watering streak for a category
router.get(
  "/:category_id/streak",
  protect,
  wateringLogController.getWateringStreak
);

export default router;
