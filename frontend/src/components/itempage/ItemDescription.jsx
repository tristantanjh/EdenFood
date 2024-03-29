import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";

export default function ItemDescription() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { _id } = useParams();
  const { user } = useAuth();
  const [isMerchant, setIsMerchant] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [merchant, setMerchant] = useState({});
  const [reviewsLength, setReviewsLength] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getListingByGroceryId", {
        params: { groceryId: _id },
      })
      .then((res) => {
        if (res.data.user._id === user.id) {
          // console.log("is merchant");
          setIsMerchant(true);
        } else {
          // console.log("not merchant");
        }
        setReviewsLength(res.data.reviews.length);
        setSelectedItem(res.data);
        axios
          .get("http://localhost:3000/getUserWithId", {
            params: { userId: res.data.user._id },
          })
          .then((res) => {
            // console.log(res.data.user);
            setMerchant(res.data.user);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <CssBaseline />
      <Grid
        container
        component="main"
        sx={{
          backgroundColor: "#FAFFF4",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: "relative",
            backgroundColor: "#FAFFF4",
            ...(isSmallScreen && { padding: "3%" }),
          }}
        >
          <ItemShop 
            selectedItem={selectedItem}
            merchant={merchant}
            reviewLength={reviewsLength}
          />
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
                src={selectedItem.imageURL}
                alt="Eden Food Background Image."
              />
            </AspectRatio>
          )}
          <Container
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "row" },
              alignItems: "center",
              justifyContent: { xs: "right", md: "center" },
              mt: "1.5rem",
              mb: { xs: 0, md: "1.5rem" },
            }}
          ></Container>
        </Grid>
        <Grid xs={12} sm={12} md={5}>
          <Container
            sx={{
              "&.MuiContainer-root": {
                p: 0,
              },
            }}
          >
            <ItemDescriptionTab {...selectedItem} />
            <ProductAvailability {...selectedItem} />

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
                  S${selectedItem.price}
                </Typography>
                <div>
                  {isMerchant ? (
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
                        width: "100px",
                        padding: "5px 5px",
                        // boxShadow: "0px",
                        "&:hover": {
                          backgroundColor: alpha("#64CF94", 0.8),
                        },
                        "&:focus": { outline: "none" },
                      }}
                    >
                      Delete
                    </CustomButton>
                  ) : (
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
                  )}
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
