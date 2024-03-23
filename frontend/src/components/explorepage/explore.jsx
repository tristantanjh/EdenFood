import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarSecondary from "../AppBarSecondary.jsx";
import Footer from "../Footer.jsx";
import ItemCard from "./ItemCard.jsx";
import SearchBar from "./SearchBar.jsx";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import QuantitySelector from "../common/QuantitySelector.jsx";

const categories = [
  {
    categoryName: "Meat",
    categoryItems: [
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
        itemName: "Norwegian Salmon (100g)",
        itemFreshness: "3",
        itemPrice: "5.95",
        itemRating: "3",
      },
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
        itemName: "British Salmon (100g)",
        itemFreshness: "2",
        itemPrice: "10.95",
        itemRating: "5",
      },
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
        itemName: "Singapore Salmon (100g)",
        itemFreshness: "5",
        itemPrice: "15.95",
        itemRating: "2",
      },
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
        itemName: "African Salmon (100g)",
        itemFreshness: "3",
        itemPrice: "0.95",
        itemRating: "1",
      },
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
        itemName: "Norwegian Salmon (100g)",
        itemFreshness: "3",
        itemPrice: "5.95",
        itemRating: "3",
      },
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
        itemName: "British Salmon (100g)",
        itemFreshness: "2",
        itemPrice: "10.95",
        itemRating: "5",
      },
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
        itemName: "Singapore Salmon (100g)",
        itemFreshness: "5",
        itemPrice: "15.95",
        itemRating: "2",
      },
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
        itemName: "African Salmon (100g)",
        itemFreshness: "3",
        itemPrice: "0.95",
        itemRating: "1",
      },
    ],
  },
  {
    categoryName: "Vegetables",
    categoryItems: [
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1710778183/broccoli_xxtddq.jpg",
        itemName: "Malaysian Broccoli (50g)",
        itemFreshness: "3",
        itemPrice: "5.95",
        itemRating: "3",
      },
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1710778183/broccoli_xxtddq.jpg",
        itemName: "Thailand Broccoli (100g)",
        itemFreshness: "7",
        itemPrice: "7.95",
        itemRating: "5",
      },
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1710778183/broccoli_xxtddq.jpg",
        itemName: "Malaysian Broccoli (50g)",
        itemFreshness: "3",
        itemPrice: "5.95",
        itemRating: "3",
      },
      // {
      //   itemImageURL:
      //     "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1710778183/broccoli_xxtddq.jpg",
      //   itemName: "Thailand Broccoli (100g)",
      //   itemFreshness: "7",
      //   itemPrice: "7.95",
      //   itemRating: "5",
      // },
    ],
  },
];

export default function Explore() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
      <SearchBar />
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
          {categories.map((category) => (
            <div style={{ marginRight: "auto", marginBottom: "1rem", maxHeight: isMobile ? '43vh' : '60vh', overflow: 'auto'}}>
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "800",
                  m: "0 auto 1rem .5rem",
                  fontFamily: "nunito, sans-serif",
                }}
              >
                {category.categoryName}
              </Typography>
              <Grid container spacing={ isMobile ? 1 : 1 }>
                {category.categoryItems.map((item, index) => (
                  <Grid item container justifyContent="center" xs md>
                    <ItemCard
                      key={index}
                      {...item}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
        </Container>
      </Box>

      <Footer />
    </div>
  );
}
