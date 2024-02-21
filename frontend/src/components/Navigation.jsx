import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AppAppBar from "../components/AppAppBar.jsx";
import Hero from "../components/Hero.jsx";
import LogoCollection from "../components/LogoCollection.jsx";
import Highlights from "../components/Highlights.jsx";
import Pricing from "../components/Pricing.jsx";
import Features from "../components/Features.jsx";
import FAQ from "../components/FAQ.jsx";
import Footer from "../components/Footer.jsx";

export default function Navigation() {
  return (
    <div>
      <CssBaseline />
      <AppAppBar />
      <Hero />
      <Box sx={{ bgcolor: "#FFFFFF" }}>
        <LogoCollection />
        <Features />
        <Divider />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </div>
  );
}
