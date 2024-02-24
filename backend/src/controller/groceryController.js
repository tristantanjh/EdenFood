import { Grocery } from "../model/groceryModel.js";


const createListing = async (req, res) => {
    const { name, description, imageURL, price } = req.body;
  
    try {
      const newGrocery = new Grocery({
        name,
        description,
        imageURL,
        price,
      });
  
      const savedGrocery = await newGrocery.save();
      res.status(201).json(savedGrocery);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the grocery." });
    }
  }

  export { createListing };