import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SetMealIcon from "@mui/icons-material/SetMeal";
import ItemQuantity from "./ItemQuantity";
import { regions, pickupLocations } from "../common/PickupLocations";
import LocationModal from "../common/LocationModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hooks/AuthProvider";

function OrderCard(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [ratingValue, setRatingValue] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const { user } = useAuth();
  const notify = () => {
    toast.success("Review has been submitted.", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const [reviewForm, setReviewForm] = useState({
    // to change to props.user
    sellerId: "65f84c2644883f28d0d172e2",
    buyerId: user.id,
    rating: ratingValue,
    description: description,
    // createdAt: new Date(),
    // updatedAt: new Date(),
  });
  useEffect(() => {
    setReviewForm((prevForm) => ({
      ...prevForm,
      rating: ratingValue,
      description: description,
    }));
  }, [description, ratingValue]);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleSubmitRating = async (event) => {
    event.preventDefault();
    const { userId, ...restOfData } = reviewForm;

    const transformedData = {
      userId: userId,
      ...restOfData,
    };
    console.log(transformedData);
    // try {
    const response = await axios.post(
      "http://localhost:3000/leaveReview",
      transformedData
    );
    console.log(response.data);
    // } catch (error) {
    //   console.error("Error leaving review:", error?.response?.data?.message);
    // }
    notify();
    setDialogOpen(false);
  };

  useEffect(() => {
    const region = pickupLocations
      .find((region) =>
        region.locations.filter((location) =>
          location.name.includes(props.pickupLocation)
        )
      )
      .locations.find((location) =>
        location.name.includes(props.pickupLocation)
      );

    console.log(region);
  }, []);

  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: isMobile ? 400 : 800,
        borderRadius: "8px",
        mb: 2,
      }}
    >
      <CardContent sx={{ padding: "0 !important", mb: 2 }}>
        <Grid container spacing={2}>
          <Grid
            item
            style={{
              width: "100%",
              backgroundColor: "#076365",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: isMobile ? 1 : 2,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "nunito, sans-serif ",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  pl: isMobile ? 1 : 2,
                }}
              >
                Order ID: {props.orderID}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "nunito, sans-serif",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  pr: isMobile ? 0 : 2,
                  pl: isMobile ? 10 : 0,
                }}
              >
                Order Date: {props.orderDate}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pl: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "grey.300",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: 1,
                    borderColor: "grey.500",
                    mr: 1,
                  }}
                >
                  <SetMealIcon />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "nunito, sans-serif",
                    color: "#000000",
                    fontWeight: "bold",
                  }}
                >
                  {props.orderSeller}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: "nunito, sans-serif",
                  color: "#076365",
                  fontWeight: "bold",
                  pr: 4,
                }}
              >
                {props.orderStatus}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            {props.orderItems.map((item, index) => (
              <ItemQuantity key={index} {...item} />
            ))}
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "right" }}>
            <Typography
              sx={{
                fontFamily: "nunito, sans-serif",
                fontWeight: "bold",
                fontSize: 22,
                pr: 4,
              }}
            >
              Total: ${props.orderTotal}
            </Typography>
          </Grid>
          <Grid item container spacing={2} justifyContent="center">
            <Grid item xs={4} display="flex" justifyContent="center">
              <Button
                onClick={handleDialogOpen}
                sx={{
                  backgroundColor: "#64CF94",
                  borderColor: "#64CF94",
                  color: "#FFFFFF",
                  borderRadius: 15,
                  fontSize: isMobile ? 10 : 15,
                  width: isMobile ? 60 : 120,
                }}
              >
                Rate Seller
              </Button>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center">
              <Button
                onClick={() => setModalOpen(true)}
                sx={{
                  backgroundColor: "#64CF94",
                  borderColor: "#64CF94",
                  color: "#FFFFFF",
                  borderRadius: 15,
                  fontSize: isMobile ? 10 : 15,
                  width: isMobile ? 60 : 120,
                }}
              >
                View Location
              </Button>
              <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <Typography
                    sx={{
                      fontFamily: "nunito, sans-serif",
                      color: "#000000",
                      fontWeight: "bold",
                      fontSize: "21px",
                      p: 0,
                    }}
                  >
                    Give {props.orderSeller} a rating and review:
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <TextField
                      id="outlined-multiline-static"
                      label="Write a Review"
                      multiline
                      fullWidth
                      rows={6}
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                      sx={{ mt: "8px", mb: "10px" }}
                    />
                    <Rating
                      size="medium"
                      value={ratingValue}
                      onChange={(event, newValue) => {
                        setRatingValue(newValue);
                      }}
                      sx={{ mb: "5px" }}
                    />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleSubmitRating}
                    sx={{
                      fontFamily: "open sans, sans-serif",
                      backgroundColor: "#076365",
                      color: "#FAFFF4",
                      borderRadius: "5px",
                      "&:hover": { backgroundColor: "#076365" },
                      width: "100%",
                      marginLeft: "10px",
                      marginRight: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
              <LocationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                locations={pickupLocations
                  .find((region) =>
                    region.locations.filter((location) =>
                      location.name.includes(props.pickupLocation)
                    )
                  )
                  .locations.find((location) =>
                    location.name.includes(props.pickupLocation)
                  )}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center">
              <Button
                sx={{
                  backgroundColor: "#64CF94",
                  borderColor: "#64CF94",
                  color: "#FFFFFF",
                  borderRadius: 15,
                  fontSize: isMobile ? 10 : 15,
                  width: isMobile ? 60 : 120,
                }}
              >
                Report
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default OrderCard;
