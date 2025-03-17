import express from "express";
import * as plantController from "../controllers/plant-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", plantController.getAllPlants); // Get all plant types

router.get("/:id/phases", plantController.getPlantPhases); // Get all phases for a plant

router.get(
  "/user-category/name/:category_name",
  protect,
  plantController.getUserPlantPhaseByCategoryName
); // Get plant phase from user category

router.patch(
  "/user-category/name/:category_name",
  protect,
  plantController.updateUserPlantPhase
); // Update plant phase

export default router;
