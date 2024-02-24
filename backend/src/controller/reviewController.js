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
  }

  export { leaveReview };