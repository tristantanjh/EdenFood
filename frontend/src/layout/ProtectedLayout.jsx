import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import React from "react";

export default function ProtectedLayout() {
  const { user, logout } = useAuth();

  if (!user) {
    console.log("Unauthorised");
    return <Navigate to="/login" />;
  }

  const SignoutAction = () => {
    logout();
  };

  return (
    <>
      <Outlet />
    </>
  );
}