import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      required: true,
      type: double,
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
