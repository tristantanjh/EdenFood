import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import Box from "@mui/material/Box";

const QuantitySelector = ({ children, minValue, maxValue, ...props }) => {
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
          minWidth: { xs: "10px", sm: "23px" },
          minHeight: { xs: "10px", sm: "23px" },
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
            width: { xs: "8px", sm: "16px" },
            height: { xs: "8px", sm: "16px" },
          }}
        />
      </Button>
      <Button
        disabled
        sx={{
          fontFamily: "nunito, sans-serif",
          fontWeight: "bold",
          fontSize: { xs: "9px", sm: "16px" },
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
          minWidth: { xs: "10px", sm: "23px" },
          minHeight: { xs: "10px", sm: "23px" },
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
            width: { xs: "8px", sm: "16px" },
            height: { xs: "8px", sm: "16px" },
          }}
        />
      </Button>
    </ButtonGroup>
  );
};

export default QuantitySelector;
