import express from "express";
import * as userCategoryController from "../controllers/user-category-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, userCategoryController.createUserCategory);
router.delete("/", protect, userCategoryController.deleteUserCategory);

export default router;
