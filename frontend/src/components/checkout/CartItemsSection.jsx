import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CartItem from "./CartItem";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";
import { getCart } from "../../utils/getCart";
import { useNavigate } from "react-router-dom";

export default function CartItemsSection() {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const renderCount = useRef(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/explore"); // Navigate to the home page
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/getCart", {
        params: { userId: user.id },
      })
      .then((res) => {
        console.log(res.data.items);
        setCart(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    renderCount.current += 1;
    if (renderCount.current > 2) { // THIS IS POTENTIALLY BUGGY
      setTotalPrice(cart.reduce((acc, item) => acc + item.grocery.price * item.quantity, 0));

      if (cart.length === 0) {
        handleOpenModal();
      }
    }
  }, [cart]);

  return (
    <div>
      <div style={{ maxHeight: "580px", overflowY: "auto" }}>
        {cart.map((item, index) => (
          <CartItem
            key={index}
            groceryId={item.grocery.id}
            price={item.grocery.price}
            imageURL={item.grocery.imageURL}
            title={item.grocery.name}
            freshness={item.grocery.freshness}
            quantity={item.quantity}
          />
        ))}
      </div>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "open sans, sans-serif",
          fontWeight: 600,
          marginTop: "2rem",
          paddingLeft: "48px",
          paddingRight: "48px",
          color: "#181B13",
          display: "flex",
          justifyContent: "space-between", // Align items horizontally
          alignItems: "center", // Align items vertically
          paddingBottom: { xs: "2rem", sm: "2rem" },
        }}
      >
        <span
          style={{
            fontSize: "24px",
          }}
        >
          Total:
        </span>{" "}
        <span
          style={{
            fontSize: "28px",
            float: "right",
            fontWeight: "700",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              marginRight: "20px",
              fontWeight: "350",
            }}
          >
            SGD
          </span>
          ${totalPrice}
        </span>
      </Typography>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        message="Support your favorite local farmers by adding some produce to your cart!"
      />
    </div>
  );
}

const Modal = ({ open, onClose, message }) => {
  return (
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
      <DialogTitle
        sx={{
          fontFamily: "open sans, sans-serif",
          fontWeight: 700,
          fontSize: "24px",
          color: "#181B13",
        }}
      >
        Your Cart is Empty
      </DialogTitle>
      <DialogContent
        sx={{
          fontFamily: "nunito, sans-serif",
          fontSize: "18px",
          color: "#181B13",
        }}
      >
        {message}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            fontFamily: "open sans, sans-serif",
            backgroundColor: "#076365",
            color: "#FAFFF4",
            borderRadius: "5px",
            "&:hover": { backgroundColor: "#076365" },
            width: "100%",
            marginLeft: "10px",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          Let's Go!
        </Button>
      </DialogActions>
    </Dialog>
  );
};
