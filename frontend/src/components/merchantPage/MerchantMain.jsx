import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MerchantHeader from "./MerchantHeader.jsx";
import MerchantDescriptionTab from "./MerchantDescriptionTab.jsx";
import { useParams } from "react-router-dom";

export default function Profile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { merchantId } = useParams();
  // console.log(merchantId);

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
          pt: { xs: 6, sm: 2 },
          pb: { xs: 6, sm: 12 },
        }}
      >
        <MerchantHeader user={merchantId} />
        <MerchantDescriptionTab user={merchantId} />
      </Container>
    </Box>
  );
}
