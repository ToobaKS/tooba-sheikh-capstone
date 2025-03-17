import express from "express";
import * as categoryController from "../controllers/category-controller.js";

const router = express.Router();

router.route("/categories").get(categoryController.getAllCategories);

export default router;
