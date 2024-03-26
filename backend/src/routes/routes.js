import express from "express";

import {
  addToCart,
  getCart,
  removeFromCart,
  incrementGroceryQuantity,
  decrementGroceryQuantity,
} from "../controller/cartController.js";
import {
  createListing,
  getListingByGroceryId,
  getListingsByCategory,
  getListingsByUserId,
  getAllGroceries,
} from "../controller/groceryController.js";
import {
  checkoutOrder,
  getOrdersWithUserId,
} from "../controller/orderController.js";

import {
  authenticateUser,
  logOut,
  createUser,
  getEmail,
  getUserWithId,
  getProfilePic,
} from "../controller/userController.js";
import {
  addToWishList,
  getWishList,
} from "../controller/wishListController.js";
import {
  leaveReview,
  getReview,
  deleteReview,
} from "../controller/reviewController.js";
import { get } from "https";

const APIrouter = express.Router();

APIrouter.post("/login", authenticateUser);

APIrouter.post("/createUser", createUser);

APIrouter.post("/createGrocery", createListing);

APIrouter.post("/addToCart", addToCart);

APIrouter.post("/addToWishlist", addToWishList);

APIrouter.post("/checkoutOrder", checkoutOrder);

APIrouter.get("/getOrdersWithUserId", getOrdersWithUserId);

APIrouter.post("/leaveReview", leaveReview);

APIrouter.get("/logout", logOut);

APIrouter.get("/getCart", getCart);

APIrouter.get("/getListingByGroceryId", getListingByGroceryId);

APIrouter.get("/getListingByUserId", getListingsByUserId);

APIrouter.get("/reviews", getReview);

APIrouter.delete("/review", deleteReview);

APIrouter.get("/user/email", getEmail);

APIrouter.get("/user/profile-pic", getProfilePic);

APIrouter.get("/wishlist", getWishList);

///untested

APIrouter.delete("/removeFromCart",removeFromCart);

APIrouter.post("/incrementGroceryQuantity", incrementGroceryQuantity);

APIrouter.post("/decrementGroceryQuantity", decrementGroceryQuantity);

APIrouter.get("/getListingsByCategory", getListingsByCategory);

APIrouter.get("/getAllOtherGroceries", getAllGroceries);

APIrouter.get("/getUserWithId/", getUserWithId);

export { APIrouter };
