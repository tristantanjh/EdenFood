import React, { useState, useEffect } from "react";
import { Typography, Container, Button } from "@mui/material";
import { useCheckout } from "../../../hooks/CheckoutProvider";
import { useAuth } from "../../../hooks/AuthProvider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import Paypal from "./Paypal";
import swal from "sweetalert";
import { getCart } from "../../../utils/getCart";
import axios from "axios";
import { toast } from "react-toastify";

export default function Confirmation() {
  const { selectedLocationLocalStorage } = useCheckout();
  const { user, sessionId } = useAuth();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const navigate = useNavigate();

  const handlePayPalPayment = async () => {
    // Add logic for PayPal payment here

    checkoutOrder();

    swal("Success", "Payment Successful", "success");
  };

  const handleGoBack = () => {
    navigate("/checkout/" + sessionId + "/pickup"); // Navigate back to the previous page
  };

  const setCartFromBackend = async () => {
    getCart(user.id).then((res) => {
      console.log(res);
      setCart(res);
      setTotalPrice(res.totalPrice);
    });
    // setCart(await getCart(user.id));
  };

  useEffect(() => {
    setCartFromBackend();
  }, []);

  const checkoutOrder = () => {
    // Make sure cart is properly initialized before accessing cart.items
    if (!cart || !cart.items) {
      console.error("Cart or cart items not available.");
      return;
    }

    axios
      .post("http://localhost:3000/checkoutOrder", {
        userId: user.id,
        pickupLocation: selectedLocationLocalStorage,
        cartId: cart._id,
      })
      .then((res) => {
        console.log(res.data);
        toast("Order placed successfully", { type: "success" })
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container
      sx={{
        height: "350px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: { xs: 7, sm: 1 },
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
        <Paypal totalPrice={totalPrice} handlePayPalPayment={handlePayPalPayment} />
      </div>
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
          marginTop: { xs: 2, sm: 2 },
          marginBottom: { xs: 5, sm: 0 },
          width: "200px",
        }}
      >
        previous page
      </Button>
    </Container>
  );
}
