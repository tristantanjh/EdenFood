import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    groceryId: {
      type: Schema.Types.ObjectId,
      ref: "Grocery",
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
