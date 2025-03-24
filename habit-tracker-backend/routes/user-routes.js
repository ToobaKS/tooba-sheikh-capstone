import express from "express";
import * as userController from "../controllers/user-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/profile").get(protect, userController.getUserProfile);

export default router;
