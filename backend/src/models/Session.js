import mongoose from "mongoose";

const sessionsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: { type: String, required: true },
    experience: { type: String, required: true },
    topicsToFocus: { type: String, required: true },
    description: String,
    level: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Questions" }],
  },
  { timestamps: true }
);

const Sessions = mongoose.model("Sessions", sessionsSchema);
export default Sessions;
