import { Grocery } from "../model/groceryModel.js";
import { User } from "../model/userModel.js";

const createListing = async (req, res) => {
  const {
    name,
    description,
    imageURL,
    price,
    user,
    category,
    instruction,
    freshness,
    quantity,
  } = req.body;

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
    const { groceryId } = req.query;
    
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
    const { category } = req.query;
    
    const groceries = await Grocery.find({ category: category });

    if (groceries.length === 0) {
      return res
        .status(404)
        .json({ message: "No groceries found for the specified category" });
    }

    res.json(groceries);
  } catch (err) {
    console.error("Error fetching groceries by category:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get grocery by userId
const getListingsByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    
    const groceries = await Grocery.find({ user: userId });

    res.json(groceries);
  } catch (err) {
    console.error("Error fetching groceries by category:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get all filter the user own listing 

const getAllGroceries = async (req, res) => {
  try {
    const groceries = await Grocery.find();
    const userId = req.query.userId;
    const filteredCategories = req.query.categories[0].split(", ");
    // console.log(filteredCategories);

    const currUser = await User.find({ user: userId });

    if (!currUser) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    if (groceries.length === 0) {
      console.log("No groceries avail");
      return res.status(404).json({ message: "No groceries found" });
    }

    const filteredGroceries = groceries.filter(grocery => grocery.user.toString() !== userId);
    const result = [];

    for (let i = 0; i < filteredCategories.length; i++) {
      let categoryObject = { categoryName: filteredCategories[i], categoryItems: [] };
      result.push(categoryObject);
    }

    filteredGroceries.map(grocery => result[filteredCategories.indexOf(grocery.category)].categoryItems.push(grocery));

    // console.log(result);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching groceries" });
  }
};

export {
  createListing,
  getListingByGroceryId,
  getListingsByCategory,
  getListingsByUserId,
  getAllGroceries,
};
