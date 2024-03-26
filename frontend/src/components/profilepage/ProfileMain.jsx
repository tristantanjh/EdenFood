import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProfileHeader from "./ProfileHeader.jsx";
import ProfileDescriptionTab from "./ProfileDescriptionTab.jsx";
import { useAuth } from "../../hooks/AuthProvider";

export default function Profile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAuth();

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        bgcolor: "#FAFFF4",
        height: { xs: "100%", md: "100%" },
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column" },
          alignItems: "center",
          justifyContent: "center",
          pb: { xs: 6, sm: 12 },
        }}
      >
        <ProfileHeader user={user} />
        <ProfileDescriptionTab user={user} />
      </Container>
    </Box>
  );
}
