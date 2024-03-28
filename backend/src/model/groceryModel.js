import mongoose, { Schema } from "mongoose";

const grocerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  instruction: {
    type: String,
    required: true,
  },
  freshness: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Grocery = mongoose.model("Grocery", grocerySchema);

export { Grocery };
