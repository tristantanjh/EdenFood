import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../hooks/AuthProvider";
import Stack from "@mui/material/Stack";

export default function CartItem(props) {
  const theme = useTheme();
  const { user } = useAuth();

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

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return isMobile ? (
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
          height: isMobile ? "12vh" : "22vh",
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
              image={props.imageURL[0]}
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
                  fontSize: isMobile ? 21 : 36,
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
                  top: "42%",
                  left: "35%",
                  mb: 0.5,
                  fontSize: isMobile ? 12 : 21,
                }}
                color="text.secondary"
                fontFamily="open sans, sans-serif"
              >
                Time until expiry: {timeLeftString}
              </Typography>

              {/* Custom price based on merchant uploads */}

              <Typography
                color="text.secondary"
                fontFamily="nunito, sans-serif"
                fontWeight={800}
                sx={{
                  position: "absolute",
                  top: "74%",
                  left: "35%",
                  fontSize: isMobile ? 14 : 21,
                }}
              >
                Quantity: {props.quantity}
              </Typography>
              <Stack
                direction="row"
                alignItems="flex-end"
                spacing={1}
                sx={{ position: "absolute", top: "72%", left: "63%" }}
              >
                <Typography
                  fontWeight={800}
                  fontFamily="nunito, sans-serif"
                  sx={{
                    fontSize: isMobile ? 16 : 25,
                  }}
                >
                  ${props.price}
                </Typography>
                <Typography
                  fontWeight={500}
                  fontFamily="nunito, sans-serif"
                  sx={{
                    fontSize: isMobile ? 16 : 28,
                  }}
                >
                  {" "}
                  / per unit
                </Typography>
              </Stack>
            </CardContent>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{ pf: "20px", display: "flex", justifyContent: "flex-end" }}
          ></Grid>
        </Grid>
      </Card>
    </Container>
  ) : (
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
          width: "100%",
          height: isMobile ? "12vh" : "20vh",
          margin: "0 auto",
          alignItems: "center",
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
              image={props.imageURL[0]}
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
                  top: "8%",
                  left: "35%",
                  fontSize: 24,
                  fontWeight: 550,
                  maxWidth: "500px",
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
                  top: "30%",
                  left: "35%",
                  mb: 0.5,
                  fontSize: 16,
                }}
                color="text.secondary"
                fontFamily="open sans, sans-serif"
              >
                Time until expiry: {timeLeftString}
              </Typography>

              {/* Custom price based on merchant uploads */}

              <Typography
                color="text.secondary"
                fontFamily="nunito, sans-serif"
                fontWeight={800}
                sx={{
                  position: "absolute",
                  top: "73%",
                  left: "35%",
                  fontSize: 18,
                }}
              >
                Quantity: {props.quantity}
              </Typography>
              <Stack
                direction="row"
                alignItems="flex-end"
                spacing={1}
                sx={{ position: "absolute", top: "72%", left: "66%" }}
              >
                <Typography
                  fontWeight={800}
                  fontFamily="nunito, sans-serif"
                  sx={{
                    fontSize: 20,
                  }}
                >
                  ${props.price}
                </Typography>
                <Typography
                  fontWeight={500}
                  fontFamily="nunito, sans-serif"
                  sx={{
                    fontSize: 20,
                  }}
                >
                  {" "}
                  / per unit
                </Typography>
              </Stack>
            </CardContent>
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
