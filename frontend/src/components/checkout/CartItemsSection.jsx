import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CartItem from "./CartItem";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";
import { getCart } from "../../utils/getCart";

const currentDate = new Date();
const oneDayAhead = new Date(currentDate.setDate(currentDate.getDate() + 1));
const twoDaysAhead = new Date(currentDate.setDate(currentDate.getDate() + 1));
const oneDayBehind = new Date(currentDate.setDate(currentDate.getDate() - 2));

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
    freshness: oneDayAhead,
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
    freshness: twoDaysAhead,
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
    freshness: oneDayBehind,
    reviews: ["611f72f4b214f2d2e8e25a1d"],
  },
  {
    _id: "610f72f4b214f2d2e8e25a2d",
    name: "Hello",
    description: "jonny jonny yes papa",
    imageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1711599634/bamelxgp6uft73qbf6kq.jpg",
    price: 2.49,
    user: "610f72f4b214f2d2e8e25a1f", // User ID
    categories: ["Fruits"],
    freshness: oneDayBehind,
    reviews: ["611f72f4b214f2d2e8e25a1d"],
  },
];

const exampleCartData = {
  user: "610f72f4b214f2d2e8e25a1f", // User ID
  totalPrice: 12.44,
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
    {
      grocery: "610f72f4b214f2d2e8e25a2d", // Hello
      quantity: 3,
    },
  ],
};

export default function CartItemsSection() {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  const cartItems = exampleCartData.items.map((cartItem) => {
    const grocery = exampleGroceries.find(
      (item) => item._id === cartItem.grocery
    );
    return {
      ...cartItem,
      id: grocery?._id,
      name: grocery?.name,
      imageURL: grocery?.imageURL,
      price: grocery?.price,
      freshness: grocery?.freshness,
    };
  });

  useEffect(() => {
    const cart = async () => {
      setCart(await getCart(user.id));
    };

    cart();
  }, []);

  // const totalPrice = cartItems.reduce(
  //   (acc, item) => acc + item.quantity * item.price,
  //   0
  // );

  return (
    <div>
      <div
        style={{ maxHeight: "580px", overflowY: "auto" }}
      >
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
          paddingBottom: {xs: "2rem", sm: "2rem"}, 
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
          ${exampleCartData.totalPrice.toFixed(2)}
        </span>
      </Typography>
    </div>
  );
}
