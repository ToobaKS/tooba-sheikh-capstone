import express from "express";
import * as userCategoryController from "../controllers/user-category-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create & delete user categories
router
  .route("/")
  .post(protect, userCategoryController.createUserCategory)
  .delete(protect, userCategoryController.deleteUserCategory);

// Get all user categories
router.get("/", protect, userCategoryController.getUserCategories);

// Get a specific category's progress
router.get(
  "/:category_id/progress",
  protect,
  userCategoryController.getCategoryProgress
);

export default router;
