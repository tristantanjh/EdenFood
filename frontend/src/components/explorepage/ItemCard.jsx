import * as React from "react";
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

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ItemCard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
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
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 6, sm: 12 },
        }}
      >
        <Card
          sx={{
            position: "relative",
            maxWidth: isMobile ? 200 : 275,
          }}
        >
          {/* Custom image based on merchant uploads */}
          <CardMedia
            sx={{
              height: isMobile ? 112.5 : 154.6875,
              width: isMobile ? 200 : 275,
            }}
            image="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg"
            alt="Product Image"
            title="Listing Photo"
          />
          <CardContent>
            {/* Custom title based on merchant uploads */}
            <Typography
              component="div"
              fontFamily="open sans, sans-serif"
              sx={{
                fontSize: isMobile ? 18 : 24,
                fontWeight: 550,
                maxWidth: isMobile ? "200px" : "275px",
                display: "inline-block",
                wordWrap: "break-word",
                lineHeight: "1.2",
                mb: 0.4,
              }}
            >
              Norwegian Salmon
            </Typography>
            {/* Custom number of days based on merchant uploads */}
            <Typography
              sx={{ mb: 1.5, fontSize: isMobile ? 11 : 14 }}
              color="text.secondary"
              fontFamily="open sans, sans-serif"
            >
              3 day freshness
            </Typography>
            {/* Custom price based on merchant uploads */}
            <Typography
              fontWeight={800}
              fontFamily="nunito, sans-serif"
              sx={{ mt: -0.7, fontSize: isMobile ? 18 : 24 }}
            >
              $5.95
            </Typography>
          </CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <CardContent
              sx={{
                mt: isMobile ? -3.5 : -3,
              }}
            >
              {/* Need change default value accordingly */}
              <Ratings defaultValue={3} size="small" isMobile={isMobile} />
            </CardContent>
            <IconButton
              size="small"
              // aria-label="Add to Cart"
              //onClick={handleAddToCart} Define click handler function
              sx={{
                position: "absolute",
                bottom: isMobile ? 8 : 5,
                right: isMobile ? 8 : 5,
                mt: -4.5,
                width: isMobile ? 40 : 50,
                height: isMobile ? 40 : 50,
              }}
            >
              <img
                src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708593251/Natural_Fresh_Food_Logo_1_lkidam.png"
                alt="Add to Cart"
                style={{ width: "100%", height: "100%" }}
              />
            </IconButton>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
