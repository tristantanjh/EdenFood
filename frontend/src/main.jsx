import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
  Navigate,
  Router,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./routes/App.jsx";
import Login from "./routes/Login.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Explore from "./components/explorepage/explore.jsx";
import Listing from "./components/addListingpage/Listing.jsx";
import Register from "./routes/Register.jsx";
import Item from "./components/itempage/Item.jsx";
import OrderHistory from "./components/orderhistory/OrderHistory";
import CheckoutLayout from "./layout/CheckoutLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import ProtectedLayout from "./layout/ProtectedLayout.jsx";
import PublicLayout from "./layout/PublicLayout.jsx";
import Profile from "./components/profilepage/ProfilePage.jsx";
import ShoppingCart from "./components/shoppingCartpage/shoppingCart.jsx";
import EditProfilePage from "./components/editProfilepage/EditProfile.jsx";
import Pickup from "./components/checkout/pickup/Pickup.jsx";
import Confirmation from "./components/checkout/confirmation/Confirmation.jsx";
import EditPasswordMain from "./components/editPasswordPage/EditPassword.jsx";

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
            path: "/item/:_id",
            element: <Item />,
          },
          {
            path: "/orderhistory",
            element: <OrderHistory />,
          },
          {
            path: "/shoppingCart",
            element: <ShoppingCart />,
          },
          {
            path: "/checkout/:session",
            element: <CheckoutLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="pickup" />,
              },
              {
                path: "pickup",
                element: <Pickup />,
              },
              {
                path: "confirmation",
                element: <Confirmation />,
              },
            ],
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/addListing",
            element: <Listing />,
          },
          {
            path: "/editProfile",
            element: <EditProfilePage />,
          },
          {
            path: "/editPassword",
            element: <EditPasswordMain />,
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
