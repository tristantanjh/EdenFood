import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import EditProfile from "./EditProfileMain.jsx";
import Footer from "../Footer.jsx";
import AppBarSecondary from "../AppBarSecondary.jsx";
import { useAuth } from "../../hooks/AuthProvider";

export default function EditProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
      <EditProfile user={user} />
      <Footer />
    </div>
  );
}
