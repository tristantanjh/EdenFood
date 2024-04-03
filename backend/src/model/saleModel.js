import mongoose, { Schema } from "mongoose";

const saleSchema = new mongoose.Schema(
  {
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
    items: [saleItemSchema], // Use the subdocument schema here
  },
{ timestamps: true }
);


const saleItemSchema = new mongoose.Schema(
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
  { _id: false },
);


const Sale = mongoose.model("Sale", saleSchema);

export { Sale };
