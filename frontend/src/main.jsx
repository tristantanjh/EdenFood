import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./routes/App.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Explore from "./components/explorepage/explore.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
