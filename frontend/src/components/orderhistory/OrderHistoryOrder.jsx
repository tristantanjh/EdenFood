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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";

export default function OrderHistoryOrder(props) {
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { user } = useAuth();
  const [merchant, setMerchant] = React.useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/getUserWithId", {
        params: { userId: props.items[0].grocery.user },
      })
      .then((res) => {
        setMerchant(res.data.user);
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
      <ToastContainer position="top-right" limit={1} />
      {/* Merchant image & Order status */}
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
          {props.orderStatus}
        </Typography>
      </Container>

      {props.items.map((item, index) => (
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
          Total: <b>S${props.orderAmount}</b>
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
            width: { xs: "60px", md: "100px" },
            padding: "5px 5px",
            "&:hover": {
              backgroundColor: alpha("#64CF94", 0.8),
            },
            "&:focus": { outline: "none" },
            mr: { xs: ".5rem", md: "1rem" },
          }}
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
      </Container>
    </Container>
  );
}
