import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarSecondary from "../AppBarSecondary.jsx";
import Footer from "../Footer.jsx";
import CartItem from "./CartItem.jsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const items = [
  {
    itemPrice: "$5.95",
    itemName: "Norwegian Salmon (100g)",
    itemImageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
    itemPlacementDate: "14 February",
    itemFreshness: "3",
  },
  {
    itemPrice: "$5.95",
    itemName: "Wakanda Meat (100g)",
    itemImageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708348046/samples/man-portrait.jpg",
    itemPlacementDate: "14 February",
    itemFreshness: "3",
  },
];

export default function ShoppingCart() {
  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
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
            alignItems: "flex-start",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 6, sm: 12 },
            pl: "0",
            pr: "0",
            backgroundColor: "#FAFFF4",
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontFamily: "nunito, sans-serif",
              fontSize: { xs: "2rem", sm: "3rem" },
              fontWeight: "bold",
              textAlign: "left",
              pl: { xs: 2 },
              pb: 5,
            }}
          >
            Your Shopping Cart
          </Typography>
          {items.map((item, index) => (
            <CartItem
              key={index}
              price={item.itemPrice}
              imageURL={item.itemImageURL}
              title={item.itemName}
              placementDate={item.itemPlacementDate}
              freshness={item.itemFreshness}
            />
          ))}
        </Container>
      </Box>
      <Footer />
    </div>
  );
}
