import React, { useEffect, useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Snackbar, SnackbarContent } from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import AspectRatio from "@mui/joy/AspectRatio";
import useMediaQuery from "@mui/material/useMediaQuery";
import swal from "sweetalert";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";

import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{
        fontFamily: "nunito, sans-serif",
        fontSize: "14px",
      }}
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/tristantanjh/EdenFood"
        sx={{
          fontFamily: "nunito, sans-serif",
          fontSize: "14px",
          "&:hover": {
            color: "#388e3c", // Change the hover color here
            textDecorationColor: "#388e3c", // Change the underline color here
          },
        }}
      >
        EdenFood
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const logoStyle = {
  width: "120px",
  height: "auto",
  cursor: "pointer",
};

export default function RegisterMain() {
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [imageURL, setImageURL] = useState("empty");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [cursorPosition, setCursorPosition] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(imageURL); //shows true - updated state
  }, [imageURL]);

  const handleOpenSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword((show) => !show);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3000/createUser", {
          username: data.get("username"),
          email: data.get("email"),
          password: data.get("password"),
          profilePic: imageURL, // Assuming imageURL is the URL of the uploaded profile picture
        });

        console.log(response.data); // Handle successful user creation response
        history.push("/");
      } catch (error) {
        console.error("Error creating user:", error.response.data.message);
        handleOpenSnackbar(
          "An error occurred while signing you up. Try again or contact our support team for assistance!"
        );
      }
    } else {
      handleOpenSnackbar("Invalid form! Please check the form for errors.");
      console.log("Invalid form");
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    // console.log(formData);
    setFormData({
      ...formData,
      [name]: name === "rememberMe" ? checked : value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Email format regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is empty or invalid format
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      newErrors.email = !formData.email
        ? "Email is required"
        : "Invalid email format";
      valid = false;
    }

    // Password strength check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters with at least one uppercase and one lowercase letter";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  function handleOnUpload(error, result, widget) {
    if (error) {
      console.log(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    swal("Success", "Media uploaded", "success");
    console.log(result.info.secure_url);
    const secureUrl = result?.info?.secure_url;

    if (secureUrl) {
      console.log("setURL");
      setImageURL(secureUrl);
      console.log(imageURL);
    }
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          sx={{ backgroundColor: "#CE0000" }} // Customize background color for error messages
          message={snackbarMessage}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <Close />
            </IconButton>
          }
        />
      </Snackbar>
      <Grid
        item
        xs={false}
        sm={false}
        md={5}
        sx={{
          position: "relative",
          backgroundColor: "#076365",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <a href="/" style={{ position: "absolute", top: 0, left: 0 }}>
          <Box
            display={{ xs: "none", md: "flex" }}
            id="image"
            component="img"
            sx={{
              mt: { xs: 5, md: 2 },
              ml: { xs: 5, sm: 2 },
              mr: "1vw",
              alignSelf: "flex-start",
              height: { xs: 80, sm: 100 },
              objectFit: "cover",
            }}
            src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708576163/Natural_Fresh_Food_Logo_1_n9mbxk.png"
            alt="Eden Food Primary Logo."
          />
        </a>
        <AspectRatio
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 375,
            display: { xs: "none", sm: "none", md: "flex" },
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
            src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708348042/samples/smile.jpg"
            alt="Eden Food Background Image."
          />
        </AspectRatio>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        component={Paper}
        elevation={6}
        square
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            mx: 4,
            mt: { xs: 4, md: 0 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: { xs: "flex-start", sm: "center" },
            height: "100vh",
            width: { xs: "100%", md: "30%" },
          }}
        >
          <Box sx={{ alignSelf: "flex-start" }}>
            <a href="/">
              <Box
                display={{ xs: "flex", md: "none" }}
                id="image"
                component="img"
                sx={{
                  mb: 2,
                  alignSelf: "flex-start",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  height: 60,
                  objectFit: "cover",
                }}
                src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708871988/1_hdhl7b_foynnr.png"
                alt="Eden Food Primary Logo."
              />
            </a>
          </Box>
          <Typography
            fontFamily={"open sans, sans-serif"}
            fontSize={24}
            fontWeight={"bold"}
            color={"#181B13"}
          >
            Sign Up for EdenFood
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              color="success"
              variant="standard"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
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
            <Typography
              variant="body2"
              color="inherit"
              align="left"
              sx={{
                fontFamily: "nunito, sans-serif",
                fontSize: "12px",
              }}
            >
              *Please use an email address that is linked to a valid PayPal
            </Typography>
            <TextField
              color="success"
              variant="standard"
              fullWidth
              id="username"
              label="Username"
              name="username"
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
                my: "4px",
              }}
            />
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel
                htmlFor="standard-adornment-password"
                color="success"
                sx={{
                  fontFamily: "nunito, sans-serif",
                }}
              >
                Password
              </InputLabel>
              <Input
                sx={{
                  fontFamily: "nunito, sans-serif",
                }}
                onChange={handleChange}
                error={Boolean(errors.password)}
                color="success"
                name="password"
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {Boolean(errors.password) && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 16,
              }}
            >
              {imageURL == "empty" ? (
                <CloudinaryUploadWidget onUpload={handleOnUpload}>
                  {({ open }) => {
                    function handleOnClick(e) {
                      e.preventDefault();
                      open();
                    }
                    return (
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handleOnClick}
                        sx={{
                          height: "150px",
                          fontFamily: "nunito, sans-serif",
                          backgroundColor: "#FFFFFF",
                          color: "#181B13",
                          border: "1px dashed #181B13",
                          borderRadius: "10px",
                          "&:hover": isMobile ? { backgroundColor: "#FFFFFF" } : { backgroundColor: "#DFDFDF" },
                          px: "16px",
                          py: "8px",
                          fontSize: "18px",
                          cursor: "pointer",
                          textTransform: "initial",
                        }}
                      >
                        Upload Your Profile Photo
                      </Button>
                    );
                  }}
                </CloudinaryUploadWidget>
              ) : (
                <Box
                  // display={{ xs: "flex", md: "none" }}
                  id="image"
                  component="img"
                  fullWidth
                  sx={{
                    height: "150px",
                    width: "100%",
                    border: "1px dashed #181B13",
                    borderRadius: "10px",
                    alignSelf: "flex-start",
                    "&:hover": { backgroundColor: "#FFFFFF" },
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    objectFit: "contain",
                  }}
                  src={imageURL}
                  alt="Uploaded Profile Picture"
                />
              )}
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={
                !formData.email ||
                !formData.password ||
                !formData.username ||
                imageURL == "empty"
              }
              sx={{
                mt: 2,
                mb: 2,
                py: isMobile ? 1.5 : 1,
                fontFamily: "open sans, sans-serif",
                backgroundColor: "#076365",
                color: "#FAFFF4",
                borderRadius: "30px",
                "&:hover": { backgroundColor: "#076365" },
                position: isMobile ? "fixed" : "none", // Position fixed on mobile
                bottom: isMobile ? "20px" : "auto", // Adjust bottom position on mobile
                left: isMobile ? "50%" : "0",
                transform: isMobile ? "translateX(-50%)" : "0",
                width: isMobile ? "calc(100% - 40px)" : "100%", // Adjust width on mobile
                maxWidth: isMobile ? "400px" : "100%", // Max width of the button
                marginLeft: "auto", // Center horizontally
                marginRight: "auto", // Center horizontally
              }}
            >
              Sign In
            </Button>
            <Grid container sx={{ mt: isMobile ? 2.5 : 0 }}>
              <Grid item>
                <Link
                  href="/login"
                  color="inherit"
                  sx={{
                    fontFamily: "nunito, sans-serif",
                    fontSize: "14px",
                    "&:hover": {
                      color: "#388e3c", // Change the hover color here
                      textDecorationColor: "#388e3c", // Change the underline color here
                    },
                  }}
                >
                  Have an account? Log In
                </Link>
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              color="inherit"
              align="center"
              sx={{
                fontFamily: "nunito, sans-serif",
                fontSize: "14px",
                display: { xs: "none", md: "inherit" },
                mt: 3,
              }}
            >
              By signing up, you agree to our{" "}
              <Link
                color="inherit"
                href="/terms-and-conditions"
                sx={{
                  fontFamily: "nunito, sans-serif",
                  fontSize: "14px",
                  "&:hover": {
                    color: "#388e3c", // Change the hover color here
                    textDecorationColor: "#388e3c", // Change the underline color here
                  },
                }}
              >
                Terms and Conditions
              </Link>{" "}
              and our{" "}
              <Link
                color="inherit"
                href="/private-policy"
                sx={{
                  fontFamily: "nunito, sans-serif",
                  fontSize: "14px",
                  "&:hover": {
                    color: "#388e3c", // Change the hover color here
                    textDecorationColor: "#388e3c", // Change the underline color here
                  },
                }}
              >
                Private Policy
              </Link>
            </Typography>
            <Copyright sx={{ display: { xs: "none", md: "inherit" }, mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
