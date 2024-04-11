import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarSecondary from "../AppBarSecondary.jsx";
import Footer from "../Footer.jsx";
import CartItem from "./CartItem.jsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../hooks/AuthProvider";
import axios from "axios";
import CustomButton from "../common/CustomButton";
import { useEffect, useState } from "react";
import { alpha } from "@mui/material";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function ShoppingCart(props) {
  const { user, sessionId } = useAuth();
  const [items, setGroceries] = React.useState([]);
  // pass in params as item price and quantity
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [refreshCart, setRefreshCart] = useState(0);
  const navigate = useNavigate();

  const navigateCheckout = () => {
    navigate("/checkout/" + sessionId);
  };

  const handleRemoveItem = async (groceryId) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/removeFromCart",
        {
          params: { userId: user.id, groceryId: groceryId },
        }
      );
      setRefreshCart((prev) => prev + 1);
      toast.success("Item successfully deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error deleting grocery: ", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/getCart", {
        params: { userId: user.id },
      })
      .then((res) => {
        const itemsData = res.data?.items || [];
        const totalPrice = parseFloat((res.data?.totalPrice || 0).toFixed(1));
        console.log(itemsData);
        setGroceries(itemsData);
        setTotalPrice(totalPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshCart]);
  return (
    <div>
      <CssBaseline />
      {/* <AppBarSecondary /> */}
      {/* <Box
        id="hero"
        sx={(theme) => ({
          width: "100%",
          bgcolor: "#FAFFF4",
          height: { xs: "100%", md: "100%" },
        })}
      > */}
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column" },
          alignItems: "flex-start",
          pt: 3,
          pb: { xs: 2, sm: 5 },
          pl: "0",
          pr: "0",
          backgroundColor: "#FAFFF4",
        }}
      >
        {items.length > 0 ? (
          <>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontFamily: "nunito, sans-serif",
                    fontSize: { xs: "1.5rem", sm: "2.8rem" },
                    fontWeight: "bold",
                    textAlign: "left",
                    pl: { xs: 2 },
                  }}
                >
                  Your Shopping Cart
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={() => props.setCartOpen(false)}>
                  <CloseIcon
                    sx={{ fontSize: { xs: "1.5rem", sm: "2.5rem" } }}
                  />
                </IconButton>
              </Grid>
            </Grid>

            <Divider
              sx={{
                height: 5,
                width: "100%",
                mb: 4,
                mt: 2,
              }}
            />

            {items.map((item, index) => (
              <CartItem
                key={item.grocery._id}
                groceryId={item.grocery._id}
                groceryQuantity={item.grocery.quantity}
                price={item.grocery.price}
                imageURL={item.grocery.imageURL}
                title={item.grocery.name}
                freshness={item.grocery.freshness}
                currentQuantity={item.quantity}
                setTotalPrice={setTotalPrice}
                handleRemoveItem={handleRemoveItem}
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
                Total Price: ${parseFloat(totalPrice).toFixed(1)}
              </Typography>
              <CustomButton
                onClick={navigateCheckout}
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
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontFamily: "nunito, sans-serif",
                  fontSize: { xs: "1.5rem", sm: "2.5rem" },
                  fontWeight: "bold",
                  textAlign: "left",
                  pl: { xs: 2 },
                }}
              >
                Your Cart is Empty
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => props.setCartOpen(false)}>
                <CloseIcon sx={{ fontSize: { xs: "1.5rem", sm: "2.5rem" } }} />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Container>
      {/* </Box> */}
      {/* <Footer /> */}
    </div>
  );
}
