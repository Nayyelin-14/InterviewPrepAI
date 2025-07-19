import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createSession,
  deleteSession,
  getMySession,
  getSessionById,
} from "../controllers/session.con.js";
const router = express.Router();

// example route
router.post("/create-session", protect, createSession);
router.delete("/delete-session/:sessionId", protect, deleteSession);
router.get("/getsession/:sessionId", protect, getSessionById);
router.get("/my-session", protect, getMySession);

export default router;
