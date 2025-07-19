import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  addQuestionToSession,
  toggleQuestion,
  updateQuestionNote,
} from "../controllers/ques.con.js";
const router = express.Router();

// example route
router.patch("/:questionId/add-note", protect, updateQuestionNote);
router.post("/add-question", protect, addQuestionToSession);
router.post("/:questionId/pin", protect, toggleQuestion);

export default router;
