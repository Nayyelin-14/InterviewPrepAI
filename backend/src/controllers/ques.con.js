import Questions from "../models/Questions.js";
import Sessions from "../models/Session.js";

//add new question to an existing session
export const addQuestionToSession = async (req, res) => {
  try {
    const { sessionId, newquestions } = req.body;

    if (!sessionId || !newquestions || !Array.isArray(newquestions)) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }
    const session = await Sessions.findById(sessionId);
    if (!session) {
      return res
        .status(400)
        .json({ success: false, message: "Session not found" });
    }

    //create new quetions and add to model
    const createdNewQuestions = await Questions.insertMany(
      newquestions.map((newQ) => ({
        session: sessionId,
        question: newQ.question,
        answer: newQ.answer,
      }))
    );
    //update session with new qwuestions
    session.questions.push(...createdNewQuestions.map((q) => q._id));
    await session.save();

    return res.status(200).json({ success: true, createdNewQuestions });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Servsergsergserer Error" });
  }
};

//pin or unpin question
export const toggleQuestion = async (req, res) => {
  try {
    const question = await Questions.findById(req.params.questionId);
    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "Question not found" });
    }
    question.isPinned = !question.isPinned;
    await question.save();
    return res.status(200).json({
      success: true,
      message: "Pinned the selected question",
      question,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Servgersr Error" });
  }
};
//update note for a question
export const updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;

    if (typeof note !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Note must be a string" });
    }
    const question = await Questions.findById(req.params.questionId);
    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "Question not found" });
    }
    question.note = note || "";
    await question.save();
    return res.status(200).json({
      success: true,
      message: "Note has added to the question",
      question,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Servgasergeraer Error" });
  }
};
