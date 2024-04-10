import { Cart } from "../model/cartModel.js";
import { Grocery } from "../model/groceryModel.js";
import { User } from "../model/userModel.js";

const deleteCart = async (req, res) => {
  try {
    const userId = req.query.userId;
    const result = await Cart.deleteOne({ user: userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Cart not found." });
    }

    return res.status(200).json({ message: "Cart deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the cart." });
  }
};

// modify to accept itemId and quantity
const addToCart = async (req, res) => {
  const { userId, groceryId, quantity } = req.body;

  try {
    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const grocery = await Grocery.findOne({ _id: groceryId });
    if (!grocery) {
      return res.status(404).json({ message: "Grocery not found" });
    }

    if (quantity > grocery.quantity) {
      return res
        .status(405)
        .json({ message: "Insufficient grocery quantity for your request." });
    }
    if (typeof quantity !== "number" || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity should be a positive number" });
    }

    const existingItemIndex = cart.items.findIndex((item) =>
      item.grocery.equals(groceryId)
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
      cart.totalPrice += quantity * grocery.price;
    } else {
      cart.items.push({ grocery: groceryId, quantity: quantity });
      cart.totalPrice += quantity * grocery.price;
    }

    const savedCart = await cart.save();

    res.status(200).json(savedCart);
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ message: "An error occurred while adding to the cart." });
  }
};

//get cart based on userID
const getCart = async (req, res) => {
  try {
    const userId = req.query.userId;

    // Find the user's cart and populate it with groceries
    const userCart = await Cart.findOne({ user: userId }).populate(
      "items.grocery"
    );

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    // Extract all groceries from the cart items
    // const allGroceries = userCart.items.map((item) => item.grocery);

    res.json(userCart);
  } catch (err) {
    console.error("Error fetching groceries:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//this is completely remove the item
const removeFromCart = async (req, res) => {
  try {
    const { userId, groceryId } = req.query;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    const item = cart.items.find((item) => item.grocery.equals(groceryId));

    let grocery = await Grocery.findById(item.grocery);
    cart.totalPrice -= grocery.price * item.quantity;
    cart.items = cart.items.filter((item) => !item.grocery.equals(groceryId));

    const updatedCart = await cart.save();

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while removing from the cart." });
  }
};

//change value --> decrement/increment by 1
const decrementGroceryQuantity = async (req, res) => {
  try {
    const { cartId, groceryId } = req.body;

    let cart = await Cart.findById(cartId);
    const grocery = await Grocery.findById(groceryId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((item) => item.grocery.equals(groceryId));

    if (!item) {
      return res.status(404).json({ message: "Grocery not found in the cart" });
    }

    if (!grocery) {
      return res.status(404).json({ message: "Grocery not found" });
    }

    // Decrement the quantity of the item by 1
    if (item.quantity > 1) {
      item.quantity -= 1;
      cart.totalPrice -= grocery.price;
    } else {
      // If quantity is already 1, remove the item from the cart
      cart.items = cart.items.filter((item) => !item.grocery.equals(groceryId));
      cart.totalPrice -= grocery.price;
    }

    const updatedCart = await cart.save();

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while decrementing the grocery quantity",
    });
  }
};

const incrementGroceryQuantity = async (req, res) => {
  try {
    const { cartId, groceryId } = req.body;

    let cart = await Cart.findById(cartId);
    const grocery = await Grocery.findById(groceryId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((item) => item.grocery.equals(groceryId));

    if (!item) {
      return res.status(404).json({ message: "Grocery not found in the cart" });
    }

    if (!grocery) {
      return res.status(404).json({ message: "Grocery not found" });
    }

    if (item.quantity + 1 < grocery.quantity) {
      item.quantity += 1;
      cart.totalPrice += grocery.price;
    } else {
      return res.status(401).json({
        message:
          "Cannot increment quantity. Quantity exceeds available quantity",
      });
    }

    // Save the updated cart
    const updatedCart = await cart.save();

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while incrementing the grocery quantity",
    });
  }
};

export {
  addToCart,
  getCart,
  removeFromCart,
  incrementGroceryQuantity,
  decrementGroceryQuantity,
  deleteCart,
};
