import { Cart } from "../model/cartModel.js";

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

export { addToCart };

