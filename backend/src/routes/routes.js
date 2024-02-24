import express from "express";
import { Company } from "../model/model.js";

import { addToCart } from "../controller/cartController.js";
import { createListing } from "../controller/groceryController.js"
import { checkoutOrder } from "../controller/orderController.js";
import { createUser } from "../controller/userController.js";
import { addToWishList } from "../controller/wishListController.js";
import { leaveReview } from "../controller/reviewController.js";


const APIrouter = express.Router();

/**
 * getAllCompany method
 * @return {Array} found
 */
APIrouter.get("/getAllCompany", (req, res) => {
  Company.find()
    .then((found) => {
      res.send(found);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

/**
 * addCompany method
 * @param {String} company_name
 * @param {String} company_email
 * @return {String} result
 */
APIrouter.post("/addCompany", (req, res) => {
  const newCompany = new Company({
    company_name: req.body.company_name,
    company_email: req.body.company_email,
  });

  newCompany
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

APIrouter.post("/createUser", createUser);

APIrouter.post("/createGrocery", createListing)

APIrouter.post("/addToCart", addToCart)

APIrouter.post("/addToWishlist", addToWishList);

APIrouter.post("/checkoutOrder", checkoutOrder);

APIrouter.post("/leaveReview/:groceryId", leaveReview);

export { APIrouter };
