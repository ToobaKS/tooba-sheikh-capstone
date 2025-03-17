import express from "express";
import * as plantController from "../controllers/plant-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all plants
router.get("/", plantController.getAllPlants);

// Get plant phases by plant ID
router.get("/:id/phases", plantController.getPlantPhases);

// Get the current plant phase for a user’s category
router.get(
  "/user-category/:category_id",
  protect,
  plantController.getCurrentPlantPhase
);

// Upgrade plant phase if watering streak is met
router.patch(
  "/user-category/:category_id",
  protect,
  plantController.upgradePlantPhase
);

export default router;
