import mongoose, { Schema } from "mongoose";

const cartSchema = new mongoose.Schema({
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

const Cart = mongoose.model("Cart", cartSchema);

export { Cart };
