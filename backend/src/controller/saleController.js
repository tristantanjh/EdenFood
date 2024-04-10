import { Sale } from "../model/saleModel.js";
import mongoose from 'mongoose';


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
      const { userId } = req.query;
  
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


  const getMonthlySalesByUserId = async (req, res) => {
    try {
        const { userId } = req.query;

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1

        const sales = await Sale.aggregate([
            {
                $match: {
                    "user": new mongoose.Types.ObjectId(userId), // Construct ObjectId using new keyword
                    "createdAt": {
                        $gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1), // First day of current month
                        $lt: new Date(currentDate.getFullYear(), currentMonth, 0) // Last day of current month
                    }
                }
            }
        ]);

        // Initialize an array to hold daily sales
        const dailySales = Array(30).fill(0);

        // Update daily sales based on sales data
        sales.forEach(sale => {
          const saleDay = new Date(sale.createdAt).getDate();
          const dayIndex = saleDay - 1; // Subtract 1 because array indices start from 0
          for (let i = dayIndex; i < dailySales.length; i++) {
              dailySales[i] += sale.totalPrice;
          }
      });

        // Return the list of daily sales
        res.status(200).json(dailySales);
        
    } catch (err) {
        console.error("Error fetching sales by userId:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};



  

  export {
    getSalesByUserId,
    getAllSales,
    getMonthlySalesByUserId
  };
  