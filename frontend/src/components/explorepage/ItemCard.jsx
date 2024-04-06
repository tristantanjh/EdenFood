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
import Ratings from "./ratings";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import List from "@mui/material/List";
import QuantitySelector from "./QuantitySelector";
import CustomButton from "../common/CustomButton";
import { useAuth } from "../../hooks/AuthProvider";
import axios from "axios";
import averageRating from "../../utils/averageRating";
import { useNavigate } from "react-router-dom";

function SimpleDialog(props) {
  const { user } = useAuth();
  const { onClose, open, groceryId } = props;
  const [quantity, setQuantity] = React.useState(1);

  const handleClose = () => {
    onClose();
  };

  const handleAddToCart = async (value) => {
    try {
      const response = await axios.post("http://localhost:3000/addToCart", {
        userId: user.id,
        groceryId: props.groceryId,
        quantity: quantity,
      });
      // add SnackBar for if response.ok
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      console.log("Item added to cart successfully");
      handleClose();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          fontFamily: "nunito, sans-serif",
          fontSize: { xs: "1.3rem", sm: "1.5rem" },
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        Select Item Quantity
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        <Stack spacing={2}>
          <QuantitySelector
            minValue={1}
            maxValue={10}
            quantity={quantity}
            onQuantityChange={setQuantity}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <CustomButton
              onClick={handleAddToCart}
              sx={{
                borderRadius: "999px",
                borderBlockColor: "transparent",
                backgroundColor: "#64CF94", // Custom background color
                color: "#FFF", // Custom text color
                fontFamily: "nunito, sans-serif",
                fontWeight: "700",
                fontSize: { xs: "0.7rem", sm: "0.8rem" },
                width: { xs: "110px", sm: "150px" },
                padding: { xs: "4px 7px", sm: "5px 8px" },
                boxShadow: "0px",
                mr: "10px",
                mb: "5px",
                "&:hover": {
                  backgroundColor: alpha("#64CF94", 0.8),
                },
                "&:focus": { outline: "none" },
              }}
            >
              Add to Cart
            </CustomButton>
          </Box>
        </Stack>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function ItemCard(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };

  const handleViewItem = (id) => {
    console.log(id);
    navigate("/item/" + id);
  };

  useEffect(() => {
    const fetchRating = async () => {
      const avgRating = await averageRating(props._id);
      setRating(avgRating);
    };

    fetchRating();
  }, [rating]);

  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: isMobile ? 160 : 275,
        borderRadius: "8px",
        mb: "1rem",
      }}
    >
      {/* Custom image based on merchant uploads */}
      <CardMedia
        sx={{
          height: isMobile ? 125 : 225,
          width: isMobile ? 160 : 275,
        }}
        image={props.imageURL[0]}
        // image="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg"
        alt="Product Image"
        title="Listing Photo"
        onClick={() => handleViewItem(props._id)}
      />
      <CardContent>
        {/* Custom title based on merchant uploads */}
        <a
          href="#"
          onClick={() => handleViewItem(props._id)}
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
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
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {props.name}
            {/* Norwegian Salmon (100g) */}
          </Typography>
        </a>

        {/* Custom number of days based on merchant uploads */}
        <Typography
          sx={{ mb: 1.5, fontSize: isMobile ? 11 : 14 }}
          color="text.secondary"
          fontFamily="open sans, sans-serif"
        >
          Expires {props.freshness.substring(0, 10).replace(/-/g, "/")}
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
          <Ratings
            value={rating}
            size={isMobile ? "small" : "large"}
            isMobile={isMobile}
          />
        </CardContent>
        {/* <IconButton
          size="small"
          onClick={() => handleViewItem(props._id)}
          sx={{
            position: "absolute",
            bottom: isMobile ? 35 : 3.5,
            right: isMobile ? -8 : 40,
            width: isMobile ? 60 : 75,
            height: isMobile ? 43 : 54,
            "&:focus": { outline: "none" },
          }}
        >
          <img
            src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1711698641/search_icon_emhzzk.png"
            alt="View details"
            style={{ width: "100%", height: "100%" }}
          />
        </IconButton> */}
        <IconButton
          size="small"
          onClick={handleClickOpen}
          sx={{
            position: "absolute",
            bottom: isMobile ? 2 : 5,
            right: isMobile ? 2 : 5,
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
        <SimpleDialog open={open} onClose={handleClose} groceryId={props._id} />
      </Stack>
    </Card>
  );
}
