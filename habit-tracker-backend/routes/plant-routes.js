import express from "express";
import * as plantController from "../controllers/plant-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", plantController.getAllPlants);

router.get("/:id/phases", plantController.getPlantPhases);

router.get(
  "/user-category/:category_id",
  protect,
  plantController.getCurrentPlantPhase
);

router.patch(
  "/user-category/:category_id",
  protect,
  plantController.upgradePlantPhase
);

export default router;
