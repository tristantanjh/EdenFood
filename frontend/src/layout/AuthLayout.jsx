import { Outlet } from "react-router-dom";
import { AuthProvider } from "../hooks/AuthProvider";
import React, { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function AuthLayout() {
  return (
    <Suspense fallback={<LinearProgress />}>
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    </Suspense>
  );
}