import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarSecondary from "../AppBarSecondary.jsx";
import Footer from "../Footer.jsx";
import ItemDescription from "./ItemDescription.jsx";

export default function Item() {
  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
      <ItemDescription />
      <Footer />
    </div>
  );
}
