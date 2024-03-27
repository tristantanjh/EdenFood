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
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";

const ProfileHeader = (props) => {
  const [user, setUser] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigateTo = "/editProfile";

  useEffect(() => {
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
            alt="Remy Sharp"
            src={user.profilePic}
            sx={{
              width: isSmallScreen ? "3.5rem" : "5rem",
              height: isSmallScreen ? "3.5rem" : "5rem",
            }}
          />
        </Grid>
        <Grid item sx={{ mt: 15 }}>
          <Typography
            sx={{
              fontSize: isSmallScreen ? "1.5rem" : "2rem",
              fontFamily: "nunito, sans-serif",
              fontWeight: "bold",
            }}
          >
            {user.username}
          </Typography>
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
            <Button
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
              10 followers
            </Button>
            <Button
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
              10 following
            </Button>
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
