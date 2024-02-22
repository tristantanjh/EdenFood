import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppBarSecondary from "../AppBarSecondary.jsx";
import Footer from "../Footer.jsx";
import ItemCard from "./ItemCard.jsx";
import ProductAvailability from "./ProductAvailability.jsx";

export default function Explore() {
  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
      <ProductAvailability />
      <Footer />
    </div>
  );
}
