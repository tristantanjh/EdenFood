import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function OrderHistoryItem(props) {
  return (
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          pl: "0",
          pr: "0",
          mb: "1rem"
        }}
      >
        <Card sx={{ minWidth: 27 }}>
          {/* Item image based on merchant uploads */}
          <CardMedia
            sx={{ 
              height: { xs: 80, md: 110 }, 
                width: { xs: 80, md: 110 } 
            }}
            image={props.imageURL}
            // image="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg"
            title="Listing Photo"
          />
        </Card>
        <Card sx={{ 
          minWidth: 27, 
          width: { xs: 265, md: 600 } 
          }}>
          <CardContent sx={{ 
            height: { xs: 80, md: 110 }, 
            alignItems: "left", 
            padding: 1,
            backgroundColor: "#FAFFF4" 
            }}>
            {/* Item title based on merchant uploads */}
            <Typography sx={{ fontSize: { xs: "18px", md: "24px" }, mb: ".5rem" }}>
                {props.title}
              {/* Norwegian Salmon (100g) */}
            </Typography>
            {/* Quantity of order item */}
            <Typography color="text.secondary" sx={{ fontSize: { xs: "15px", md: "18px" } }}>
                Quantity Ordered: {props.quantity}
              {/* Qty: 1 */}
            </Typography>
          </CardContent>
        </Card>
      </Container>
  );
}
