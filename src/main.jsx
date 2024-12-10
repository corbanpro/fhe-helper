import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Home from "./Home.jsx";
import "./bootstrap.css";
import "./App.css";

import GetStarted from "./GetStarted.jsx";
import Results from "./Results.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-plan",
        element: <Results />,
      },
      {
        path: "/get-started",
        element: <GetStarted />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
