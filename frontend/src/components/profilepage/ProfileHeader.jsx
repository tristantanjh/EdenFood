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
  Alert,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import farmLicenses from "../../utils/farmLicense";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hooks/AuthProvider";

const ProfileHeader = (props) => {
  const [user, setUser] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigateTo = "/editProfile";
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const farm = farmLicenses.find((farm) => farm.name === formData.name);
    const isValidFarm = farm && farm.licenses.includes(formData.licenseNumber);
    if (isValidFarm) {
      try {
        const response = axios.put("http://localhost:3000/verifyUser", {
          userId: props.user.id,
        });

        toast.success("Successfully verified profile");
        setUser((prevUser) => ({ ...prevUser, verified: true }));
        handleClose();
      } catch (error) {
        console.error("Error verifying user:", error);
        toast.error("Error verifying user. Please try again");
      }
    } else {
      toast.error("Invalid farm name or license number");
    }
  };

  function copy() {
    const el = document.createElement("input");
    el.value = "http://localhost:5173/merchant/" + props.user.id;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Successfully copied profile");
  }

  useEffect(() => {
    console.log(props.user.id);
    axios
      .get("http://localhost:3000/getUserWithId", {
        params: { userId: props.user.id },
      })
      .then((res) => {
        setUser(res.data.user);
        console.log(user.profilePic);
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

        <Grid item sx={{ mt: 15 }}>
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
          <Stack direction="row" spacing={1}>
            {user.verified ? null : (
              <Button
                onClick={handleOpen}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: isSmallScreen ? 8 : 10,
                  borderColor: "#64CF94",
                  color: "#000000",
                  borderRadius: 15,
                  "&:hover": {
                    borderColor: "#64CF94",
                    backgroundColor: "#64CF94",
                    color: "#FFFFFF",
                  },
                  width: isSmallScreen ? 100 : 120,
                }}
              >
                Get Verified
              </Button>
            )}
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Stack>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Enter your registered name and SFA license number
                  </Typography>
                  <TextField
                    margin="normal"
                    color="success"
                    variant="standard"
                    fullWidth
                    id="name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    label="Registered Name"
                    onChange={handleChange}
                    InputProps={{
                      sx: {
                        "& input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset",
                          WebkitTextFillColor: "#181B13",
                        },
                        fontFamily: "nunito, sans-serif",
                      },
                    }}
                    sx={{
                      "& label": {
                        fontFamily: "nunito, sans-serif",
                      },
                    }}
                  />
                  <TextField
                    margin="normal"
                    color="success"
                    variant="standard"
                    fullWidth
                    id="licenseNumber"
                    name="licenseNumber"
                    autoComplete="licenseNumber"
                    autoFocus
                    label="License Number"
                    onChange={handleChange}
                    InputProps={{
                      sx: {
                        "& input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset",
                          WebkitTextFillColor: "#181B13",
                        },
                        fontFamily: "nunito, sans-serif",
                      },
                    }}
                    sx={{
                      "& label": {
                        fontFamily: "nunito, sans-serif",
                      },
                      mb: 2,
                    }}
                  />
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    disabled={!formData.name || !formData.licenseNumber}
                    sx={{
                      mt: isSmallScreen ? 3 : 3,
                      // mr: isSmallScreen ? 5 : 0,
                      mb: 2,
                      py: isSmallScreen ? 1.5 : 1,
                      fontFamily: "open sans, sans-serif",
                      backgroundColor: "#076365",
                      color: "#FAFFF4",
                      borderRadius: "30px",
                      "&:hover": { backgroundColor: "#076365" },
                      position: isSmallScreen ? "relative" : "none", // Position fixed on mobile
                      // transform: isSmallScreen ? "translateX(-50%)" : "0",
                      width: isSmallScreen ? "calc(100% - 40px)" : "100%", // Adjust width on mobile
                      maxWidth: isSmallScreen ? "400px" : "auto", // Max width of the button
                      marginLeft: "auto", // Center horizontally
                      marginRight: "auto", // Center horizontally
                    }}
                  >
                    Verify
                  </Button>
                </Stack>
              </Box>
            </Modal>
          </Stack>
        </Grid>
        <Grid item sx={{ mt: 15.5 }}>
          <Link to={navigateTo} style={{ textDecoration: "none" }}>
            <IconButton
              sx={{
                bgcolor: "#64CF94",
                borderRadius: "50%",
                width: isSmallScreen ? 35 : 45,
                height: isSmallScreen ? 35 : 45,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "&:focus": { outline: "none" },
              }}
            >
              <img
                src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1711185761/edit_vfsklg.png"
                alt="Edit button"
                style={{
                  width: isSmallScreen ? 12 : 15,
                  height: isSmallScreen ? 12 : 15,
                }}
              />
            </IconButton>
          </Link>
          <IconButton
            sx={{
              mt: 0.5,
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
