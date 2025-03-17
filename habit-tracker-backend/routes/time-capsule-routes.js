import express from "express";
import * as timeCapsuleController from "../controllers/time-capsule-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, timeCapsuleController.createTimeCapsule) // Create a time capsule
  .get(protect, timeCapsuleController.getUserTimeCapsules); // Get all time capsules for the logged-in user

router
  .route("/:id")
  .get(protect, timeCapsuleController.getTimeCapsuleById) // Get a specific time capsule (if unlocked)
  .delete(protect, timeCapsuleController.deleteTimeCapsule); // Delete a time capsule

export default router;