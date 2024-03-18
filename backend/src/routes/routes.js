import express from "express";

import { addToCart, getCart } from "../controller/cartController.js";
import {
  createListing,
  getListingByGroceryId,
} from "../controller/groceryController.js";
import { 
  checkoutOrder, 
  getOrdersWithUserId
} from "../controller/orderController.js";

import {
  authenticateUser,
  createUser,
  getEmail,
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

const APIrouter = express.Router();

APIrouter.post("/login", authenticateUser);

APIrouter.post("/createUser", createUser);

APIrouter.post("/createGrocery", createListing);

APIrouter.post("/addToCart", addToCart);

APIrouter.post("/addToWishlist", addToWishList);

APIrouter.post("/checkoutOrder", checkoutOrder);

APIrouter.post("/getOrdersWithUserId/:userId",getOrdersWithUserId)

APIrouter.post("/leaveReview/:groceryId", leaveReview);

APIrouter.get("/getCart/:userId", getCart);

APIrouter.get("/getListingByGroceryId/:groceryId", getListingByGroceryId);

APIrouter.get("/reviews/:groceryId", getReview);

APIrouter.delete("/review/:id", deleteReview);

APIrouter.get("/user/email/:username", getEmail);

APIrouter.get("/user/profile-pic/:username", getProfilePic);

APIrouter.get("/wishlist/:userId", getWishList);

export { APIrouter };
