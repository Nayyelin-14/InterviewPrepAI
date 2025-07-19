import { redirect } from "react-router-dom";
import api, { authApi } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { AxiosError } from "axios";

export const authCheckLoader = async () => {
  try {
    const response = await authApi.get(API_PATHS.Auth.CHECK_AUTH);
    if (response.status === 200) {
      return null; // Authenticated, allow route to render
    }
  } catch (error) {
    console.log(error);
    // Not authenticated, redirect to landing/login
    return redirect("/");
  }
};
export const fetchAllSessions = async () => {
  const user = await authCheckLoader();
  if (user instanceof Response) return user;

  try {
    const response = await api.get(API_PATHS.SESSION.GET_ALL);
    if (response.status === 200) {
      return { sessions: response.data };
    } else if (response.status === 404) {
      return { sessions: [] }; // No session found, handle gracefully in UI
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        error: error.response?.data?.error || "Login Failed!",
      };
    } else throw error;
  }
};

export const fetchSessionById = async ({ params }) => {
  const user = await authCheckLoader();
  if (user instanceof Response) return user;
  try {
    const { sessionId } = params;
    if (!params) {
      return { error: "Session Id is required" };
    }
    const response = await authApi.get(API_PATHS.SESSION.GET_ONE(sessionId));
    if (!response) {
      return { error: response.data.message };
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        error: error.response?.data?.message || "Session not found",
      };
    } else throw error;
  }
};
