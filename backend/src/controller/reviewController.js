import { Review } from "../model/reviewModel.js";

const leaveReview = async (req, res) => {
  const { rating, description } = req.body;
  const { groceryId } = req.params;

  try {
    const newReview = new Review({
      rating,
      description,
    });

    const savedReview = await newReview.save();

    const grocery = await Grocery.findById(groceryId);
    if (!grocery) {
      return res.status(404).json({ message: "Grocery item not found." });
    }
    grocery.reviews.push(savedReview._id);
    await grocery.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while leaving the review." });
  }
};

//get review --> groceryID
const getReview = async (req, res) => {
  try {
    const groceryId = req.params.groceryId;
    const reviews = await Review.find({ groceryId: groceryId });
    if (reviews.length) {
      res.status(200).json(reviews);
    } else {
      res
        .status(404)
        .json({ message: "No reviews found for the specified groceryID." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete review --> id
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findByIdAndDelete(reviewId);

    if (review) {
      res.status(200).json({ message: "Review successfully deleted." });
    } else {
      res.status(404).json({ message: "Review not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { leaveReview, getReview, deleteReview };
