import express from "express";
const router = express.Router();

// Renders home page
router.get("/", (req, res) => {
  res.render("../../frontend/views/home");
});

export default router;
