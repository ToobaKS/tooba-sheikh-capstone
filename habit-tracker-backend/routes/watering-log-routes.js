import express from "express";
import * as wateringLogController from "../controllers/watering-log-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:category_id", protect, wateringLogController.logWatering);

router.get(
  "/:category_id/streak",
  protect,
  wateringLogController.getWateringStreak
);

export default router;
