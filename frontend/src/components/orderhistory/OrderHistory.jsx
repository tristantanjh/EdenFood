import React, { useState, useEffect } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import AppBarSecondary from "../AppBarSecondary.jsx";
import Footer from "../Footer.jsx";
import OrderHistoryOrder from "./OrderHistoryOrder.jsx";
import MuiAccordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../hooks/AuthProvider";
import axios from "axios";


const Accordion = styled(MuiAccordion)({
  "&.Mui-expanded": {
    margin: "0",
  },
  "&.MuiAccordion-root": {
    width: "100%",
  },
  ".css-15v22id-MuiAccordionDetails-root": {
    padding: "0",
  },
});

// const orders = [
//   {
//     orderID: "1024",
//     orderDate: "07/03/2024",
//     orderStatus: "To Collect",
//     orderPrice: "5.95",
//     merchantName: "King Koi",
//     merchantImageURL:
//       "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708501388/istockphoto-691338444-612x612-removebg-preview_ffo3vb.png",
//     items: [
//       {
//         itemName: "Norwegian Salmon (100g)",
//         itemImageURL:
//           "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
//         itemQuantity: "2",
//       },
//       {
//         itemName: "Wakanda Meat (100g)",
//         itemImageURL:
//           "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708348046/samples/man-portrait.jpg",
//         itemQuantity: "10",
//       },
//     ],
//   },
//   {
//     orderID: "1025",
//     orderDate: "10/03/2024",
//     orderStatus: "Collected",
//     orderPrice: "10.00",
//     merchantName: "Queen Koi",
//     merchantImageURL:
//       "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708501388/istockphoto-691338444-612x612-removebg-preview_ffo3vb.png",
//     items: [
//       {
//         itemName: "Norwegian Salmon (100g)",
//         itemImageURL:
//           "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
//         itemQuantity: "1",
//       },
//     ],
//   },
// ];

export default function OrderHistory() {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState("panel0");
  const { user } = useAuth();
  const [orders, setOrders] = React.useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  

  useEffect(() => {
    axios
      .get("http://localhost:3000/getOrdersWithUserId", {
        params: { userId: user.id },
      })
      .then((res) => {
        console.log(res.data.orders);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:3000/getOrdersWithUserId",
  //       { params: { userId: user.id } }
  //     );
  //     console.log(response.data.orders);
  //     orders = response.data.orders;
  //   } catch (error) {
  //     // Handle error
  //     console.error(error);
  //   }
  // };

  const handleChange = (panel) => (event, newExpanded) => {
    console.log(panel);
    console.log(newExpanded);
    setExpanded(newExpanded ? panel : false);
  };

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
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 6, sm: 12 },
            pl: "0",
            pr: "0",
            backgroundColor: "#FAFFF4",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "800",
              m: "0 auto 1rem 1rem",
              fontFamily: "nunito, sans-serif",
            }}
          >
            Order History
          </Typography>
          {orders.map((order, index) => (
            <Accordion
              expanded={expanded === "panel" + index}
              onChange={handleChange("panel" + index)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#FFF" }} />}
                sx={{ backgroundColor: "#076365" }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "18px" },
                    fontWeight: "bold",
                    mr: { xs: "40px", md: "auto" },
                    color: "#FFF",
                  }}
                >
                  ID: {isMobile ? order._id : order._id}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "18px" },
                    fontWeight: "bold",
                    ml: "auto",
                    mr: { xs: ".2rem", md: "18px" },
                    color: "#FFF",
                  }}
                >
                  Date: {order.createdAt.substring(0, 10).replace(/-/g, "/")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <OrderHistoryOrder
                  key={index}
                  merchant={order.merchant}
                  orderStatus={order.status}
                  orderAmount={order.amount}
                  items={order.groceries}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      <Footer />
    </div>
  );
}
