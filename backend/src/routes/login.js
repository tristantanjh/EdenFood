import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("../../frontend/views/login");
});

router.post("/", (req, res) => {
    res.render("../../frontend/views/home");
});

export default router;
