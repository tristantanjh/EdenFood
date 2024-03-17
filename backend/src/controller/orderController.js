
import { Order } from "../model/orderModel.js";



const checkoutOrder =  async (req, res) => {
    const { pickupLocation, groceries } = req.body;
    
    const newOrder = new Order({
      pickupLocation,
      status: "pending",
      user,
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
  }

//get order based on user id

const getOrdersWithUserId = async (req, res) => {
  try {
    const userId = req.params.userId; 
    const orders = await Order.find({ user: userId }).populate("groceries");

    if (orders.length > 0) {
      res.status(200).json({ orders });
    } else {
      res.status(404).json({ message: "No orders found for the user." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  export { checkoutOrder, getOrdersWithUserId };