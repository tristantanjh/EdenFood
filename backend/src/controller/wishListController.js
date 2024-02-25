import { Wishlist } from "../model/wishlistModel.js";

const addToWishList = async (req, res) => {
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
  }

  //get wish list based on id

  export { addToWishList }