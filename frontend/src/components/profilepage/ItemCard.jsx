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
import averageRating from "../../utils/averageRating";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ItemCard(props) {
  const theme = useTheme();
  const [rating, setRating] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchRating = async () => {
      const avgRating = await averageRating(props.id);
      setRating(avgRating);
    };

    fetchRating();
  }, [rating]);

  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: isMobile ? 150 : 275,
        borderRadius: "8px",
        mb: "1rem",
      }}
    >
      {/* Custom image based on merchant uploads */}
      <CardMedia
        sx={{
          height: isMobile ? 125 : 225,
          width: isMobile ? 150 : 275,
        }}
        image={props.imageURL[0]}
        // image="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg"
        alt="Product Image"
        title="Listing Photo"
      />
      <CardContent>
        {/* Custom title based on merchant uploads */}
        <Typography
          component="div"
          fontFamily="open sans, sans-serif"
          sx={{
            fontSize: isMobile ? 15 : 19,
            fontWeight: 550,
            maxWidth: isMobile ? "200px" : "275px",
            display: "inline-block",
            wordWrap: "break-word",
            lineHeight: "1.2",
            mb: 0.2,
          }}
        >
          {props.name}
          {/* Norwegian Salmon (100g) */}
        </Typography>
        {/* Custom number of days based on merchant uploads */}
        <Typography
          sx={{ mb: 1.5, fontSize: isMobile ? 11 : 14 }}
          color="text.secondary"
          fontFamily="open sans, sans-serif"
        >
          {props.freshness} day freshness
        </Typography>
        {/* Custom price based on merchant uploads */}
        <Typography
          fontWeight={800}
          fontFamily="nunito, sans-serif"
          sx={{ mt: -0.7, fontSize: isMobile ? 18 : 22 }}
        >
          S${props.price}
        </Typography>
      </CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CardContent
          sx={{
            mt: isMobile ? -3.5 : -3,
          }}
        >
          {/* Need change default value accordingly */}
          <Ratings value={rating} size="small" isMobile={isMobile} />
        </CardContent>
      </Stack>
    </Card>
  );
}
