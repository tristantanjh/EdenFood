import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";

export default function AnalyticsHeader() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        bgcolor: "#FFFFFF",
        height: { xs: "100%", md: "100%" },
      })}
    >
      <Typography
        variant="h1"
        component="h1"
        align="center"
        sx={{
          fontFamily: "open sans, sans-serif",
          fontWeight: "bold",
          pt: { xs: 12, sm: 14 },
          pb: { xs: 2, sm: 4 },
        }}
      >
        Your Shop Analytics
      </Typography>
      {/* Your SearchBar component can go here if needed */}
    </Box>
  );
}
