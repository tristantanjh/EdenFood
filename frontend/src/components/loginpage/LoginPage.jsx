import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppAppBar from "../AppAppBar.jsx";
import LoginSide from "./LoginSide.jsx";

export default function LoginPage() {
  return (
    <div>
        <CssBaseline />
        <LoginSide />  
    </div>
  );
}
