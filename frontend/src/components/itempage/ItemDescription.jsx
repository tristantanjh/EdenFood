import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ItemDescriptionTab from "../itempage/ItemDescriptionTab.jsx";
import ProductAvailability from "../itempage/ProductAvailability.jsx";
import ItemShop from "./ItemShop.jsx";
import { useTheme, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CustomButton from "../common/CustomButton";
import { alpha } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Grid from "@mui/material/Grid";
import AspectRatio from "@mui/joy/AspectRatio";
import Paper from "@mui/material/Paper";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget.jsx";

export default function ItemDescription() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <CssBaseline />
      <Grid container component="main">
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            position: "relative",
            backgroundColor: "#076365",
            ...(isSmallScreen && { padding: "3%" }),
          }}
        >
          <ItemShop />
          {!isSmallScreen && (
            <AspectRatio
              sx={{
                position: "relative",
                top: "30%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 375,
              }}
              ratio="3/4"
            >
              <Box
                id="image"
                component="img"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "60%",
                  width: "60%",
                }}
                src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg"
                alt="Eden Food Background Image."
              />
            </AspectRatio>
          )}
        </Grid>
        <Grid xs={12} sm={12} md={5}>
          <Container
            sx={{
              "&.MuiContainer-root": {
                p: 0,
              },
            }}
          >
            <ItemDescriptionTab />
            <ProductAvailability />

            {/* Bottom buttons */}
            <Box
              id="hero"
              sx={(theme) => ({
                width: "100%",
                bgcolor: "#FAFFF4",
                height: { xs: "100%", md: "100%" },
              })}
            >
              <Container
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: "row" },
                  alignItems: "right",
                  justifyContent: { xs: "space-between", md: "space-between" },
                  pb: { xs: 6, sm: 12 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.7rem",
                    textTransform: "none",
                    textAlign: "left",
                    fontFamily: "nunito, sans-serif",
                    fontWeight: "bold",
                    "&.MuiTypography-root": {
                      ml: { xs: 0, md: 1 },
                      mr: 0,
                    },
                  }}
                >
                  S$15.00
                </Typography>
                <div>
                  <CustomButton
                    sx={{
                      borderRadius: "15px",
                      borderBlockColor: "transparent",
                      backgroundColor: "#64CF94", // Custom background color
                      color: "#FFF", // Custom text color,
                      textTransform: "none",
                      fontFamily: "nunito, sans-serif",
                      fontWeight: "900",
                      fontSize: "1rem",
                      width: "140px",
                      padding: "5px 5px",
                      // boxShadow: "0px",
                      "&:hover": {
                        backgroundColor: alpha("#64CF94", 0.8),
                      },
                      "&:focus": { outline: "none" },
                    }}
                  >
                    Add To Cart
                  </CustomButton>
                  <Button
                    sx={{
                      color: "#000000",
                      "&.MuiButton-root": {
                        p: "0px",
                        minWidth: "35px",
                      },
                    }}
                  >
                    <FavoriteBorderIcon />
                  </Button>
                </div>
              </Container>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
