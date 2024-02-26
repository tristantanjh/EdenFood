import * as React from "react";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material";

const CustomButton = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      sx={{
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
