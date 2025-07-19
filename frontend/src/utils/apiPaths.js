export const BASE_URL = import.meta.env.VITE_API_URL;

export const API_PATHS = {
  Auth: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    GET_PROFILE: "auth/profile",
    CHECK_AUTH: "auth/auth-check",
    LOGOUT: "auth/logout",
  },
  QUESTION: {
    ADD_TO_SESSION: "/questions/add-question",
    PIN: (questionId) => `/questions/${questionId}/pin`,
    UPDATE_NOTE: (questionId) => `/questions/${questionId}/add-note`,
  },
  SESSION: {
    CREATE: `/session/create-session`,
    GET_ALL: "session/my-session",
    DELETE: (sessionId) => `/session/delete-session/${sessionId}`,
    GET_ONE: (sessionId) => `/session/getsession/${sessionId}`,
  },
  AI: {
    GENERATE_QUESTIONS: "/ai/generate-questions",
    GENERATE_EXPLANATION: "/ai/generate-explanations",
  },
};
