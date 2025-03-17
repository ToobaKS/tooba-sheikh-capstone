import express from "express";
import * as categoryController from "../controllers/category-controller.js";

const router = express.Router();

router.get("/", categoryController.getAllCategories); // Get all categories
router.get("/:category_name", categoryController.getCategoryByName); // Get category by name

export default router;
