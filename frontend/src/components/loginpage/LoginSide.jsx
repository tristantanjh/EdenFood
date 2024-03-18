import React, { useEffect, useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
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
  useMediaQuery,
  FormHelperText,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import AspectRatio from "@mui/joy/AspectRatio";
import { useAuth } from "../../hooks/AuthProvider";
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

export default function LoginSide() {
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword((show) => !show);
  };

  const handleOpenSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email: data.get("email"),
          password: data.get("password"),
        });

        login(response.data.user);

        console.log(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          console.error("Invalid username or password.");
          handleOpenSnackbar("Invalid username or password.");
        } else {
          console.error("Error creating user:", error.response.data.message);
          handleOpenSnackbar(
            error.response.data.message || "An error occurred. Please try again."
          );
        }
      }
    } else {
      handleOpenSnackbar("Invalid details entered!");
      console.log("Invalid form");
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    console.log(formData);
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

    console.log(formData.email);
    console.log(formData.password);

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
            src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708348046/samples/man-portrait.jpg"
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
            Welcome Back to EdenFood
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
            {/* <FormControlLabel
                    sx={{color: "#181B13"}}
                    control={<Checkbox value="remember" sx={{color:"primary"}} />}
                    label={
                        <Typography sx={{ fontFamily: 'Nunito, sans-serif', color: "#181B13" }}>
                          Remember me
                        </Typography>
                      }
                /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!formData.email || !formData.password}
              sx={{
                mt: 3,
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
                maxWidth: isMobile ? "400px" : "auto", // Max width of the button
                marginLeft: "auto", // Center horizontally
                marginRight: "auto", // Center horizontally
              }}
            >
              Sign In
            </Button>
            <Grid container sx={{ mt: isMobile ? 2.5 : 0 }}>
              <Grid item xs>
                <Link
                  href="#"
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
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/register"
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
                  Register
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ display: { xs: "none", md: "inherit" }, mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
