import { GoogleGenAI } from "@google/genai";
import {
  conceptExplainPrompt,
  questionAnswerPrompt,
} from "../utils/prompts.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions, level } =
      req.body;
    console.log(role, experience, topicsToFocus, numberOfQuestions, level);
    if (
      !role ||
      !experience ||
      !topicsToFocus ||
      !numberOfQuestions ||
      !level
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
      level
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });
    if (!response) {
      return res.status(400).json({
        message: "There is no content",
      });
    }
    const rawText = response.candidates[0].content.parts[0].text;
    const cleanText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanText);
    return res.status(200).json({
      success: true,
      message: "Successfully generated",
      generatedQuestion: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate quetions",
      error: error.message,
    });
  }
};
export const generateExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    console.log(question);
    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });
    if (!response) {
      return res.status(400).json({
        success: false,
        message: "There is no data",
      });
    }
    const rawText = response.candidates[0].content.parts[0].text;
    const cleanText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanText);
    console.log("data", data);
    return res.status(200).json({
      success: true,
      message: "Successfully generated",
      explanation: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
