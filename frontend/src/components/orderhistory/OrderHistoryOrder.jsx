import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import OrderHistoryItem from "./OrderHistoryItem.jsx";
import CustomButton from "../common/CustomButton";
import { alpha } from "@mui/material";

export default function OrderHistoryOrder(props) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "column" },
        alignItems: "center",
        backgroundColor: "#fff",
        pl: "0",
        pr: "0",
      }}
    >
      {/* Merchant image & Order status */}
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "row" },
          alignItems: "center",
          mt: { xs: "1rem", md: "2rem" },
          mb: "1rem",
          pl: "0",
          pr: "0",
        }}
      >
        {/* Merchant image */}
        <Card sx={{ minWidth: 27, ml: { xs: "1rem", md: "0" }, }}>
          <CardMedia
            sx={{ 
                height: { xs: 30, md: 50 }, 
                width: { xs: 30, md: 50 },
            }}
            image={props.merchantLogoURL}
            // image="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708501388/istockphoto-691338444-612x612-removebg-preview_ffo3vb.png"
            title="Listing Photo"
          />
        </Card>

        <Typography sx={{ fontSize: { xs: "15px", md: "20px" }, fontWeight: "bold", ml: { xs: ".5rem", md: "1rem" } }}>
          {/* King Koi */}
          {props.merchantName}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "15px", md: "20px" },
            fontWeight: "bold",
            ml: "auto",
            mr: { xs: "1rem", md: "0" },
            color: "#076365",
          }}
        >
          {/* To Collect */}
          {props.orderStatus}
        </Typography>
      </Container>

      {props.items.map((item, index) => (
        <OrderHistoryItem
          key={index}
          imageURL={item.itemImageURL}
          title={item.itemName}
          quantity={item.itemQuantity}
        />
      ))}

      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "row" },
          alignItems: "center",
        }}
      >
        <Typography
          fontFamily="nunito, sans-serif"
          sx={{
            fontSize: { xs: "18px", md: "26px" },
            ml: "auto",
            mt: "1.5rem",
          }}
        >
          Total: <b>S${props.orderAmount}</b>
        </Typography>
      </Container>

      {/* FUA buttons */}
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "row" },
          alignItems: "center",
          justifyContent: "right",
          mt: "1rem",
          mb: "1.5rem",
        }}
      >
        <CustomButton
          sx={{
            borderRadius: "15px",
            borderBlockColor: "transparent",
            backgroundColor: "#64CF94", // Custom background color
            color: "#FFF", // Custom text color,
            textTransform: "none",
            fontFamily: "nunito, sans-serif",
            fontWeight: "800",
            fontSize: { xs: ".8rem", md: "1.2rem" },
            width: { xs: "60px", md: "100px" },
            padding: "5px 5px",
            "&:hover": {
              backgroundColor: alpha("#64CF94", 0.8),
            },
            "&:focus": { outline: "none" },
            mr: { xs: ".5rem", md: "1rem" }
          }}
        >
          Rate
        </CustomButton>
        <CustomButton
          sx={{
            borderRadius: "15px",
            borderBlockColor: "transparent",
            backgroundColor: "#64CF94", // Custom background color
            color: "#FFF", // Custom text color,
            textTransform: "none",
            fontFamily: "nunito, sans-serif",
            fontWeight: "800",
            fontSize: { xs: ".8rem", md: "1.2rem" },
            width: { xs: "100px", md: "150px" },
            padding: "5px 5px",
            "&:hover": {
              backgroundColor: alpha("#64CF94", 0.8),
            },
            "&:focus": { outline: "none" },
            mr: { xs: ".5rem", md: "1rem" }
          }}
        >
          Buy Again
        </CustomButton>
        <CustomButton
          sx={{
            borderRadius: "15px",
            borderBlockColor: "transparent",
            backgroundColor: "#64CF94", // Custom background color
            color: "#FFF", // Custom text color,
            textTransform: "none",
            fontFamily: "nunito, sans-serif",
            fontWeight: "800",
            fontSize: { xs: ".8rem", md: "1.2rem" },
            width: { xs: "60px", md: "120px" },
            padding: "5px 5px",
            "&:hover": {
              backgroundColor: alpha("#64CF94", 0.8),
            },
            "&:focus": { outline: "none" },
          }}
        >
          Report
        </CustomButton>
      </Container>
    </Container>
  );
}
