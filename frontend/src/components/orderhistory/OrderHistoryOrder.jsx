import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import OrderHistoryItem from "./OrderHistoryItem.jsx";
import CustomButton from "../common/CustomButton";
import { alpha } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";
import LocationModal from "../common/LocationModal.jsx";
import { regions, pickupLocations } from "../common/PickupLocations";

export default function OrderHistoryOrder({
  amount,
  groceries,
  _id,
  pickupLocation,
  createdAt,
  status,
}) {
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { user } = useAuth();
  const [ratingValue, setRatingValue] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [merchant, setMerchant] = React.useState({});
  const [location, setLocation] = React.useState("");
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const notify = () => {
    toast("Review has been submitted.", { type: "success" });
  };

  const [reviewForm, setReviewForm] = useState({
    // to change to props.user
    sellerId: merchant._id,
    buyerId: user.id,
    rating: ratingValue,
    description: description,
    // createdAt: new Date(),
    // updatedAt: new Date(),
  });

  const handleSubmitRating = async (event) => {
    console.log(merchant);
    event.preventDefault();
    const { sellerId, ...restOfData } = reviewForm;

    const transformedData = {
      sellerId: merchant._id,
      ...restOfData,
    };
    console.log(transformedData);
    // try {
    const response = await axios.post(
      "http://localhost:3000/leaveReview",
      transformedData
    );
    // } catch (error) {
    //   console.error("Error leaving review:", error?.response?.data?.message);
    // }
    notify();
    setReviewModalOpen(false);
  };

  useEffect(() => {
    setReviewForm((prevForm) => ({
      ...prevForm,
      rating: ratingValue,
      description: description,
    }));
  }, [description, ratingValue]);

  useEffect(() => {
    const locationName = pickupLocation.trim().toLowerCase();
    let region = null;

    for (const pickupRegion of pickupLocations) {
      for (const location of pickupRegion.locations) {
        const trimmedLocationName = location.name.trim().toLowerCase();
        if (trimmedLocationName.includes(locationName)) {
          region = pickupRegion;
          break;
        }
      }
      if (region) {
        break;
      }
    }

    const location = region.locations.find((location) =>
      location.name.trim().toLowerCase().includes(locationName)
    );

    setLocation(location);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getUserWithId", {
        params: { userId: groceries[0].grocery.user },
      })
      .then((res) => {
        setMerchant(res.data.user);
        // console.log(groceries);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!subject || !message) {
      return toast.error("Please fill subject and message");
    }

    try {
      const { data } = await axios.post("http://localhost:3000/email", {
        userEmail: user.email,
        subject,
        message,
        amount,
        groceries,
        _id,
        pickupLocation,
        createdAt,
        status,
      });
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }

    setOpen(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "column" },
        alignItems: "center",
        backgroundColor: "#fff",
        pl: "0",
        pr: "0",
      }}
    >
      {/* <ToastContainer position="top-right" limit={1} /> */}
      {/* Merchant image & Order status */}
      <Container sx={{ textAlign: "left" }}>
        <Typography
          sx={{
            fontSize: { xs: "12px", md: "20px" },
            fontWeight: "bold",
            justifyContent: "flex-start",
            color: "#076365",
            mt: 2,
          }}
        >
          {/* To Collect */}
          Order ID: {_id}
        </Typography>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "row" },
          alignItems: "center",
          mt: { xs: "1rem", md: "2rem" },
          mb: "1rem",
          pl: "0",
          pr: "0",
        }}
      >
        {/* Merchant image */}
        <Card sx={{ minWidth: 27, ml: { xs: "1rem", md: "0" } }}>
          <CardMedia
            sx={{
              height: { xs: 30, md: 50 },
              width: { xs: 30, md: 50 },
            }}
            image={merchant.profilePic}
            // image="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708501388/istockphoto-691338444-612x612-removebg-preview_ffo3vb.png"
            title="Listing Photo"
          />
        </Card>

        <Typography
          sx={{
            fontSize: { xs: "15px", md: "20px" },
            fontWeight: "bold",
            ml: { xs: ".5rem", md: "1rem" },
          }}
        >
          {/* King Koi */}
          {merchant.username}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "15px", md: "20px" },
            fontWeight: "bold",
            ml: "auto",
            mr: { xs: "1rem", md: "0" },
            color: "#076365",
          }}
        >
          {/* To Collect */}
          {status}
        </Typography>
      </Container>

      {groceries.map((item, index) => (
        <OrderHistoryItem
          key={index}
          imageURL={item.grocery.imageURL}
          title={item.grocery.name}
          quantity={item.quantity}
        />
      ))}

      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "row" },
          alignItems: "center",
        }}
      >
        <Typography
          fontFamily="nunito, sans-serif"
          sx={{
            fontSize: { xs: "18px", md: "26px" },
            ml: "auto",
            mt: "1.5rem",
          }}
        >
          Total: <b>S${amount}</b>
        </Typography>
      </Container>

      {/* FUA buttons */}
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "row" },
          alignItems: "center",
          justifyContent: "right",
          mt: "1rem",
          mb: "1.5rem",
        }}
      >
        <CustomButton
          sx={{
            borderRadius: "15px",
            borderBlockColor: "transparent",
            backgroundColor: "#64CF94", // Custom background color
            color: "#FFF", // Custom text color,
            textTransform: "none",
            fontFamily: "nunito, sans-serif",
            fontWeight: "800",
            fontSize: { xs: ".8rem", md: "1.2rem" },
            width: { xs: "140px", md: "200px" },
            padding: "5px 5px",
            "&:hover": {
              backgroundColor: alpha("#64CF94", 0.8),
            },
            "&:focus": { outline: "none" },
            mr: { xs: ".5rem", md: "1rem" },
          }}
          onClick={() => setLocationModalOpen(true)}
        >
          Location
        </CustomButton>
        <CustomButton
          sx={{
            borderRadius: "15px",
            borderBlockColor: "transparent",
            backgroundColor: "#64CF94", // Custom background color
            color: "#FFF", // Custom text color,
            textTransform: "none",
            fontFamily: "nunito, sans-serif",
            fontWeight: "800",
            fontSize: { xs: ".8rem", md: "1.2rem" },
            width: { xs: "60px", md: "100px" },
            padding: "5px 5px",
            "&:hover": {
              backgroundColor: alpha("#64CF94", 0.8),
            },
            "&:focus": { outline: "none" },
            mr: { xs: ".5rem", md: "1rem" },
          }}
          onClick={() => setReviewModalOpen(true)}
        >
          Rate
        </CustomButton>
        <CustomButton
          sx={{
            borderRadius: "15px",
            borderBlockColor: "transparent",
            backgroundColor: "#64CF94", // Custom background color
            color: "#FFF", // Custom text color,
            textTransform: "none",
            fontFamily: "nunito, sans-serif",
            fontWeight: "800",
            fontSize: { xs: ".8rem", md: "1.2rem" },
            width: { xs: "60px", md: "120px" },
            padding: "5px 5px",
            "&:hover": {
              backgroundColor: alpha("#64CF94", 0.8),
            },
            "&:focus": { outline: "none" },
          }}
          onClick={handleClickOpen}
        >
          Report
        </CustomButton>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{ borderRadius: 2, color: "#402e55e1" }}
        >
          <DialogTitle
            sx={{
              fontFamily: "nunito, sans-serif",
              textAlign: "center",
              fontSize: { xs: "1.2rem", md: "1.7rem" },
              fontWeight: "700",
            }}
          >
            Let Us Know: Report an Issue
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                fontFamily: "nunito, sans-serif",
                mb: "1rem",
                fontSize: { xs: ".9rem", md: "1rem" },
              }}
            >
              You can expect a response within 2-3 business days from our
              dedicated Edenfood administrators via email.
            </DialogContentText>
            <TextField
              required
              autoFocus
              margin="dense"
              id="subject"
              label="Subject Header"
              type="text"
              fullWidth
              variant="filled"
              rows={4}
              onChange={(e) => setSubject(e.target.value)}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="message"
              label="Your Message"
              type="text"
              fullWidth
              variant="filled"
              multiline
              rows={4}
              onChange={(e) => setMessage(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <CustomButton
              sx={{
                borderRadius: "15px",
                borderBlockColor: "transparent",
                backgroundColor: "#64CF94", // Custom background color
                color: "#FFF", // Custom text color,
                textTransform: "none",
                fontFamily: "nunito, sans-serif",
                fontWeight: "800",
                fontSize: { xs: ".8rem", md: "1rem" },
                width: { xs: "60px", md: "100px" },
                padding: "5px 3px",
                mb: { xs: ".4rem", md: ".8rem" },
                "&:hover": {
                  backgroundColor: alpha("#64CF94", 0.8),
                },
                "&:focus": { outline: "none" },
              }}
              onClick={handleClose}
            >
              Cancel
            </CustomButton>
            <CustomButton
              sx={{
                borderRadius: "15px",
                borderBlockColor: "transparent",
                backgroundColor: "#64CF94", // Custom background color
                color: "#FFF", // Custom text color,
                textTransform: "none",
                fontFamily: "nunito, sans-serif",
                fontWeight: "800",
                fontSize: { xs: ".8rem", md: "1rem" },
                width: { xs: "60px", md: "100px" },
                padding: "5px 3px",
                mr: "1rem",
                mb: { xs: ".4rem", md: ".8rem" },
                "&:hover": {
                  backgroundColor: alpha("#64CF94", 0.8),
                },
                "&:focus": { outline: "none" },
              }}
              onClick={handleSubmit}
            >
              Send
            </CustomButton>
          </DialogActions>
        </Dialog>

        <LocationModal
          isOpen={locationModalOpen}
          onClose={() => setLocationModalOpen(false)}
          locations={location}
        />

        <Dialog
          open={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
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
              Give {merchant.username} a rating and review:
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
      </Container>
    </Container>
  );
}
