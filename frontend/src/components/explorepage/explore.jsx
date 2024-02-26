import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarSecondary from "../AppBarSecondary.jsx";
import Footer from "../Footer.jsx";
import ItemCard from "./ItemCard.jsx";
import SearchBar from "./SearchBar.jsx";

export default function Explore() {
  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
      <SearchBar />
      <ItemCard />
      <Footer />
    </div>
  );
}
