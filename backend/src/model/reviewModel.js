import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      required: true,
      type: Number,
    },
    description: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export { Review };
