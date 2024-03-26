import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import Box from "@mui/material/Box";

const QuantitySelector = ({
  children,
  minValue,
  maxValue,
  quantity,
  onQuantityChange,
  ...props
}) => {
  const [count, setCount] = useState(minValue);

  const handleIncrementCounter = () => {
    if (count < maxValue) {
      setCount((prevState) => prevState + 1);
    }
    if (quantity > minValue) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrementCounter = () => {
    if (count > minValue) {
      setCount((prevState) => prevState - 1);
    }
    if (quantity > minValue) {
      onQuantityChange(quantity - 1);
    }
  };
  return (
    <ButtonGroup size="small" exclusive>
      <Button
        onClick={handleDecrementCounter}
        sx={{
          minWidth: "23px",
          minHeight: "23px",
          marginRight: "0px",
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
            width: "16px",
            height: "16px",
          }}
        />
      </Button>
      <Button
        disabled
        sx={{
          fontFamily: "nunito, sans-serif",
          fontWeight: "bold",
          fontSize: "16px",
          marginTop: { xs: "-7px", sm: "-4px" },
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
          minWidth: "23px",
          minHeight: "23px",
          marginLeft: "0px",
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
            width: "16px",
            height: "16px",
          }}
        />
      </Button>
    </ButtonGroup>
  );
};

export default QuantitySelector;
