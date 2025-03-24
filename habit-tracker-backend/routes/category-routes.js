import express from "express";
import * as categoryController from "../controllers/category-controller.js";

const router = express.Router();

router.get("/", categoryController.getAllCategories);
router.get("/:category_name", categoryController.getCategoryByName);

export default router;
