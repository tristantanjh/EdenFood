import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import EditProfile from "./EditProfileMain.jsx";
import Footer from "../Footer.jsx";
import AppBarSecondary from "../AppBarSecondary.jsx";

export default function EditProfilePage() {
  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
      <EditProfile />
      <Footer />
    </div>
  );
}
