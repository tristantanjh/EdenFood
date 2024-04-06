import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Ratings from "./Ratings.jsx";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import averageRating from "../../utils/averageRating";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Rating } from "@mui/material";
import { useAuth } from "../../hooks/AuthProvider.jsx";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

export default function ReviewCard(props) {
  const theme = useTheme();
  const { user } = useAuth();
  const [review, setReview] = React.useState({});
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [merchant, setMerchant] = React.useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/getReviewWithId", {
        params: { reviewId: props.reviewId },
      })
      .then((res) => {
        setReview(res.data.review);

        axios
          .get("http://localhost:3000/getUserWithId", {
            params: { userId: res.data.review.buyerId },
          })
          .then((res) => {
            setMerchant(res.data.user);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Card
      variant="outlined"
      fullWidth
      sx={{
        position: "relative",
        borderRadius: "8px",
        mb: "1rem",
        p: 2,
      }}
    >
      <Stack direction="row" spacing={1}>
        <Stack direction="row">
          <Stack sx={{ display: "flex", justifyContent: "center", p: 1 }}>
            <Avatar
              alt="Circular Image"
              src={merchant.profilePic}
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
              }}
            />
            <Typography
              component="div"
              fontFamily="nunito, sans-serif"
              sx={{
                fontSize: isMobile ? 11 : 16,
                fontWeight: 550,
                maxWidth: isMobile ? "200px" : "275px",
                display: "inline-block",
                wordWrap: "break-word",
                lineHeight: "1.2",
                mb: 0.2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {merchant.username}
            </Typography>
          </Stack>
          <Divider
            orientation="vertical"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              height: "100%",
            }}
          />
        </Stack>
        <Stack sx={{ display: "flex", justifyContent: "flex-start", p: 1 }}>
          <Rating
            name="read-only"
            value={review && review.rating ? review.rating : 0}
            readOnly
            sx={{ mb: "15px" }}
          />

          <Typography
            component="div"
            fontFamily="open sans, sans-serif"
            sx={{
              fontSize: isMobile ? 11 : 19,
              fontWeight: 550,
              maxWidth: isMobile ? "200px" : "275px",
              display: "inline-block",
              wordWrap: "break-word",
              lineHeight: "1.2",
              mb: 0.2,
            }}
          >
            "{review && review.description ? review.description : ""}"
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
