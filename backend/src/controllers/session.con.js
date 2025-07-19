import { tryCatch } from "bullmq";
import Sessions from "../models/Session.js";
import Questions from "../models/Questions.js";

export const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, level, questions } =
      req.body;
    if (
      !level ||
      !role ||
      !experience ||
      !topicsToFocus ||
      !description ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return res
        .status(404)
        .json({ success: false, message: "All fields are required" });
    }
    const userId = req.user._id;
    const session = await Sessions.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
      level,
    });
    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Questions.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );
    if (!questionDocs) {
      return res
        .status(404)
        .json({ success: false, message: "There is no questions" });
    }
    console.log(questionDocs);
    session.questions = questionDocs;
    await session.save();
    return res
      .status(200)
      .json({ success: true, message: "Session created", session });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "Server Error" });
  }
};
export const getMySession = async (req, res) => {
  try {
    const sessions = await Sessions.find({ user: req.user?._id })
      .sort({ createdAt: -1 })
      .populate("questions");

    if (!sessions || sessions.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "There is no session" });
    }

    return res.status(200).json(sessions);
  } catch (error) {
    console.error("Error in getMySession:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const deleteSession = async (req, res) => {
  try {
    const session = await Sessions.findById(req.params.sessionId);

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: " There is no session" });
    }
    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized user to delete the session",
      });
    }
    //delete questions linked to the session
    const questionDeleteResult = await Questions.deleteMany({
      session: session._id,
    });
    if (questionDeleteResult.deletedCount === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete linked questions or no questions found",
      });
    }

    //then delete the session
    await session.deleteOne();
    return res.status(200).json({ success: true, message: "Session deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const getSessionById = async (req, res) => {
  try {
    if (!req.params.sessionId) {
      return res
        .status(404)
        .json({ success: false, message: "Session Id is required" });
    }
    const session = await Sessions.findById(req.params.sessionId)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      //isPinned: -1 ဆိုတာ isPinned field ကို descending order (ကြီးဆုံးမှ သေးဆုံး)
      // createdAt: 1 ဆိုတာက createdAt field ကို ascending order (အဟောင်းဆုံးကနစျပ်)
      .exec();
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: " There is no session" });
    }
    return res.status(200).json({ success: true, session });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
