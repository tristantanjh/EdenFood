import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ProfileMain from "./ProfileMain.jsx";
import Footer from "../Footer.jsx";
import AppBarSecondary from "../AppBarSecondary.jsx";

export default function ProfilePage() {
  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
      <ProfileMain />
      <Footer />
    </div>
  );
}
