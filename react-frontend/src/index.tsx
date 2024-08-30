import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import RegistrationPage from "./pages/registration/registration-page";
import ErrorPage from "./pages/error/error-page";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoginPage from "./pages/login/login-page";
import ChatPage from "./pages/chat/chat-page";

const router = createBrowserRouter([
  {
    path: "/registration",
    element: <RegistrationPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
