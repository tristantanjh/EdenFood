import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ItemDescriptionTab from "../itempage/ItemDescriptionTab.jsx";
import ProductAvailability from "../itempage/ProductAvailability.jsx";
import ItemShop from "./ItemShop.jsx";
import { useTheme, useMediaQuery, CardMedia } from "@mui/material";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import QuantitySelector from "../explorepage/QuantitySelector";
import { toast } from "react-toastify";
import averageRating from "../../utils/averageRating";

function SimpleDialog(props) {
  const { user } = useAuth();
  const { onClose, open, groceryId } = props;
  const [quantity, setQuantity] = React.useState(1);

  const handleClose = () => {
    onClose();
  };

  const handleAddToCart = async (value) => {
    console.log(props.groceryId);
    try {
      const response = await axios.post("http://localhost:3000/addToCart", {
        userId: user.id,
        groceryId: props.groceryId,
        quantity: quantity,
      });
      // add SnackBar for if response.ok
      // if (!response.ok) {
      //   throw new Error("Failed to add item to cart");
      // }
      console.log("Item added to cart successfully");
      toast.success(
        quantity + " " + props.groceryName + " added to cart successfully"
      );
      handleClose();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          fontFamily: "nunito, sans-serif",
          fontSize: { xs: "1.3rem", sm: "1.5rem" },
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        Select Item Quantity
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        <Stack spacing={2}>
          <QuantitySelector
            minValue={1}
            maxValue={10}
            quantity={quantity}
            onQuantityChange={setQuantity}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <CustomButton
              onClick={handleAddToCart}
              sx={{
                borderRadius: "999px",
                borderBlockColor: "transparent",
                backgroundColor: "#64CF94", // Custom background color
                color: "#FFF", // Custom text color
                fontFamily: "nunito, sans-serif",
                fontWeight: "700",
                fontSize: { xs: "0.7rem", sm: "0.8rem" },
                width: { xs: "110px", sm: "150px" },
                padding: { xs: "4px 7px", sm: "5px 8px" },
                boxShadow: "0px",
                mr: "10px",
                mb: "5px",
                "&:hover": {
                  backgroundColor: alpha("#64CF94", 0.8),
                },
                "&:focus": { outline: "none" },
              }}
            >
              Add to Cart
            </CustomButton>
          </Box>
        </Stack>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function ItemDescription() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { _id } = useParams();
  const { user } = useAuth();
  const [isMerchant, setIsMerchant] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [merchant, setMerchant] = useState({});
  const [reviewsLength, setReviewsLength] = useState(0);
  const [imageURL, setImageURL] = useState([]);
  const [freshness, setFreshness] = useState("");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };

  function getFreshness(freshness, createdDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const created = new Date(createdDate);
    const diffTime = Math.abs(today - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return parseInt(freshness) - diffDays;
  }

  const fetchData = async () => {
    console.log("fetching data " + _id);
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
        console.log(res.data);
        setImageURL(res.data.imageURL);
        setReviewsLength(res.data.user.reviews.length);
        setFreshness(getFreshness(res.data.freshness, res.data.createdAt));
        setSelectedItem(res.data);
        console.log(res.data.user._id);
        axios
          .get("http://localhost:3000/getUserWithId", {
            params: { userId: res.data.user._id },
          })
          .then((res) => {
            // console.log(res.data.user.reviews.length);
            setMerchant(res.data.user);
            averageRating(res.data.user._id).then((res) => {
              console.log(res);
              setRating(res);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteItem = () => {
    console.log(selectedItem._id);
    axios
      .post("http://localhost:3000/disableGrocery", {
        params: { groceryId: selectedItem._id },
      })
      .then((res) => {
        toast.success("Successfully disabled " + selectedItem.name);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   const fetchRating = async () => {
  //     console.log(merchant);
  //     const avgRating = await averageRating(props.merchant._id);
  //     console.log(avgRating);
  //     setRating(avgRating);
  //   };

  //   fetchRating();
  // }, [rating]);

  useEffect(() => {
    fetchData();
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
            rating={rating}
            reviewLength={reviewsLength}
            freshness={freshness}
          />
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation
            pagination={{ clickable: true }}
          >
            {imageURL.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <AspectRatio
                    sx={{
                      position: "relative",
                      top: { xs: "10rem", md: "16rem" },
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: { xs: 200, md: 375 },
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
                      src={image}
                      alt="Eden Food Background Image."
                    />
                  </AspectRatio>
                </SwiperSlide>
              );
            })}
          </Swiper>
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
                mt: { xs: "0", md: "3rem" },
              },
            }}
          >
            <ItemDescriptionTab {...selectedItem} />
            {/* <ProductAvailability {...selectedItem} /> */}

            {/* Bottom buttons */}
            <Box
              id="hero"
              sx={(theme) => ({
                width: "100%",
                bgcolor: "#FAFFF4",
                height: { xs: "100%", md: "100%" },
                mt: "5rem",
              })}
            >
              <Container
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: "row" },
                  alignItems: "center",
                  justifyContent: { xs: "space-between", md: "space-between" },
                  pb: { xs: 6, sm: 12 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    justifyContent: "center",
                    // pb: { xs: 6, sm: 12 },
                    ml: "2rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.5rem",
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
                  <Typography
                    sx={{
                      fontSize: "1rem",
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
                    Quantity Available:{" "}
                    <span style={{ color: "red" }}>
                      <u>{selectedItem.quantity}</u>
                    </span>
                  </Typography>
                </Box>

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
                      onClick={handleDeleteItem}
                      disabled={selectedItem.quantity === 0}
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
                      onClick={handleClickOpen}
                      disabled={selectedItem.quantity === 0}
                    >
                      Add To Cart
                    </CustomButton>
                  )}
                  <SimpleDialog
                    open={open}
                    onClose={handleClose}
                    groceryId={selectedItem._id}
                    groceryName={selectedItem.name}
                  />
                  {/* {isMerchant ? (
                    ""
                  ) : (
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
                  )} */}
                </div>
              </Container>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
