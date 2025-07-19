import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema(
  {
    session: { type: mongoose.Schema.Types.ObjectId, ref: "Sessions" },
    question: String,
    level: String,
    answer: String,
    note: String,
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Questions = mongoose.model("Questions", questionsSchema);
export default Questions;
