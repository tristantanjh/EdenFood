import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../hooks/AuthProvider";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import QuantitySelector from "./QuantitySelector";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

export default function CartItem(props) {
  const theme = useTheme();
  const { user } = useAuth();
  const expiryDate = new Date(props.freshness);
  const currentDate = new Date();
  const calculateTimeLeft = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log(props);
    const created = new Date(props.createdAt);
    const diffTime = Math.abs(today - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const daysLeft = parseInt(props.freshness) - diffDays;
    if (daysLeft < 0) {
      return "Expired";
    } else {
      return `${daysLeft} days left`;
    }
  };
  const timeLeftString = calculateTimeLeft();
  // const handleRemoveItem = async (value) => {
  //   try {
  //     const response = await axios.delete(
  //       "http://localhost:3000/removeFromCart",
  //       {
  //         params: { userId: user.id, groceryId: props.groceryId },
  //       }
  //     );
  //     window.location.reload();
  //     toast.success("Item successfully deleted");
  //   } catch (error) {
  //     console.error("Error deleting grocery: ", error);
  //   }
  // };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        pl: "0",
        pr: "0",
        mb: "1rem",
      }}
    >
      <Card
        sx={{
          position: "relative",
          width: "90%",
          height: isMobile ? "12vh" : "20vh",
          margin: "0 auto",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          justifyContent="flex-start"
          alignItems="center"
          columnSpacing={{ xs: -2, sm: 2, md: 3 }}
        >
          {/* Custom image based on merchant uploads */}
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <img
                src={props.imageURL[0]}
                alt="Product Image"
                title="Listing Photo"
                style={{
                  width: isMobile ? "90px" : "180px",
                  height: isMobile ? "110px" : "140px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <CardContent>
              <Typography
                component="div"
                fontFamily="open sans, sans-serif"
                sx={{
                  position: "absolute",
                  top: "10%",
                  left: "35%",
                  fontSize: isMobile ? 18 : 21,
                  fontWeight: 550,
                  maxWidth: isMobile ? "200px" : "500px",
                  display: "inline-block",
                  overflowWrap: "break-word",
                  lineHeight: "1.2",
                }}
              >
                {props.title}
              </Typography>
              {/* Custom number of days based on merchant uploads */}
              <Typography
                sx={{
                  position: "absolute",
                  top: "35%",
                  left: "35%",
                  mb: 0.5,
                  fontSize: isMobile ? 11 : 14,
                }}
                color="text.secondary"
                fontFamily="open sans, sans-serif"
              >
                Time till expiry: {timeLeftString}
              </Typography>

              {/* Custom price based on merchant uploads */}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{ position: "absolute", top: "72%", left: "35%" }}
              >
                <Typography
                  fontWeight={800}
                  fontFamily="nunito, sans-serif"
                  sx={{
                    fontSize: isMobile ? 16 : 21,
                  }}
                >
                  ${props.price}
                </Typography>
                <QuantitySelector
                  minValue={1}
                  currentValue={props.currentQuantity}
                  maxValue={props.groceryQuantity}
                  itemPrice={props.price}
                  setTotalPrice={props.setTotalPrice}
                  groceryId={props.groceryId}
                />
              </Stack>
            </CardContent>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{ pf: "20px", display: "flex", justifyContent: "flex-end" }}
          >
            <CardContent>
              <IconButton
                size="small"
                onClick={() => props.handleRemoveItem(props.groceryId)}
                sx={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  mt: -4.5,
                  width: isMobile ? 25 : 60,
                  height: isMobile ? 25 : 60,
                  "&:focus": { outline: "none" },
                }}
              >
                <DeleteForeverRoundedIcon
                  color="error"
                  sx={{ fontSize: isMobile ? 20 : 40 }}
                />
              </IconButton>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
