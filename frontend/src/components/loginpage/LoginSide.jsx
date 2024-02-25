import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

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

export default function SignInSide() {
  const theme = createTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundColor: "#076365",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={7}
          component={Paper}
          elevation={6}
          square
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "30%",
            }}
          >
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
                  color="success"
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
                sx={{
                  mt: 3,
                  mb: 2,
                  fontFamily: "open sans, sans-serif",
                  backgroundColor: "#076365",
                  color: "#FAFFF4",
                  borderRadius: "30px",
                  "&:hover": { backgroundColor: "#076365" },
                }}
              >
                Sign In
              </Button>
              <Grid container>
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
                    Register
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
