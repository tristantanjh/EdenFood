import express from "express";

import { sendEmail } from "../controller/emailController.js";

import {
  addToCart,
  getCart,
  removeFromCart,
  incrementGroceryQuantity,
  decrementGroceryQuantity,
  deleteCart,
} from "../controller/cartController.js";

import {
  createListing,
  getListingByGroceryId,
  getListingsByCategory,
  getListingsByUserId,
  getAllGroceries,
  disableGroceryByGroceryId,
} from "../controller/groceryController.js";

import {
  checkoutOrder,
  getOrdersWithUserId,
} from "../controller/orderController.js";

import { getSalesByUserId, getAllSales } from "../controller/saleController.js";

import {
  authenticateUser,
  logOut,
  createUser,
  getEmail,
  getUserWithId,
  getProfilePic,
  editProfile,
  editPassword,
  verify,
} from "../controller/userController.js";

import {
  addToWishList,
  getWishList,
} from "../controller/wishListController.js";

import {
  leaveReview,
  getReview,
  deleteReview,
  getReviewWithId,
} from "../controller/reviewController.js";
import { get } from "https";

const APIrouter = express.Router();

APIrouter.post("/email", sendEmail);

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

APIrouter.get("/getListingsByUserId", getListingsByUserId);

APIrouter.get("/reviews", getReview);

APIrouter.get("/getReviewWithId", getReviewWithId);

APIrouter.delete("/review", deleteReview);

APIrouter.get("/user/email", getEmail);

APIrouter.get("/user/profile-pic", getProfilePic);

APIrouter.get("/wishlist", getWishList);

APIrouter.delete("/removeFromCart", removeFromCart);

APIrouter.post("/incrementGroceryQuantity", incrementGroceryQuantity);

APIrouter.post("/decrementGroceryQuantity", decrementGroceryQuantity);

APIrouter.get("/getListingsByCategory", getListingsByCategory);

APIrouter.get("/getAllOtherGroceries", getAllGroceries);

APIrouter.get("/getUserWithId", getUserWithId);

APIrouter.patch("/editProfile/:userId", editProfile);

APIrouter.patch("/editPassword/:userId", editPassword);

APIrouter.get("/getSalesByUserId", getSalesByUserId);

APIrouter.get("/getAllSales", getAllSales);

APIrouter.post("/disableGrocery", disableGroceryByGroceryId);

APIrouter.put("/verifyUser", verify);

export { APIrouter };
