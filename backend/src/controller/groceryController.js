import { Grocery } from "../model/groceryModel.js";

const createListing = async (req, res) => {
  const { name, description, imageURL, price, user, category, instruction, fresheness, quantity } = req.body;

  try {
    const newGrocery = new Grocery({
      name,
      description,
      imageURL,
      price,
      user,
      category,
      instruction,
      fresheness,
      quantity,
    });


    const savedGrocery = await newGrocery.save();
    res.status(201).json(savedGrocery);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the grocery." });
  }
};

//get all listing based on grocery id

const getListingByGroceryId = async (req, res) => {
  try {
    const groceryId = req.params.groceryId;
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

const getListingsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const groceries = await Grocery.find({ category: category });

    if (groceries.length === 0) {
      return res.status(404).json({ message: "No groceries found for the specified category" });
    }

    res.json(groceries);
  } catch (err) {
    console.error("Error fetching groceries by category:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get all

const getAllGroceries = async (req, res) => {
  try {
    const groceries = await Grocery.find();

    if (groceries.length === 0) {
      return res.status(404).json({ message: "No groceries found" });
    }
    res.json(groceries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching groceries" });
  }
};

export { createListing, getListingByGroceryId, getListingsByCategory, getAllGroceries };