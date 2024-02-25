import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import AspectRatio from "@mui/joy/AspectRatio";

const items = [
  {
    icon: (
      <Box
        id="image"
        component="img"
        sx={{
          alignSelf: "flex-start",
          height: { xs: 70, sm: 70 },
          objectFit: "cover",
        }}
        src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708504489/value_twsdsh.png"
        alt="value"
      />
    ),
    title: "SUPPORT LOCAL FRESH PRODUCE AT AFFORDABLE PRICES",
  },
  {
    icon: (
      <Box
        id="image"
        component="img"
        sx={{
          alignSelf: "flex-start",
          height: { xs: 70, sm: 70 },
          objectFit: "cover",
        }}
        src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708504489/worldwide_ise4ia.png"
        alt="worldwide"
      />
    ),
    title: "HELP SINGAPORE MOVE TOWARDS FOOD SUSTAINABILITY",
  },
  {
    icon: (
      <Box
        id="image"
        component="img"
        sx={{
          alignSelf: "flex-start",
          height: { xs: 70, sm: 70 },
          objectFit: "cover",
        }}
        src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708504489/charity_w3qeej.png"
        alt="charity"
      />
    ),
    title: "RESCUE FOOD THAT WOULD HAVE GONE TO WASTE",
  },
];

export default function FeaturesCustomer() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Container
      id="features"
      sx={{ py: { xs: 8, sm: 16 }, backgroundColor: "#FAFFF4" }}
    >
      <Grid container spacing={4}>
      <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
        >
          <AspectRatio sx={{ width: 450 }} ratio="3/4">
            <Box
              id="image"
              component="img"
              src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708506369/edgar-castrejon-1SPu0KT-Ejg-unsplash_cuvm4w.jpg"
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </AspectRatio>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <Typography
              component="h2"
              variant="h4"
              color="#076365"
              fontFamily={"open sans, sans-serif"}
              fontWeight={"1000"}
              fontSize={{ xs: "30px", md: "40px" }}
              style={{ textAlign: isMobile ? "center" : "inherit" }}
            >
              RESCUE FOOD, {isMobile && <br />} REVIVE VALUE
            </Typography>
            <Typography
              variant="body1"
              color="#076365"
              sx={{
                mb: { xs: 4, sm: 4 },
                mt: { xs: 3, md: 4 },
                fontFamily: "nunito, sans-serif",
                textAlign: isMobile ? "center" : "inherit",
              }}
            >
              Always had the issue of not getting your hands on produce from
              early wet markets? Find that fresh produce are too expensive at
              supermarkets?
            </Typography>
          </div>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: "100%", display: "flex" }}
          >
            {items.map(({ icon, title }, index) => (
              <Box
                key={index}
                sx={{
                  p: 3,
                  height: "fit-content",
                  width: "100%",
                  background: "none",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    textAlign: "left",
                    flexDirection: "row",
                    alignItems: { md: "center" },
                    gap: { xs: 4, md: 2.5 },
                  }}
                >
                  <Box>{icon}</Box>
                  <div>
                    <Typography
                      color="#076365"
                      variant="body2"
                      fontWeight="900"
                      fontFamily={"open sans, sans-serif"}
                    >
                      {title}
                    </Typography>
                  </div>
                </Box>
              </Box>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: { xs: "flex", sm: "none" }, width: "100%", justifyContent: "center" }}
        >
          <AspectRatio sx={{ width: 300 }} ratio="1/1">
            <Box
              id="image"
              component="img"
              src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708506369/edgar-castrejon-1SPu0KT-Ejg-unsplash_cuvm4w.jpg"
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </AspectRatio>
        </Grid>
      </Grid>
    </Container>
  );
}
