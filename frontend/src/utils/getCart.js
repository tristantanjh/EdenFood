import axios from "axios";

export const getCart = async (userId) => {
  try {
    const response = await axios.get("http://localhost:3000/getCart", {
      params: { userId: userId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getCart;

