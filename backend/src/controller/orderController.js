
import { Order } from "../model/orderModel.js";



const checkoutOrder =  async (req, res) => {
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
  }

  export { checkoutOrder };