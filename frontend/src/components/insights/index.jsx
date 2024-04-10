import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import DashBoard from "./Dashboard";
import Footer from "../Footer.jsx";
import AppBarSecondary from "../AppBarSecondary.jsx";
import { useAuth } from "../../hooks/AuthProvider";

export default function DashBoardPage() {
  const { user } = useAuth();

  return (
    <div>
      <CssBaseline />
      <br></br>
      <AppBarSecondary />
      <DashBoard />
      <Footer />
    </div>
  );
}
