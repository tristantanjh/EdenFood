import { Outlet } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { LinearProgress, Box } from "@mui/material";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppBarSecondary from "../components/AppBarSecondary";
import Footer from "../components/Footer";

export default function AdminLayout() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      toast("Access Denied", { type: "error" });
      navigate("/explore");
    }
  }, [isAdmin, navigate]);

  return (
    <Suspense fallback={<LinearProgress />}>
      <AppBarSecondary />
      <Box
          sx={{
            height: { xs: "84px", sm: "90px" },
          }}
        />
      <Outlet />
      <Footer />
    </Suspense>
  );
}
