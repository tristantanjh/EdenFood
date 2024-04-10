import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import Box from "@mui/material/Box";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuantitySelector = ({
  children,
  minValue,
  maxValue,
  currentValue,
  setTotalPrice,
  itemPrice,
  groceryId,
  ...props
}) => {
  const [count, setCount] = useState(currentValue);
  const [cart, setCart] = React.useState(null);
  const { user } = useAuth();
  useEffect(() => {
    axios
      .get("http://localhost:3000/getCart", {
        params: { userId: user.id },
      })
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          cartId: cart._id,
          groceryId: groceryId,
        }
      );
      if (response.status == "401") {
        toast.error("There are no more groceries available.");
      }
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
          cartId: cart._id,
          groceryId: groceryId,
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
          marginRight: { xs: "-20px", sm: "-10px" },
          pl: { xs: 0.28, sm: 0.6 },
          pr: { xs: 0.28, sm: 0.6 },
          pt: { xs: 0.2, sm: 0.5 },
          pb: { xs: 0.2, sm: 0.5 },
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
          marginLeft: { xs: "-20px", sm: "-10px" },
          pl: { xs: 0.28, sm: 0.6 },
          pr: { xs: 0.28, sm: 0.6 },
          pt: { xs: 0.2, sm: 0.5 },
          pb: { xs: 0.2, sm: 0.5 },
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
