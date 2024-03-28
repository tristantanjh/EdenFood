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
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import QuantitySelector from "./QuantitySelector";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

export default function CartItem(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleQuantityChange = (newQuantity) => {
    props.setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + props.price * newQuantity
    );
  };
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
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                justifyContent: "center",
              }}
              image={props.imageURL}
              alt="Product Image"
              title="Listing Photo"
            />
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
                  fontSize: isMobile ? 12 : 32,
                  fontWeight: 550,
                  maxWidth: isMobile ? "200px" : "500px",
                  display: "inline-block",
                  overflowWrap: "break-word",
                  lineHeight: "1.2",
                  mb: 1,
                }}
              >
                {props.title}
              </Typography>
              {/* Custom number of days based on merchant uploads */}
              <Typography
                sx={{
                  position: "absolute",
                  top: "32%",
                  left: "35%",
                  mb: 0.5,
                  fontSize: isMobile ? 8 : 18,
                }}
                color="text.secondary"
                fontFamily="open sans, sans-serif"
              >
                {props.freshness} day Freshness
              </Typography>
              {/* Custom number of days based on order placement date */}
              <Typography
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "35%",
                  mb: 1.5,
                  fontSize: isMobile ? 8 : 18,
                }}
                color="text.secondary"
                fontFamily="open sans, sans-serif"
              >
                Order on {props.placementDate}
              </Typography>
              {/* Custom price based on merchant uploads */}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{ position: "absolute", top: "70%", left: "35%" }}
              >
                <Typography
                  fontWeight={800}
                  fontFamily="nunito, sans-serif"
                  sx={{
                    fontSize: isMobile ? 14 : 28,
                  }}
                >
                  {props.price}
                </Typography>
                <QuantitySelector
                  minValue={1}
                  maxValue={10}
                  quantity={props.quantity}
                  handleQuantityChange={handleQuantityChange}
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
                // onClick={handleDeleteCart}
                sx={{
                  position: "absolute",
                  bottom: isMobile ? 7 : 5,
                  right: isMobile ? 7 : 5,
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