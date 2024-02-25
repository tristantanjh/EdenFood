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
        src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708526103/return-on-investment-removebg-preview_hce6k0.png"
        alt="value"
      />
    ),
    title: "CONVERT YOUR EXCESS PRODUCE INTO ADDITIONAL REVENUE EFFORTLESSLY",
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
        src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708526104/Untitled-3-removebg-preview_1_wogogz.png"
        alt="worldwide"
      />
    ),
    title: "BOOST YOUR VISIBILITY AND DRAW IN FRESH CUSTOMERS, WHETHER ONLINE OR IN-PERSON",
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
        src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708526106/flower-removebg-preview_tnozjn.png"
        alt="charity"
      />
    ),
    title: "JOIN THE MOVEMENT TOWARDS SUSTAINABILITY BY REDUCING FOOD WASTAGE",
  },
];

export default function FeaturesCustomer() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Container
      id="features"
      sx={{ py: { xs: 8, sm: 16 }, backgroundColor: "#076365" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography
              component="h2"
              variant="h4"
              color="#FAFFF4"
              fontFamily={"open sans, sans-serif"}
              fontWeight={"1000"}
              fontSize={{ xs: "30px", md: "40px" }}
              style={{ textAlign: isMobile ? "center" : "inherit" }}
            >
              TURN WASTE {isMobile && <br />} TO TREASURE
            </Typography>
            <Typography
              variant="body1"
              color="#FAFFF4"
              sx={{
                mb: { xs: 2, sm: 4 },
                mt: { xs: 3, md: 4 },
                fontFamily: "nunito, sans-serif",
                textAlign: isMobile ? "center" : "inherit",
              }}
            >
              Leftover food at the close of the day? Join the multitude of
              businesses leveraging EdenFood to channel your excess directly to
              delighted customers, granting fresh foods a renewed chance to be savored.
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
                      color="#FAFFF4"
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
          md={6}
          sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
        >
          <AspectRatio
            sx={{ width: 450, marginLeft: isMobile ? 0 : 12 }}
            ratio="3/4"
          >
            <Box
              id="image"
              component="img"
              src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708523841/beth-macdonald-mjSWtq7k7k8-unsplash_umxidz.jpg"
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </AspectRatio>
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
              src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708523841/beth-macdonald-mjSWtq7k7k8-unsplash_umxidz.jpg"
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
