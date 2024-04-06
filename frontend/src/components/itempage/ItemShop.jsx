import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Rating,
  Grid,
  Link,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import SetMealIcon from "@mui/icons-material/SetMeal";
import CustomButton from "../common/CustomButton";
import { alpha } from "@mui/material";
import averageRating from "../../utils/averageRating";
import { useNavigate } from "react-router-dom";

const ItemShop = (props) => {
  const [value, setValue] = useState(5);
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(414));
  const [rating, setRating] = useState(1);
  const handleViewMerchant = (merchant) => {
    console.log(merchant);
    navigate("/merchant/" + merchant.id);
  };

  useEffect(() => {
    const fetchRating = async () => {
      // console.log(props.itemId);
      const avgRating = await averageRating(props.selectedItem._id);
      // console.log(avgRating);
      setRating(avgRating);
    };

    fetchRating();
  }, [rating]);

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
            {props.selectedItem.name} (100g)
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{ fontStyle: "italic", fontSize: "1.2rem" }}
              gutterBottom
            >
              from&nbsp;
            </Typography>
            <a
              href="#"
              onClick={() => handleViewMerchant(props.merchant)}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{ fontStyle: "italic", fontSize: "1.2rem" }}
                gutterBottom
              >
                {props.merchant.username}
              </Typography>
            </a>
            {props.merchant.verified ? (
              <Tooltip title="Verified SFA user">
                <img
                  src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1712153709/correct_zlwjua.png"
                  style={{
                    marginTop: isSmallScreen ? 4 : 3,
                    marginLeft: 8,
                    height: isSmallScreen ? 20 : 25,
                    width: isSmallScreen ? 20 : 25,
                  }}
                />
              </Tooltip>
            ) : null}
          </Box>
          <Typography variant="body2" sx={{ fontStyle: "italic" }} gutterBottom>
            Expires: {props.freshness.substring(0, 10).replace(/-/g, "/")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Rating name="read-only" value={rating} readOnly />
            <Typography variant="body2" component="span" sx={{ ml: 1 }}>
              {rating.toFixed(1)} | {props.reviewLength} Reviews
            </Typography>
          </Box>
        </Grid>
        {isSmallScreen ? (
          ""
        ) : (
          <Grid item>
            <Box
              sx={{
                mt: isSmallScreen ? 0 : 14,
                // mb: 1,
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
            {/* <Link href="www.google.com"> View Location </Link> */}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ItemShop;
