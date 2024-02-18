import express from "express";
const router = express.Router();

// Renders home page
router.get("/", (req, res) => {
  // Pass the showLoginButton variable to the view rendering function
  res.render("../../frontend/views/home", { showLoginButton: true });
});

export default router;

