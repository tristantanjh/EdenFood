import * as React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        bgcolor: "#076365",
        height: "100vh",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
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
              fontSize: { xs: "2rem", md: "3.5rem" },
              letterSpacing: '0.5px',
            }}
          >
            LET'S FIGHT&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) => "#FDF3A7",
                fontFamily: "gluten, sans-serif",
                fontWeight: "900",
                fontSize: { xs: "2rem", md: "3.5rem" },
                paddingTop: '10px',
              }}
            >
              Food Waste
            </Typography>
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
                fontSize: { xs: "2rem", md: "3.5rem" },
                letterSpacing: '0.5px',
              }}
            >
              TOGETHER
            </Typography>
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
            sustainable produce.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your email address"
              inputProps={{
                autocomplete: "off",
                ariaLabel: "Enter your email address",
              }}
            />
            <Button variant="contained" color="primary">
              Start now
            </Button>
          </Stack>
          <Typography
            variant="caption"
            textAlign="center"
            sx={{ opacity: 0.8 }}
          >
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
        <Box
          id="image"
          sx={(theme) => ({
            display: { xs: "none", md: "" },
            mt: { xs: 8, sm: 10 },
            alignSelf: "center",
            height: { xs: 200, sm: 700 },
            width: "100%",
            backgroundImage:
              theme.palette.mode === "light"
                ? 'url("/static/images/templates/templates-images/hero-light.png")'
                : 'url("/static/images/templates/templates-images/hero-dark.png")',
            backgroundSize: "cover",
            borderRadius: "10px",
            outline: "1px solid",
            outlineColor:
              theme.palette.mode === "light"
                ? alpha("#BFCCD9", 0.5)
                : alpha("#9CCCFC", 0.1),
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
          })}
        />
      </Container>
    </Box>
  );
}
