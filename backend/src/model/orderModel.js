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
    groceries: [
      {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grocery",
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export { Order };
