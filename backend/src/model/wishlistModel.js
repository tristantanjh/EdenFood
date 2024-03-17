import mongoose, { Schema } from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  groceries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grocery",
    },
  ],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export { Wishlist };
