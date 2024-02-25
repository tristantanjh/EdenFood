import express from "express";

import { addToCart, getListOfGroceries } from "../controller/cartController.js";
import { createListing } from "../controller/groceryController.js"
import { checkoutOrder } from "../controller/orderController.js";
import { createUser } from "../controller/userController.js";
import { addToWishList } from "../controller/wishListController.js";
import { leaveReview } from "../controller/reviewController.js";


const APIrouter = express.Router();


APIrouter.post("/createUser", createUser);

APIrouter.post("/createGrocery", createListing)

APIrouter.post("/addToCart", addToCart)

APIrouter.post("/addToWishlist", addToWishList);

APIrouter.post("/checkoutOrder", checkoutOrder);

APIrouter.post("/leaveReview/:groceryId", leaveReview);

APIrouter.get("/getListOfGrocery/:userId", getListOfGroceries);


export { APIrouter };
