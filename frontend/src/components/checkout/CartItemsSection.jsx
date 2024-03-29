import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import CartItem from "./CartItem";

const exampleGroceries = [
  {
    _id: "610f72f4b214f2d2e8e25a2a",
    name: "Apple",
    description: "Fresh and juicy apple",
    imageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1710778183/broccoli_xxtddq.jpg",
    price: 1.99,
    user: "610f72f4b214f2d2e8e25a1f", // User ID
    categories: ["Fruits"],
    reviews: ["611f72f4b214f2d2e8e25a1a", "611f72f4b214f2d2e8e25a1b"],
  },
  {
    _id: "610f72f4b214f2d2e8e25a2b",
    name: "Banana",
    description: "Yellow and tasty banana",
    imageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708348046/samples/man-portrait.jpg",
    price: 0.99,
    user: "610f72f4b214f2d2e8e25a1f", // User ID
    categories: ["Fruits"],
    reviews: ["611f72f4b214f2d2e8e25a1c"],
  },
  {
    _id: "610f72f4b214f2d2e8e25a2c",
    name: "Mango",
    description: "Sweet and delicious mango",
    imageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708348042/samples/smile.jpg",
    price: 2.49,
    user: "610f72f4b214f2d2e8e25a1f", // User ID
    categories: ["Fruits"],
    reviews: ["611f72f4b214f2d2e8e25a1d"],
  },
];

const exampleCartData = {
  user: "610f72f4b214f2d2e8e25a1f", // User ID
  items: [
    {
      grocery: "610f72f4b214f2d2e8e25a2a", // Apple
      quantity: 2,
    },
    {
      grocery: "610f72f4b214f2d2e8e25a2b", // Banana
      quantity: 1,
    },
    {
      grocery: "610f72f4b214f2d2e8e25a2c", // Mango
      quantity: 3,
    },
  ],
};

export default function CartItemsSection() {
  const cartItems = exampleCartData.items.map((cartItem) => {
    const grocery = exampleGroceries.find(
      (item) => item._id === cartItem.grocery
    );
    return {
      ...cartItem,
      id: grocery?.id,
      name: grocery?.name,
      imageURL: grocery?.imageURL,
      price: grocery?.price,
      freshness: grocery?.freshness,
    };
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div style={{ padding: "0 0 2rem 0", maxHeight: "600px" }}>
      {cartItems.map((item, index) => (
        <CartItem
          key={index}
          groceryId={item.id}
          price={item.price}
          imageURL={item.imageURL}
          title={item.name}
          freshness={item.freshness}
          quantity={item.quantity}
        />
      ))}
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
          ${totalPrice.toFixed(2)}
        </span>
      </Typography>
    </div>
  );
}
