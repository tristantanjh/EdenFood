import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import swal from "sweetalert";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AspectRatio from "@mui/joy/AspectRatio";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export default function EditProfile(props) {
  const navigate = useNavigate();
  const [user, setUser] = React.useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [imageURL, setImageURL] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    rememberMe: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/getUserWithId", {
        params: { userId: props.user.id },
      })
      .then((res) => {
        const fetchedUser = res.data.user;
        setUser(fetchedUser);
        console.log(fetchedUser.profilePic);
        setImageURL(fetchedUser.profilePic);
        setFormData({
          email: fetchedUser.email || "",
          username: fetchedUser.username || "",
          rememberMe: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = props.user.id;

    if (validateForm()) {
      axios
        .patch(`http://localhost:3000/editProfile/${userId}`, {
          email: formData.email,
          username: formData.username,
          profilePic: imageURL,
        })
        .then((response) => {
          swal(
            "Profile Updated",
            "Your profile has been updated successfully.",
            "success"
          );
        })
        .catch((error) => {
          console.error("There was an error updating the profile", error);
          swal(
            "Failed to Update",
            "There was a problem updating your profile. Please try again.",
            "error"
          );
        });
    } else {
      console.log("Invalid form");
    }
  };

  const [errors, setErrors] = React.useState({
    email: "",
  });

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
    const newErrors = { email: "" };

    // Email format regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is empty or invalid format
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      newErrors.email = !formData.email
        ? "Email is required"
        : "Invalid email format";
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
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            mx: 4,
            mt: { xs: 15, md: 0 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: { xs: "flex-start", sm: "center" },
            height: "100vh",
            width: { xs: "100%", md: "30%" },
          }}
        >
          <Typography
            fontFamily={"open sans, sans-serif"}
            fontSize={24}
            fontWeight={"bold"}
            color={"#181B13"}
          >
            Edit Profile
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
              value={formData.email}
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
              value={formData.username}
              name="username"
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
                my: "4px",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {imageURL === "empty" ? (
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
                          backgroundColor: "#DFDFDF",
                          color: "#181B13",
                          border: "1px dashed #181B13",
                          borderRadius: "10px",
                          "&:hover": { backgroundColor: "#FFFFFF" },
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
                  sx={{
                    position: "relative", // Allows for absolute positioning of the edit button
                    "&:hover #editIcon": {
                      display: "flex", // Show the edit button on hover
                    },
                  }}
                >
                  <img
                    src={imageURL}
                    alt="Uploaded Profile Picture"
                    style={{
                      height: "200px",
                      width: "200px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                  <CloudinaryUploadWidget onUpload={handleOnUpload}>
                    {({ open }) => {
                      return (
                        <IconButton
                          id="editIcon"
                          onClick={(e) => {
                            e.preventDefault();
                            open();
                          }}
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            display: "none", // Initially hidden
                            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                            color: "white",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker on hover
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      );
                    }}
                  </CloudinaryUploadWidget>
                </Box>
              )}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // disabled={!formData.email || !formData.password}
              sx={{
                mt: 1,
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
              Edit Profile
            </Button>
            <Button
              href="/editPassword"
              fullWidth
              variant="contained"
              // disabled={!formData.email || !formData.password}
              sx={{
                mt: 0.5,
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
