import express from "express";
import * as userCategoryController from "../controllers/user-category-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, userCategoryController.createUserCategory)
  .delete(protect, userCategoryController.deleteUserCategory);

router.get("/", protect, userCategoryController.getUserCategories);

router.get(
  "/:category_id/progress",
  protect,
  userCategoryController.getCategoryProgress
);

export default router;
