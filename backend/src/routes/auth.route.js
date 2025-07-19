import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.con.js";
import { authCheck, protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// example route
router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.get("/auth-check", protect, authCheck);
router.post("/logout", protect, logoutUser);

export default router;
