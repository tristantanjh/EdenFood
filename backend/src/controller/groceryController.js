import { Grocery } from "../model/groceryModel.js";

const createListing = async (req, res) => {
  const { name, description, imageURL, price, user, category, instruction, fresheness } = req.body;

  try {
    const newGrocery = new Grocery({
      name,
      description,
      imageURL,
      price,
      user,
      category,
      instruction,
      freshness,
    });

    //instruction -> string
    //recipe -> string
    //freshness -> int 

    const savedGrocery = await newGrocery.save();
    res.status(201).json(savedGrocery);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the grocery." });
  }
};

//get all listing based on user id

const getListingByGroceryId = async (req, res) => {
  try {
    const groceryId = req.params.groceryId;

    // Find the grocery by its ID
    const grocery = await Grocery.findById(groceryId);

    if (!grocery) {
      return res.status(404).json({ message: "Grocery not found" });
    }

    res.json(grocery);
  } catch (err) {
    console.error("Error fetching grocery:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get by category 

//get by name 

export { createListing, getListingByGroceryId };
