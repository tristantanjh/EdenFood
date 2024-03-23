import React from "react";
import {
  TextField,
  CssBaseline,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import UploadImage from "./UploadImage";
import ListingDescriptionTab from "./ListingDescriptionTab";

export default function ListingDetails() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <CssBaseline />
      <Box
        id="hero"
        sx={{
          width: "100%",
          bgcolor: "#FAFFF4",
          height: "auto",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 6, sm: 12 },
            pl: 0,
            pr: 0,
            backgroundColor: "#FAFFF4",
          }}
        >
          <TextField
            sx={{
              margin: "0.3%",
              width: isSmallScreen ? "90%" : isMediumScreen ? "40%" : "28%",
            }}
            id="title"
            label="(Insert Title)"
            variant="outlined"
          />
          <TextField
            sx={{
              mt: "1%",
              width: isSmallScreen ? "90%" : isMediumScreen ? "40%" : "28%",
            }}
            id="freshness"
            label="(Insert days of freshness)"
            variant="outlined"
          />
          <TextField
            sx={{
              mt: "1%",
              width: isSmallScreen ? "90%" : isMediumScreen ? "40%" : "28%",
            }}
            id="Price"
            label="$ (Price)"
            variant="outlined"
          />

          <UploadImage />
          <ListingDescriptionTab />
        </Container>
      </Box>
    </div>
  );
}
