import { Sale } from "../model/saleModel.js";

const createSale = async (req, res) => {
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
  };
  
  //get sale --> groceryID
  const getSales = async (req, res) => {
    try {
      const groceryId = req.query.groceryId;
      const reviews = await Sale.find({ groceryId: groceryId });
      if (reviews.length) {
        res.status(200).json(reviews);
      } else {
        res
          .status(200)
          .json({ message: "No Sales found for the specified groceryID." });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export {
    getSales,
    createSale,
  };
  