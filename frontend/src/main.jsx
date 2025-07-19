import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { router } from "./routes.jsx";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import UserProvider from "./context/userContext.jsx";
createRoot(document.getElementById("root")).render(
  <>
    {" "}
    {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
      {/* </ThemeProvider> */}
    </UserProvider>
  </>
);
