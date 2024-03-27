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
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

export default function ItemCard(props) {
  const theme = useTheme();
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
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  {props.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  ${props.price}
                </Typography>
              </CardContent>
              {/* Quantity count */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="subtitle1">Quantity:</Typography>
                <Typography variant="body1">{props.quantity}</Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{ pf: "20px", display: "flex", justifyContent: "flex-end" }}
          ></Grid>
        </Grid>
      </Card>
    </Container>
  );
}
