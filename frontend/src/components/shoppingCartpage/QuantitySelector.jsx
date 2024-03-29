import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import Box from "@mui/material/Box";
import axios from "axios";

const QuantitySelector = ({
  children,
  minValue,
  maxValue,
  currentValue,
  setTotalPrice,
  itemPrice,
  ...props
}) => {
  const [count, setCount] = useState(currentValue);

  const handleIncrementCounter = () => {
    if (count < maxValue) {
      const newCount = count + 1;
      setCount(newCount);
      handleIncrementGroceryQuantity();
      setTotalPrice((prevTotalPrice) =>
        parseFloat(prevTotalPrice + itemPrice).toFixed(1)
      );
    }
  };

  const handleIncrementGroceryQuantity = async (value) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/incrementGroceryQuantity",
        {
          cartId: "6602e852a2a91d16e7b55bad",
          groceryId: "6602cad65bc973dc6f8d9013",
        }
      );
      // add SnackBar for if response.ok
      console.log("Grocery successfully incremented");
    } catch (error) {
      console.error("Error incrementing grocery: ", error);
    }
  };

  const handleDecrementCounter = () => {
    if (count > minValue) {
      const newCount = count - 1;
      setCount(newCount);
      handleDecrementGroceryQuantity();
      setTotalPrice((prevTotalPrice) =>
        parseFloat(prevTotalPrice - itemPrice).toFixed(1)
      );
    }
  };

  const handleDecrementGroceryQuantity = async (value) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/decrementGroceryQuantity",
        {
          cartId: "6602e852a2a91d16e7b55bad",
          groceryId: "6602cad65bc973dc6f8d9013",
        }
      );
      // add SnackBar for if response.ok
      console.log("Grocery successfully decremented");
    } catch (error) {
      console.error("Error decrementing grocery: ", error);
    }
  };

  return (
    <ButtonGroup size="small" exclusive>
      <Button
        onClick={handleDecrementCounter}
        sx={{
          minWidth: { xs: "12px", sm: "23px" },
          minHeight: { xs: "12px", sm: "23px" },
          marginRight: { xs: "-20px", sm: "0px" },
          pl: { xs: 0.28, sm: 0.8 },
          pr: { xs: 0.28, sm: 0.8 },
          pt: { xs: 0.2, sm: 0.6 },
          pb: { xs: 0.2, sm: 0.6 },
          marginTop: { xs: "-8px", sm: "-5px" },
          color: "#FDF3A7",
          backgroundColor: "#076365",
          "&.Mui-selected, &.Mui-selected:hover": {
            color: "#FDF3A7",
            backgroundColor: "#076365",
          },
          ":hover": {
            color: "#FDF3A7",
            backgroundColor: "#076365",
          },
        }}
      >
        <RemoveOutlinedIcon
          sx={{
            width: { xs: "10px", sm: "16px" },
            height: { xs: "10px", sm: "16px" },
          }}
        />
      </Button>
      <Button
        disabled
        sx={{
          fontFamily: "nunito, sans-serif",
          fontWeight: "bold",
          fontSize: { xs: "12px", sm: "16px" },
          marginTop: { xs: "-6px", sm: "-4px" },
          "&.Mui-disabled": {
            color: "#000000",
          },
        }}
      >
        {count}
      </Button>
      <Button
        onClick={handleIncrementCounter}
        sx={{
          minWidth: { xs: "12px", sm: "23px" },
          minHeight: { xs: "12px", sm: "23px" },
          marginLeft: { xs: "-20px", sm: "0px" },
          pl: { xs: 0.28, sm: 0.8 },
          pr: { xs: 0.28, sm: 0.8 },
          pt: { xs: 0.2, sm: 0.6 },
          pb: { xs: 0.2, sm: 0.6 },
          marginTop: { xs: "-8px", sm: "-5px" },
          color: "#FDF3A7",
          backgroundColor: "#076365",
          "&.Mui-selected, &.Mui-selected:hover": {
            color: "#FDF3A7",
            backgroundColor: "#076365",
          },
          ":hover": {
            color: "#FDF3A7",
            backgroundColor: "#076365",
          },
        }}
      >
        <AddOutlinedIcon
          sx={{
            width: { xs: "10px", sm: "16px" },
            height: { xs: "10px", sm: "16px" },
          }}
        />
      </Button>
    </ButtonGroup>
  );
};

export default QuantitySelector;
