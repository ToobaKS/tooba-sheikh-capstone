import express from "express";
import * as userController from "../controllers/users-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/profile", protect, userController.getUserProfile);

export default router;
