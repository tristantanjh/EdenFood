import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarSecondary from "../AppBarSecondary.jsx";
import Footer from "../Footer.jsx";
import CartItem from "./CartItem.jsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../hooks/AuthProvider";
import axios from "axios";
import CustomButton from "../common/CustomButton";
import { useEffect } from "react";
import { alpha } from "@mui/material";
import Stack from "@mui/material/Stack";

// const items = [
//   {
//     itemPrice: "$5.95",
//     itemName: "Norwegian Salmon (100g)",
//     itemImageURL:
//       "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
//     itemPlacementDate: "14 February",
//     itemFreshness: "3",
//   },
//   {
//     itemPrice: "$5.95",
//     itemName: "Wakanda Meat (100g)",
//     itemImageURL:
//       "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708348046/samples/man-portrait.jpg",
//     itemPlacementDate: "14 February",
//     itemFreshness: "3",
//   },
// ];

export default function ShoppingCart() {
  const { user } = useAuth();
  const [items, setGroceries] = React.useState([]);
  // pass in params as item price and quantity
  const [totalPrice, setTotalPrice] = React.useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getCart", {
        params: { userId: user.id },
      })
      .then((res) => {
        console.log(res.data.items);
        const itemsData = res.data?.items || [];
        const totalPrice = parseFloat((res.data?.totalPrice || 0).toFixed(1));
        setGroceries(itemsData);
        setTotalPrice(totalPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
          {items.length > 0 ? (
            <>
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
                  groceryId={item.grocery.id}
                  price={item.grocery.price}
                  imageURL={item.grocery.imageURL}
                  title={item.grocery.name}
                  freshness={item.grocery.freshness}
                  currentQuantity={item.quantity}
                  setTotalPrice={setTotalPrice}
                />
              ))}

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontFamily: "nunito, sans-serif",
                    fontSize: { xs: "1rem", sm: "1.4rem" },
                    fontWeight: "bold",
                    textAlign: "left",
                    marginTop: 0.4,
                    marginRight: 2,
                  }}
                >
                  Total Price: ${totalPrice}
                </Typography>
                <CustomButton
                  // onClick={checkOut(itemChanges)}
                  sx={{
                    borderRadius: "999px",
                    borderBlockColor: "transparent",
                    backgroundColor: "#076365",
                    color: "#FAFFF4",
                    fontFamily: "nunito, sans-serif",
                    fontWeight: "700",
                    fontSize: { xs: "0.74rem", sm: "1.10rem" },
                    width: { xs: "90px", sm: "160px" },
                    marginRight: { xs: 2, sm: 5, md: 10 },
                    padding: { xs: "5px 11px", sm: "8px 15px" },
                    boxShadow: "0px",
                    "&:hover": {
                      backgroundColor: alpha("#076365", 0.8),
                    },
                    "&:focus": { outline: "none" },
                  }}
                >
                  Checkout
                </CustomButton>
              </Box>
            </>
          ) : (
            <Typography
              sx={{
                fontFamily: "nunito, sans-serif",
                fontSize: { xs: "2rem", sm: "3rem" },
                fontWeight: "bold",
                textAlign: "center",
                width: "100%", // Ensures it centers in the container
              }}
            >
              Your Cart is Empty
            </Typography>
          )}
        </Container>
      </Box>
      <Footer />
    </div>
  );
}
