import mongoose from 'mongoose';
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
  const userId = req.params.userId;

  try {
    // Validate userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid userId");
    }

    // Attempt to find the wishlist by userId
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "groceries"
    );

    if (!wishlist) {
      return res
        .status(404)
        .json({ message: "Wishlist not found for the given userId" });
    }

    // Respond with the found wishlist
    res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the wishlist." });
  }
};

export { addToWishList, getWishList };
