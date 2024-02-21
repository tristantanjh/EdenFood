import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppAppBar from "../AppAppBar.jsx";
import Hero from "../landingpage/Hero.jsx";
import LogoCollection from "../landingpage/LogoCollection.jsx";
import FeaturesCustomer from "./FeaturesCustomer.jsx";
import Footer from "../Footer.jsx";
import FeaturesMerchant from "./FeaturesMerchant.jsx";

export default function Navigation() {
  return (
    <div>
      <CssBaseline />
      <AppAppBar />
      <Hero />
      <Box sx={{ bgcolor: "#FAFFF4" }}>
        <LogoCollection />
        <FeaturesCustomer />
      </Box>
      <Box sx={{ bgcolor: "#076365" }}>
        <FeaturesMerchant />
      </Box>
      <Footer />
    </div>
  );
}
