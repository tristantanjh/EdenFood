import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarSecondary from "../AppBarSecondary.jsx";
import Footer from "../Footer.jsx";
import ItemDescriptionTab from "./ItemDescriptionTab.jsx";
import ProductAvailability from "./ProductAvailability.jsx";

export default function Explore() {
  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
      <ItemDescriptionTab />
      <Footer />
    </div>
  );
}
