import { Sale } from "../model/saleModel.js";


/*const createSale = async (req, res) => {
    try {
      const { groceryId, quantity } = req.body;
  
      if (!groceryId || !quantity) {
        return res
          .status(400)
          .send("Missing required fields: groceryId, quantity");
      }
  
      const sale = new Sale({
        groceryId,
        quantity,
      });
  
      await sale.save();
      res.status(201).send(sale);
    } catch (error) {
      res.status(500).send("An error occurred while creating the sale");
    }
  };*/
  
  //get sale - by merchant id --> need to change

  //might need a method to return  list of sales sorted by date 
  //list of 30 days to plot
  const getSalesByUserId = async (req, res) => {
    try {
      const { userId } = req.body;
  
      const sales = await Sale.find({ "user" : userId });
      //.sort({ createdAt: -1 });
      if (sales.length > 0) {
        res.status(200).json(sales);
      } else {
        res.status(200).json({ message: "No sale found for the user." });
      }
    } catch (err) {
      console.error("Error fetching sales by userId:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const getAllSales = async (req, res) => {
    try {
      const sales = await Sale.find().populate("user").sort({ createdAt: -1 });
      if (sales.length) {
        res.status(200).json(sales);
      } else {
        res
          .status(200)
          .json({ message: "No Sales found." });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export {
    getSalesByUserId,
    getAllSales
  };
  