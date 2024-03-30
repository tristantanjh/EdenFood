import { Order } from "../model/orderModel.js";
import { Cart } from "../model/cartModel.js";
import { Grocery } from "../model/groceryModel.js";
import { User } from "../model/userModel.js";

const checkoutOrder = async (req, res) => {
  const { pickupLocation, user, cartId } = req.body;

  try {
    const cart = await Cart.findById(cartId).populate("items.grocery");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let hasInvalidQuantity = false;

    //check if any of the grocery indicated value > current db quantity
    for (const item of cart.items) {
      const grocery = await Grocery.findById(item.grocery._id);

      if (!grocery) {
        return res.status(404).json({ message: "Grocery not found" });
      }

      if (item.quantity > grocery.quantity) {
        hasInvalidQuantity = true;
        break;
      }
    }

    if (hasInvalidQuantity) {
      return res.status(400).json({ message: "Some items have too much quantity" });
    }

    const orderItems = cart.items.map((item) => ({
      grocery: item.grocery,
      quantity: item.quantity,
    }));

    const totalPrice = cart.items.reduce((acc, item) => acc + (item.grocery.price * item.quantity), 0);

    const newOrder = new Order({
      pickupLocation,
      status: "pending",
      user,
      amount: totalPrice, 
      groceries: orderItems,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the order." });
  }
};

//get order based on user id

const getOrdersWithUserId = async (req, res) => {
  try {
    const userId = req.query.userId; 
    const orders = await Order.find({ user: userId }).populate({
      path: 'groceries',
      populate: {
        path: 'grocery',
        model: 'Grocery'
      }
    });
    
    if (orders.length > 0) {
      res.status(200).json({ orders });
    } else {
      res.status(200).json({ message: "No orders found for the user." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { checkoutOrder, getOrdersWithUserId };
