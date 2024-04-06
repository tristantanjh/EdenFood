import React, { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader.jsx";
import ProfileDescriptionTab from "./ProfileDescriptionTab.jsx";
import { useAuth } from "../../hooks/AuthProvider.jsx";
import ReviewCard from "./ReviewCard.jsx";
import Grid from "@mui/material/Grid";
import axios from "axios";
import {
  TextField,
  CssBaseline,
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  useTheme,
  useMediaQuery,
  Typography,
  Stack,
} from "@mui/material";

export default function BuyerReview() {
  const { user } = useAuth();
  const [merchant, setMerchant] = React.useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3000/getUserWithId", {
        params: { userId: user.id },
      })
      .then((res) => {
        setMerchant(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "flex-start",
        pb: 5,
      }}
    >
      <Stack spacing={1}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            fontFamily={"nunito, sans-serif"}
            fontSize={32}
            fontWeight={"bold"}
            color={"#181B13"}
            sx={{ mb: "20px" }}
          >
            Buyer reviews
          </Typography>
          <Typography
            fontFamily={"nunito, sans-serif"}
            fontSize={28}
            color={"BEBEBE"}
            sx={{ mt: "5px" }}
          >
            {"("}
            {merchant && merchant.reviews ? merchant.reviews.length : 0}
            {")"}
          </Typography>
        </Stack>
        <Grid container justifyContent="center">
          {merchant &&
            merchant.reviews &&
            merchant.reviews.map((review, index) => (
              <Grid item xs={12} key={index}>
                {" "}
                {/* Each ReviewCard in its own row */}
                <Grid container justifyContent="center">
                  <Grid item xs={12}>
                    <ReviewCard reviewId={review} />
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Container>
  );
}
