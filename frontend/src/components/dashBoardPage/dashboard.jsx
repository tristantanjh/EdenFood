import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarSecondary from "../AppBarSecondary.jsx";
import Footer from "../Footer.jsx";
import AnalyticsHeader from "./SearchBar.jsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dashboard from "./db.jsx";



export default function Explore() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
      <AnalyticsHeader />
      <Dashboard/>
        
    
      
      <Footer />
    </div>
  );
}
