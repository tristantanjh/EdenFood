import mongoose, { Schema } from "mongoose";

const grocerySchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  imageURL: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
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
