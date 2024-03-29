import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import EditPassword from "./EditPasswordMain.jsx";
import Footer from "../Footer.jsx";
import AppBarSecondary from "../AppBarSecondary.jsx";
import { useAuth } from "../../hooks/AuthProvider";

export default function EditPasswordMain() {
  const { user } = useAuth();

  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
      <EditPassword user={user} />
      <Footer />
    </div>
  );
}
