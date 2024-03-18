import * as React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import CustomButton from "../common/CustomButton";

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        bgcolor: "#076365",
        height: { xs: "100%", md: "100%" },
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          pt: { xs: 14, sm: 16 },
          pb: { xs: 6, sm: 12 },
        }}
      >
        <Stack spacing={3} useFlexGap sx={{ width: { xs: "80%", sm: "70%" } }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: "flex-start",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: { xs: "center", md: "left" },
              textAlign: { xs: "center", md: "left" },
              justifyContent: { xs: "center", md: "left" },
              color: (theme) => "#FFF",
              fontFamily: "open sans, sans-serif",
              fontWeight: "800",
              fontSize: { xs: "2rem", md: "3rem" },
              letterSpacing: "0.5px",
              gap: { xs: "none", md: "10px" },
              lineHeight: "1.3",
            }}
          >
            LET'S FIGHT
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) => "#FDF3A7",
                fontFamily: "gluten, sans-serif",
                fontWeight: "900",
                fontSize: { xs: "2.3rem", md: "3rem" },
                paddingTop: { xs: "10px", md: "4px" },
              }}
            >
              {" "}
              Food Waste{" "}
            </Typography>
            TOGETHER FOR OUR
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) => "#FDF3A7",
                fontFamily: "gluten, sans-serif",
                fontWeight: "900",
                fontSize: { xs: "2.3rem", md: "3rem" },
                paddingTop: { xs: "10px", md: "0px" },
              }}
            >
              {" "}
              Environment{" "}
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => "#FFF",
              fontFamily: "nunito, sans-serif",
              fontSize: { xs: "1rem", md: "1.3rem" },
              alignSelf: { xs: "center", md: "left" },
              textAlign: { xs: "center", md: "left" },
              justifyContent: { xs: "center", md: "left" },
            }}
          >
            Join us in reducing food waste while enjoying delicious, fresh, and
            sustainable produce. Together, we can make a difference.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            justifyContent="center"
            alignItems="center"
            sx={{
              width: { xs: "auto", sm: "auto" },
              mt: { xs: 0.8, md: 2 },
            }}
          >
            <Link to="/register">
              <CustomButton
                sx={{
                  borderRadius: "999px",
                  borderBlockColor: "transparent",
                  backgroundColor: "#64CF94", // Custom background color
                  color: "#FFF", // Custom text color
                  fontFamily: "nunito, sans-serif",
                  fontWeight: "700",
                  fontSize: "1.15rem",
                  width: "190px",
                  padding: "8px 18px",
                  boxShadow: "0px",
                  "&:hover": {
                    backgroundColor: alpha("#64CF94", 0.8),
                  },
                  "&:focus": { outline: "none" },
                }}
              >
                Order Now
              </CustomButton>
            </Link>
          </Stack>
        </Stack>
        <Box sx={{ padding: 4 }} display={{ xs: "none", md: "flex" }}>
          <AspectRatio sx={{ width: 450 }} ratio="3/4">
            <Box
              id="image"
              component="img"
              sx={{
                alignSelf: "center",
                objectFit: "cover",
              }}
              src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708481080/pexels-photo-3098891_gxc029.jpg"
              alt="Picture of market."
            />
          </AspectRatio>
        </Box>
      </Container>
    </Box>
  );
}
