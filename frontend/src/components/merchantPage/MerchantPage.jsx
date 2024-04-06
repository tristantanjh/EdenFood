import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MerchantMain from "./MerchantMain.jsx";
import Footer from "../Footer.jsx";
import AppBarSecondary from "../AppBarSecondary.jsx";

export default function MerchantPage() {
  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
      <MerchantMain />
      <Footer />
    </div>
  );
}
