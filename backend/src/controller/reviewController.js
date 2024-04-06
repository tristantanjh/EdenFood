import { Review } from "../model/reviewModel.js";
import { User } from "../model/userModel.js";

const leaveReview = async (req, res) => {
  try {
    // const userId = req.params.userId;
    const { sellerId, buyerId, rating, description } = req.body;

    if (!sellerId || !buyerId || !rating || !description) {
      return res
        .status(400)
        .send("Missing required fields: groceryId, rating, description");
    }

    const review = new Review({
      sellerId,
      buyerId,
      rating,
      description,
    });

    const savedReview = await review.save();
    console.log(savedReview);
    await User.findOneAndUpdate(
      { _id: sellerId },
      { $push: { reviews: savedReview._id } },
      { new: true }
    );
    res.status(201).send(review);
  } catch (error) {
    res.status(500).send("An error occurred while creating the review");
  }
};
const getReviewWithId = async (req, res) => {
  try {
    const reviewId = req.query.reviewId;
    const review = await Review.findOne({ _id: reviewId });

    if (review) {
      res.status(200).json({ review });
    } else {
      res.status(404).json({ message: "Review not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get review --> groceryID
const getReview = async (req, res) => {
  try {
    const groceryId = req.query.groceryId;
    const reviews = await Review.find({ groceryId: groceryId });
    if (reviews.length) {
      res.status(200).json(reviews);
    } else {
      res
        .status(200)
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

export { leaveReview, getReview, deleteReview, getReviewWithId };
