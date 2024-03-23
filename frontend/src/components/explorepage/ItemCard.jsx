import * as React from "react";
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
import Ratings from "./ratings";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

export default function ItemCard(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: isMobile ? 150 : 275,
        borderRadius: "8px",
        mb: "1rem"
      }}
    >
      {/* Custom image based on merchant uploads */}
      <CardMedia
        sx={{
          height: isMobile ? 125 : 225,
          width: isMobile ? 150 : 275,
        }}
        image={props.itemImageURL}
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
          {props.itemName}
          {/* Norwegian Salmon (100g) */}
        </Typography>
        {/* Custom number of days based on merchant uploads */}
        <Typography
          sx={{ mb: 1.5, fontSize: isMobile ? 11 : 14 }}
          color="text.secondary"
          fontFamily="open sans, sans-serif"
        >
          {props.itemFreshness} day freshness
        </Typography>
        {/* Custom price based on merchant uploads */}
        <Typography
          fontWeight={800}
          fontFamily="nunito, sans-serif"
          sx={{ mt: -0.7, fontSize: isMobile ? 18 : 22 }}
        >
          S${props.itemPrice}
        </Typography>
      </CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CardContent
          sx={{
            mt: isMobile ? -3.5 : -3,
          }}
        >
          {/* Need change default value accordingly */}
          <Ratings defaultValue={props.itemRating} size="small" isMobile={isMobile} />
        </CardContent>
        <IconButton
          size="small"
          // aria-label="Add to Cart"
          //onClick={handleAddToCart} Define click handler function
          sx={{
            position: "absolute",
            bottom: isMobile ? 8 : 5,
            right: isMobile ? 8 : 5,
            mt: -4.5,
            width: isMobile ? 40 : 50,
            height: isMobile ? 40 : 50,
            "&:focus": { outline: "none" },
          }}
        >
          <img
            src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708593251/Natural_Fresh_Food_Logo_1_lkidam.png"
            alt="Add to Cart"
            style={{ width: "100%", height: "100%" }}
          />
        </IconButton>
      </Stack>
    </Card>
  );
}
