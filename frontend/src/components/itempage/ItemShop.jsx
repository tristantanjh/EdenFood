import React, { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Grid,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SetMealIcon from "@mui/icons-material/SetMeal";

const ItemShop = () => {
  const [value, setValue] = useState(5);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(414));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item sx={{ mt: 15 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontFamily: "nunito, sans-serif",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Milk Fish (100g)
          </Typography>
          <Typography
            sx={{ fontStyle: "italic", fontSize: "1.2rem" }}
            gutterBottom
          >
            from King Koi
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: "italic" }} gutterBottom>
            Freshness: 3 Days Left
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Rating name="read-only" value={value} readOnly />
            <Typography variant="body2" component="span" sx={{ ml: 1 }}>
              {value.toFixed(1)} | 400 Reviews
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              mt: isSmallScreen ? 0 : 12.5,
              mb: 2,
              bgcolor: "grey.300",
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: 1,
              borderColor: "grey.500",
            }}
          >
            <SetMealIcon sx={{ width: "50px", height: "50px" }} />
          </Box>
          <Link href="www.google.com"> View Location </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemShop;
