import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
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
