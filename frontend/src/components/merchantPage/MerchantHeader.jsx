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
  Alert,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";
import averageRating from "../../utils/averageRating";
import StarIcon from "@mui/icons-material/Star";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileHeader = (props) => {
  const [user, setUser] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigateTo = "/editProfile";
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = useState(1);

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

  function copy() {
    console.log(props);
    const el = document.createElement("input");
    el.value = "http://localhost:5173/merchant/" + props.user;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Successfully copied profile");
  }

  useEffect(() => {
    // console.log(props);
    axios
      .get("http://localhost:3000/getUserWithId", {
        params: { userId: props.user },
      })
      .then((res) => {
        setUser(res.data.user);
        averageRating(res.data.user._id).then((res) => {
          console.log(res);
          setRating(res);
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
          {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
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
          </Box> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Rating name="read-only" value={rating} readOnly />
            <Typography variant="body2" component="span" sx={{ ml: 1 }}>
              {rating.toFixed(1)} |{" "}
              {user && user.reviews ? user.reviews.length : 0} Reviews
            </Typography>
          </Box>
        </Stack>
        <Grid item sx={{ mt: isSmallScreen ? "25%" : "6%" }}>
          <IconButton
            sx={{
              bgcolor: "#64CF94",
              borderRadius: "50%",
              width: isSmallScreen ? 35 : 45,
              height: isSmallScreen ? 35 : 45,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={copy}
          >
            <img
              src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1711185761/share_cfenjn.png"
              alt="Share button"
              style={{
                width: isSmallScreen ? 12 : 15,
                height: isSmallScreen ? 12 : 15,
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileHeader;
