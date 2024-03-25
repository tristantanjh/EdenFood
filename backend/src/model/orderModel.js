import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    pickupLocation: {
      required: true,
      type: String,
    },
    status: {
      required: true,
      type: String,
    },
    user: {
      require: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    merchant: {
      require: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      require: true,
      type: Number,
    },
    groceries: [
      {
        grocery: {
          required: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: "Grocery",
        },
        quantity: {
          required: true,
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export { Order };
