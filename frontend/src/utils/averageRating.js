import axios from "axios";

export const averageRating = async (groceryId) => {
  try {
    const response = await axios.get("http://localhost:3000/reviews", {
      params: { groceryId: groceryId },
    });
    const reviews = response.data;
    if (reviews.length > 0) {
      let totalRating = 0;
      reviews.forEach((review) => {
        totalRating += review.rating;
      });
      return totalRating / reviews.length;
    } else {
      return 0;
    }
    
  } catch (error) {
    console.error(error);
  }
};

export default averageRating;
