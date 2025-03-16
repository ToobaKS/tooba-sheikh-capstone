import express from "express";
import * as plantController from "../controllers/plant-contoller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", plantController.getAllPlants); // Get all plants
router.get("/:id/phases", plantController.getPlantPhases); // Get plant phases by plant ID
router.get("/user-category/name/:category_name", protect, plantController.getUserPlantPhaseByCategoryName); // Get plant phase from user category (by name)

export default router;