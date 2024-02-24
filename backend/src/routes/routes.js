import express from "express";
import { Company } from "../model/model.js";
import { Cart } from "../model/cartModel.js";
import { Grocery } from "../model/groceryModel.js";
import { Order } from "../model/orderModel.js";
import { Review } from "../model/reviewModel.js";
import { User } from "../model/userModel.js";
import { Wishlist } from "../model/wishlistModel.js";

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

APIrouter.post("/createUser", async (req, res) => {
  const { username, email, password, profilePic } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password,
      profilePic,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
});

APIrouter.post("/createGrocery", async (req, res) => {
  const { name, description, imageURL, price } = req.body;

  try {
    const newGrocery = new Grocery({
      name,
      description,
      imageURL,
      price,
    });

    const savedGrocery = await newGrocery.save();
    res.status(201).json(savedGrocery);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the grocery." });
  }
});

APIrouter.post("/addToCart", async (req, res) => {
  const { userId, items } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items });
    } else {
      items.forEach((item) => {
        const existingItem = cart.items.find((ci) =>
          ci.grocery.equals(item.grocery)
        );
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          cart.items.push(item);
        }
      });
    }

    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while adding to the cart." });
  }
});

APIrouter.post("/addToWishlist", async (req, res) => {
  const { userId, groceryIds } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, groceries: groceryIds });
    } else {
      groceryIds.forEach((groceryId) => {
        if (!wishlist.groceries.includes(groceryId)) {
          wishlist.groceries.push(groceryId);
        }
      });
    }
    const savedWishlist = await wishlist.save();
    res.status(200).json(savedWishlist);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while adding to the wishlist." });
  }
});

APIrouter.post("/checkoutOrder", async (req, res) => {
  const { pickupLocation, groceries } = req.body;

  const newOrder = new Order({
    pickupLocation,
    status: "pending",
    groceries,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the order." });
  }
});

APIrouter.post("/leaveReview/:groceryId", async (req, res) => {
  const { rating, description } = req.body;
  const { groceryId } = req.params;

  try {
    const newReview = new Review({
      rating,
      description,
    });

    const savedReview = await newReview.save();

    const grocery = await Grocery.findById(groceryId);
    if (!grocery) {
      return res.status(404).json({ message: "Grocery item not found." });
    }
    grocery.reviews.push(savedReview._id);
    await grocery.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while leaving the review." });
  }
});

export { APIrouter };
