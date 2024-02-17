import * as React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AspectRatio from "@mui/joy/AspectRatio";

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        bgcolor: "#076365",
        height: { xs: "100%", md: "100vh" },
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
        <Stack spacing={3} useFlexGap sx={{ width: { xs: "80%", sm: "70%" } }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              justifyContent: "center",
              color: (theme) => "#FFF",
              fontFamily: "open sans, sans-serif",
              fontWeight: "800",
              fontSize: { xs: "2rem", md: "2rem" },
              letterSpacing: "0.5px",
              gap: {xs: "none", md: "10px"},
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
                fontSize: { xs: "2rem", md: "2.1rem" },
                paddingTop: {xs: "10px", md: "4px"},
              }}
            >
              Food Waste
            </Typography>
              TOGETHER
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{
              color: (theme) => "#FFF",
              fontFamily: "nunito, sans-serif",
              fontSize: "1.1rem",
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
            sx={{ width: { xs: "auto", sm: "auto" } }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: "999px",
                backgroundColor: "#64CF94", // Custom background color
                color: "#FFF", // Custom text color
                fontFamily: "nunito, sans-serif",
                fontWeight: "700",
                fontSize: "1rem",
                width: "170px",
                padding: "10px",
                boxShadow: "0px",
                "&:hover": {
                  backgroundColor: alpha("#64CF94", 0.8),
                },
              }}
            >
              Start now
            </Button>
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
            src="https://lh3.googleusercontent.com/drive-viewer/AEYmBYSrCo4RnSHcgopyh_hX0NOpDnALJu8D3n1_xOisblt85QQ04lyaL6GZT6ZxYhc4yY-t_dc0_pXEQcM8TVB8Q0G0SpXfDw=s1600"
            alt="Picture of farmer walking in field."
          />
        </AspectRatio>
        </Box>
        
      </Container>
    </Box>
  );
}
