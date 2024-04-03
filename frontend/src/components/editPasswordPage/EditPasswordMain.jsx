import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import swal from "sweetalert";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import AspectRatio from "@mui/joy/AspectRatio";
import useMediaQuery from "@mui/material/useMediaQuery";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";

function Copyright() {
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

export default function EditPassword(props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [formData, setFormData] = React.useState({
    initialPassword: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = props.user.id;

    if (validateForm()) {
      console.log(formData);
      axios
        .patch(`http://localhost:3000/editPassword/${userId}`, {
          params: { userId: props.user.id },
          initialPassword: formData.initialPassword,
          newPassword: formData.password,
        })
        .then((response) => {
          swal(
            "Password Updated",
            "Your password has been updated successfully.",
            "success"
          );
        })
        .catch((error) => {
          console.error("There was an error updating the password", error);
          swal(
            "Failed to Update",
            "Please check your current password is correct and try again.",
            "error"
          );
        });
    } else {
      console.log("Invalid form");
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [errors, setErrors] = React.useState({
    initialPassword: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rememberMe" ? checked : value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { intialPassword: "", password: "" };

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
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#FAFFF4",
        }}
      >
        <Box
          sx={{
            mx: 4,
            mt: { xs: 15, md: 0 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: { xs: "flex-start", sm: "center" },
            height: { xs: "80vh", md: "100vh" },
            width: { xs: "100%", md: "30%" },
          }}
        >
          <Typography
            fontFamily={"open sans, sans-serif"}
            fontSize={24}
            fontWeight={"bold"}
            mb={2}
            color={"#181B13"}
          >
            Reset Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <FormControl sx={{ width: "100%" }} variant="standard">
              <Input
                sx={{
                  fontFamily: "nunito, sans-serif",
                  mb: 2,
                }}
                placeholder="Initial Password"
                onChange={handleChange}
                color="success"
                name="initialPassword"
                value={formData.initialPassword}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <Input
                sx={{
                  fontFamily: "nunito, sans-serif",
                  mb: 2,
                }}
                placeholder="New Password"
                onChange={handleChange}
                error={Boolean(errors.password)}
                color="success"
                name="password"
                value={formData.password}
                id="standard-adornment-password"
                type={showPassword2 ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {Boolean(errors.password) && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // disabled={!formData.email || !formData.password}
              sx={{
                mt: 2,
                mb: 2,
                py: isMobile ? 1.5 : 1,
                fontFamily: "open sans, sans-serif",
                backgroundColor: "#076365",
                color: "#FAFFF4",
                borderRadius: "30px",
                "&:hover": { backgroundColor: "#076365" },
                position: isMobile ? "fixed" : "static", // Position fixed on mobile
                bottom: isMobile ? "20px" : "auto", // Adjust bottom position on mobile
                left: isMobile ? "50%" : "0",
                transform: isMobile ? "translateX(-50%)" : "0",
                width: isMobile ? "calc(100% - 40px)" : "100%", // Adjust width on mobile
                maxWidth: isMobile ? "400px" : "auto", // Max width of the button
                marginLeft: "auto", // Center horizontally
                marginRight: "auto", // Center horizontally
              }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
