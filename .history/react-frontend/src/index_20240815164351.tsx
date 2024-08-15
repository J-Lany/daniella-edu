import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import RegistrationPage from "./pages/Registration/Registration-page";
import ErrorPage from "./pages/Error/Error-page";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoginPage from "./pages/Login/Login-page";
import ChatPage from "./pages/Chat/Chat-page";

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
