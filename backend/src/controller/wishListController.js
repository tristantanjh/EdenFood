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
};

//get wish list based on userid
const getWishList = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "groceries"
    );

    if (wishlist) {
      res.status(200).json(wishlist);
    } else {
      res
        .status(404)
        .json({ message: "Wishlist not found for the given user." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addToWishList, getWishList };
