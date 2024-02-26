import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ItemCard() {
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
        <Card sx={{ minWidth: 27 }}>
          {/* Custom image based on merchant uploads */}
          <CardMedia
            sx={{ height: 206.25, width: 275 }}
            image="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg"
            title="Listing Photo"
          />
          <CardContent>
            {/* Custom title based on merchant uploads */}
            <Typography variant="h5" component="div">
              Norwegian Salmon
            </Typography>
            {/* Custom number of days based on merchant uploads */}
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              3 day freshness
            </Typography>
            {/* Custom price based on merchant uploads */}
            <Typography
              variant="h4"
              fontWeight={800}
              fontFamily="nunito, sans-serif"
            >
              $5.95
            </Typography>
          </CardContent>
          <CardActions sx={{ mt: "-17px" }}>
            <Button size="small" variant="text">
              <Typography fontWeight={800} fontFamily="nunito, sans-serif">
                Add to Cart
              </Typography>
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
}
