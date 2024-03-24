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
import Checkout from "./routes/Checkout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import ProtectedLayout from "./layout/ProtectedLayout.jsx";
import PublicLayout from "./layout/PublicLayout.jsx";
import Profile from "./components/profilepage/ProfilePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <App />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/explore",
            element: <Explore />,
          },
          {
            path: "/item",
            element: <Item />,
          },
          {
            path: "/orderhistory",
            element: <OrderHistory />,
          },
          {
            path: "/checkout",
            element: <Checkout />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
