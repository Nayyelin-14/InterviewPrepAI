import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import {
  authCheckLoader,
  fetchAllSessions,
  fetchSessionById,
} from "./router/loader";
import {
  InterviewAction,
  LoginAction,
  RegisterAction,
  SessionAction,
} from "./router/action";
import AuthLayout from "./Layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: LoginAction,
      },
      {
        path: "register",
        element: <Register />,
        action: RegisterAction,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: fetchAllSessions,
    action: SessionAction,
  },
  {
    path: "/interview-prep/:sessionId",
    element: <InterviewPrep />,
    loader: fetchSessionById,
    action: InterviewAction,
  },
]);
