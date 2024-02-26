import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

const QuantitySelector = ({ children, ...props }) => {
  const [count, setCount] = useState(minValue);

  const handleIncrementCounter = () => {
    if (count < maxValue) {
      setCount((prevState) => prevState + 1);
    }
  };

  const handleDecrementCounter = () => {
    if (count > minValue) {
      setCount((prevState) => prevState - 1);
    }
  };
  return (
    <ButtonGroup size="small" exclusive>
      <Button
        onClick={handleDecrementCounter}
        sx={{
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
        <RemoveOutlinedIcon />
      </Button>
      <Button
        disabled
        sx={{
          fontFamily: "nunito, sans-serif",
          fontWeight: "bold",
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
        <AddOutlinedIcon />
      </Button>
    </ButtonGroup>
  );
};

export default QuantitySelector;
