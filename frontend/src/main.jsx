import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./routes/App.jsx";
import Login from "./routes/Login.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Explore from "./components/explorepage/explore.jsx";
import Register from "./routes/Register.jsx";
import Item from "./components/itempage/Item.jsx";
import OrderHistory from "./components/orderhistory/OrderHistory";

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
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/item",
    element: <Item />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/orderhistory",
    element: <OrderHistory />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
