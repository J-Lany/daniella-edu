import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import LoginPage from "./pages/Login/Login-page";
import RegistrationPage from "./pages/Registration/Registration-page";
import ChatPage from "./pages/Chat/Chat-page";
import ErrorPage from "./pages/Error/Error-page";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <ChatPage />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
