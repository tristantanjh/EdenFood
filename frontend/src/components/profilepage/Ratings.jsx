import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function Ratings({ value, isMobile }) {
  const sizeProp = isMobile ? "small" : "medium";

  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating-read"
        value={value}
        precision={0.5}
        readOnly
        size={sizeProp}
      />
    </Stack>
  );
}
