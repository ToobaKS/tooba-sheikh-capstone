import express from "express";
import * as userCategoryController from "../controllers/user-category-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, userCategoryController.getUserCategories) // Get user categories
  .post(protect, userCategoryController.createUserCategory) // Assign user to category
  .delete(protect, userCategoryController.deleteUserCategory); // Remove user from category

export default router;
