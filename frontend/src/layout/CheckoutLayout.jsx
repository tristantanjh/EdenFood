import React from "react";
import { Outlet } from "react-router-dom";
import AppBarSecondary from "../components/AppBarSecondary";
import CssBaseline from "@mui/material/CssBaseline";

export default function Checkout() {
  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
      <div style={{ height: "84px" }}></div>

      <Outlet />
    </div>
  );
}
