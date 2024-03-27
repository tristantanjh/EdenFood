import React, { useState, useEffect } from "react";
import { Typography, Container, Button } from "@mui/material";
import { useCheckout } from "../../../hooks/CheckoutProvider";
import { useAuth } from "../../../hooks/AuthProvider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const { selectedLocationLocalStorage } = useCheckout();
  const { user } = useAuth();
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const handlePayPalPayment = () => {
    // Add logic for PayPal payment here
    console.log("Processing PayPal payment...");
  };

  const handleGoBack = () => {
    navigate("/checkout/pickup"); // Navigate back to the previous page
  };

  return (
    <Container
      sx={{
        height: "350px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontFamily: "nunito, sans-serif",
          marginBottom: "16px",
          fontWeight: 700,
        }}
      >
        User Account:
      </Typography>
      <Typography
        sx={{ fontFamily: "nunito, sans-serif", marginBottom: "16px" }}
      >
        {user.email}
      </Typography>
      <Typography
        variant="h5"
        gutterBottom
        style={{ marginTop: "16px" }}
        sx={{
          fontFamily: "nunito, sans-serif",
          marginBottom: "16px",
          fontWeight: 700,
        }}
      >
        Selected Pickup Location:
      </Typography>
      <Typography
        sx={{ fontFamily: "nunito, sans-serif", marginBottom: "16px" }}
      >
        {selectedLocationLocalStorage}
      </Typography>
      <div style={{ display: "flex", marginTop: "32px", gap: "16px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBack}
          sx={{
            fontFamily: "open sans, sans-serif",
            backgroundColor: "#076365",
            color: "#FAFFF4",
            borderRadius: "5px",
            "&:hover": { backgroundColor: "#076365" },
            marginTop: { xs: 2, sm: 1 },
          }}
        >
          previous page
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayPalPayment}
        >
          Proceed to PayPal Payment
        </Button>
      </div>
    </Container>
  );
}
