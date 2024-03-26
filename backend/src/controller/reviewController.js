import { Review } from "../model/reviewModel.js";

const leaveReview = async (req, res) => {
  try {
    const { groceryId, rating , description } = req.body;

    if (!groceryId || !rating || !description) {
      return res
        .status(400)
        .send("Missing required fields: groceryId, rating, description");
    }

    const review = new Review({
      groceryId,
      rating,
      description,
    });

    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(500).send("An error occurred while creating the review");
  }
};

//get review --> groceryID
const getReview = async (req, res) => {
  try {
    const { groceryId } = req.query;
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
    const { reviewId } = req.query;
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
