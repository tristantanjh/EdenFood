import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Stack,
  useTheme,
  useMediaQuery,
  Avatar,
  Modal,
  TextField,
  Rating,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";
import averageRating from "../../utils/averageRating";
import StarIcon from "@mui/icons-material/Star";

const ProfileHeader = (props) => {
  const [user, setUser] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigateTo = "/editProfile";
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [rating, setRating] = useState(1);

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    licenseNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  useEffect(() => {
    console.log(props);
    axios
      .get("http://localhost:3000/getUserWithId", {
        params: { userId: props.user },
      })
      .then((res) => {
        setUser(res.data.user);
        const reviews = res.data.user.reviews;
        console.log(reviews);
        let totalRating = 0;
        const promiseArray = reviews.map((review) => {
          return axios.get("http://localhost:3000/getReviewWithId", {
            params: { reviewId: review },
          });
        });
        Promise.all(promiseArray)
          .then((responses) => {
            responses.forEach((response) => {
              totalRating += response.data.review.rating;
            });
            setRating(totalRating / reviews.length);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Grid
        container
        spacing={isSmallScreen ? 1 : 4}
        alignItems="center"
        justifyContent="center"
      >
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Stack sx={{ display: "flex", justifyContent: "center" }}>
          <Stack direction="row">
            <Grid item sx={{ mt: 15 }}>
              <Avatar
                alt="User profile picture"
                src={user.profilePic}
                sx={{
                  width: isSmallScreen ? "3.5rem" : "5rem",
                  height: isSmallScreen ? "3.5rem" : "5rem",
                }}
              />
            </Grid>

            <Grid item sx={{ mt: 15, ml: "1rem" }}>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{
                    fontSize: isSmallScreen ? "1.5rem" : "1.8rem",
                    fontFamily: "nunito, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  {user.username}
                </Typography>
                {user.verified ? (
                  <Tooltip title="Verified SFA user">
                    <img
                      src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1712153709/correct_zlwjua.png"
                      style={{
                        marginTop: isSmallScreen ? 10 : 8,
                        marginLeft: 8,
                        height: isSmallScreen ? 20 : 30,
                        width: isSmallScreen ? 20 : 30,
                      }}
                    />
                  </Tooltip>
                ) : null}
              </Box>
              <Typography
                sx={{
                  fontStyle: "italic",
                  fontSize: isSmallScreen ? "0.75rem" : "1rem",
                }}
                gutterBottom
              >
                {user.email}
              </Typography>
            </Grid>
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Rating size="small" name="read-only" value={rating} readOnly />
            <Typography
              sx={{
                fontStyle: "italic",
                fontSize: isSmallScreen ? "0.75rem" : "1rem",
                ml: "3px",
              }}
            >
              • {user && user.reviews ? user.reviews.length : 0} reviews
            </Typography>
          </Box>
        </Stack>
      </Grid>
    </Box>
  );
};

export default ProfileHeader;
