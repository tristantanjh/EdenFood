import mongoose, { Schema } from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    groceryId: {
      type: Schema.Types.ObjectId,
      ref: "Grocery",
      required: true,
    },
    quantity: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

const Sale = mongoose.model("Sale", saleSchema);

export { Sale };
