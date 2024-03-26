import mongoose, { Schema } from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    grocery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grocery",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema({
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  items: [cartItemSchema], // Use the subdocument schema here
});

const Cart = mongoose.model("Cart", cartSchema);

export { Cart };
