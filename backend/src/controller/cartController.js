import { Cart } from "../model/cartModel.js";
import { Grocery } from "../model/groceryModel.js";

const addToCart = async (req, res) => {
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
  }
  
  const getListOfGroceries = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find the user's cart and populate it with groceries
      const userCart = await Cart.findOne({ user: userId }).populate('items.grocery');
  
      if (!userCart) {
        return res.status(404).json({ message: 'Cart not found for this user' });
      }
  
      // Extract all groceries from the cart items
      const allGroceries = userCart.items.map(item => item.grocery);
  
      res.json(allGroceries);
    } catch (err) {
      console.error('Error fetching groceries:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

//get cart based on userID

export { addToCart, getListOfGroceries };

