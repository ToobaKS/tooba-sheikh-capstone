import express from "express";
import * as timeCapsuleController from "../controllers/time-capsule-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, timeCapsuleController.createTimeCapsule)
  .get(protect, timeCapsuleController.getUserTimeCapsules); 

router
  .route("/:id")
  .get(protect, timeCapsuleController.getTimeCapsuleById)
  .delete(protect, timeCapsuleController.deleteTimeCapsule);

export default router;