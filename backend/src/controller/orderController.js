import { Order } from "../model/orderModel.js";
import { Cart } from "../model/cartModel.js";
import { Grocery } from "../model/groceryModel.js";
import { User } from "../model/userModel.js";
import { Sale } from "../model/saleModel.js";

const checkoutOrder = async (req, res) => {
  const { pickupLocation, userId, cartId } = req.body;

  try {
    const cart = await Cart.findById(cartId).populate("items.grocery");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let hasInvalidQuantity = false;

    // Check if any of the grocery indicated value > current db quantity
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
      return res
        .status(400)
        .json({ message: "Some items have too much quantity" });
    }

    //for each grocery create a sale object
    await Promise.all(
      cart.items.map(async (cartItem) => {
        const sale = new Sale({
          user: cartItem.grocery.user,
          totalPrice: cartItem.grocery.price * cartItem.quantity,
          items: [
            {
              grocery: cartItem.grocery._id,
              quantity: cartItem.quantity,
            },
          ],
        });
        await sale.save();
      })
    );

    //problem starts here
    // Reduce the quantity of affected groceries in the database
    /*for (const item of cart.items) {
        const grocery = await Grocery.findById(item.grocery._id);

        // Update the quantity of the grocery in the database
        await Grocery.findByIdAndUpdate(
          item.grocery._id,
          { $inc: { quantity: -item.quantity } }, // Decrement the quantity by the item's quantity
          { new: true }
        );
      }*/

    for (const item of cart.items) {
      try {
        const grocery = await Grocery.findById(item.grocery._id);
        if (!grocery) {
          console.error(`Grocery with ID ${item.grocery._id} not found.`);
          continue;
        }

        const newQuantity = Math.max(0, grocery.quantity - item.quantity);

        const updatedGrocery = await Grocery.findByIdAndUpdate(
          item.grocery._id,
          { quantity: newQuantity },
          { new: true }
        );

        console.log(
          `Updated grocery ${updatedGrocery.name}, new quantity: ${updatedGrocery.quantity}`
        );
      } catch (error) {
        console.error(`shit ass grocery cant be found: ${error}`);
      }
    }

    // Create a function to split the cart by merchant
    const splitCartByMerchant = (cartItems) => {
      // Use reduce to split the cart into an object where keys are unique merchant IDs
      const cartByMerchant = cartItems.reduce((acc, cartItem) => {
        const merchantId = cartItem.grocery.user.toString(); // Convert ObjectId to string for comparison

        if (!acc[merchantId]) {
          acc[merchantId] = [];
        }
        acc[merchantId].push(cartItem);

        return acc;
      }, {});

      return cartByMerchant; // Return the processed object
    };

    const cartByMerchant = splitCartByMerchant(cart.items);

    // Iterate over each merchant ID
    for (const merchantId in cartByMerchant) {
      const merchantList = cartByMerchant[merchantId];

      // Calculate total price for this merchant's groceries
      const totalPriceForMerchant = merchantList.reduce((total, item) => {
        return total + item.grocery.price * item.quantity;
      }, 0);

      // Create order items for this merchant
      const orderItems = merchantList.map((item) => ({
        grocery: item.grocery._id, // Assuming you want to save grocery IDs in the order
        quantity: item.quantity,
      }));

      const result = await Cart.deleteOne({ user: userId });

      // Create a new order for this merchant
      const newOrder = new Order({
        pickupLocation,
        status: "pending",
        user: userId,
        amount: totalPriceForMerchant,
        groceries: orderItems,
      });

      // Save the order
      const savedOrder = await newOrder.save();
    }
    //

    res.status(201).json({ message: "succesfully created orders." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the order." });
  }
};

/*
const checkoutOrder = async (req, res) => {
  const { pickupLocation, user, cartId } = req.body;

  //adjust quantity from db
  //check if all quantity is valid   // just alter to the minimum quantity now 
  


  const newOrder = new Order({
    pickupLocation,
    status: "pending",
    user,
    groceries,
    amount,
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
};
*/

//get order based on user id

const getOrdersWithUserId = async (req, res) => {
  try {
    const userId = req.query.userId;
    const orders = await Order.find({ user: userId }).populate({
      path: "groceries",
      populate: {
        path: "grocery",
        model: "Grocery",
      },
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

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "groceries",
      populate: {
        path: "grocery",
        model: "Grocery",
      },
    });

    if (orders.length > 0) {
      res.status(200).json({ orders });
    } else {
      res.status(200).json({ message: "No orders found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeOrderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.query;
  console.log(orderId);
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: { orderId } });
    }

    if (orderStatus === "pending") {
      order.status = "collected";
    } else if (orderStatus === "collected") {
      order.status = "pending";
    } else {
      return res.status(400).json({ message: "Invalid order status" });
    }

    await order.save();

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { checkoutOrder, getOrdersWithUserId, getAllOrders, changeOrderStatus };
