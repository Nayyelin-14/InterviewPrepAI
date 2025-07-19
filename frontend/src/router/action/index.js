import { API_PATHS } from "../../utils/apiPaths";
import { authApi } from "../../utils/axiosInstance";
import { AxiosError } from "axios";

export const LoginAction = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  console.log("cere", credentials);

  try {
    const response = await authApi.post(API_PATHS.Auth.LOGIN, credentials);

    if (response.status !== 201) {
      return { error: response.data || "Login Failed!" };
    }

    return { success: response.data.isSuccess, user: response.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        error: error.response?.data?.error || "Login Failed!",
      };
    } else throw error;
  }
};

export const RegisterAction = async ({ request }) => {
  const formData = await request.formData();

  try {
    const response = await authApi.post(API_PATHS.Auth.REGISTER, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    if (response.status !== 201) {
      return { error: response.data.error || "Register Failed!" };
    }

    return { success: response.data.isSuccess, user: response.data.user };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        error: error.response?.data?.error || "Login Failed!",
      };
    } else throw error;
  }
};

export const SessionAction = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  console.log(formData);
  if (actionType === "delete") {
    const sessionId = formData.get("sessionId");
    try {
      const response = await authApi.post(API_PATHS.SESSION.DELETE, sessionId);

      if (response.status !== 200) {
        return { error: "Failed to delete session" };
      }
      return response.data;
    } catch (error) {
      return {
        error: error?.response?.data?.message || "Something went wrong",
      };
    }
  }
  const payload = Object.fromEntries(formData.entries());

  if (actionType === "createAction") {
    try {
      const aiResponse = await authApi.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        ...payload,
        numberOfQuestions: 10,
        level: "basic",
      });

      if (aiResponse.status !== 200) {
        return { error: "Failed to generate questions" };
      }
      const generatedQuestion = aiResponse.data.generatedQuestion;
      const response = await authApi.post(API_PATHS.SESSION.CREATE, {
        ...payload,
        questions: generatedQuestion,
      });
      if (response.status !== 200) {
        return { error: "Failed to create sesion" };
      }
      return response.data;
    } catch (error) {
      return {
        error: error?.response?.data?.message || "Something went wrong",
      };
    }
  }
};

export const InterviewAction = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("action");
  const questionId = formData.get("questionId");
  const question = formData.get("question");
  console.log(
    "Action:",
    actionType,
    "QuestionId:",
    questionId,
    "Question:",
    question
  );

  try {
    if (actionType === "pin") {
      if (!questionId) return { error: "Question ID is required" };
      const response = await authApi.post(API_PATHS.QUESTION.PIN(questionId));
      if (response.status !== 200) return { error: response.data.error };

      return {
        success: response.data.success,
        message: response.data.message,
        question: response.data.question,
      };
    }

    if (actionType === "explain") {
      if (!question) return { error: "Question is required" };
      const response = await authApi.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        question,
      });
      if (response.status !== 200) return { error: response.data.message };
      return {
        success: response.data.success,
        message: response.data.message,
        explanation: response.data.explanation,
      };
    }
  } catch (err) {
    return {
      error: err?.response?.data?.message || "Something went wrong",
    };
  }
};
