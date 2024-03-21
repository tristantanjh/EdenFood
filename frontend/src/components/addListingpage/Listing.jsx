import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarSecondary from "../AppBarSecondary.jsx";
import Footer from "../Footer.jsx";
import ListingDetails from "./ListingDetails.jsx";

export default function Listing() {
  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
      <ListingDetails />
      <Footer />
    </div>
  );
}
