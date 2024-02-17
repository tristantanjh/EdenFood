import * as React from "react";
import PropTypes from "prop-types";
import "../index.css";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              maxHeight: 40,
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Box
                display={{ md: "flex" }}
                id="image"
                component="img"
                sx={{
                  mt: { xs: 0, md: 0 },
                  ml: { xs: "-5vw", md: "-5vw" },
                  alignSelf: "flex-start",
                  height: { xs: 140, sm: 170 },
                  objectFit: "cover",
                }}
                src="https://lh3.googleusercontent.com/drive-viewer/AEYmBYTsWGRDr8tJmhgQrP_G40atBmlur9_qmMuW_lr64Q0zLJYERNumDobrqvYHIL1-k6HV9DVhBzZt-BRAGew-di0zNnzZdA=s2560"
                alt="Eden Food Secondary Logo."
              />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem
                  onClick={() => scrollToSection("features")}
                  sx={{
                    py: "6px",
                    px: "12px",
                    fontFamily: "nunito, sans-serif",
                    color: "#FAFFF4",
                  }}
                >
                  <Typography variant="nunito, sans-serif" color="#FAFFF4">
                    Profile Settings
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("testimonials")}
                  sx={{
                    py: "6px",
                    px: "12px",
                    fontFamily: "nunito, sans-serif",
                  }}
                >
                  <Typography variant="nunito, sans-serif" color="#FAFFF4">
                    Order History
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("highlights")}
                  sx={{
                    py: "6px",
                    px: "12px",
                    fontFamily: "nunito, sans-serif",
                  }}
                >
                  <Typography variant="nunito, sans-serif" color="#FAFFF4">
                    Manage Listings
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("pricing")}
                  sx={{
                    py: "6px",
                    px: "12px",
                    fontFamily: "nunito, sans-serif",
                  }}
                >
                  <Typography variant="nunito, sans-serif" color="#FAFFF4">
                    Dashboard
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("faq")}
                  sx={{
                    py: "6px",
                    px: "12px",
                    fontFamily: "nunito, sans-serif",
                  }}
                >
                  <Typography variant="nunito, sans-serif" color="#FAFFF4">
                    Logout
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <Button
                color="primary"
                variant="text"
                size="small"
                component="a"
                href="/material-ui/getting-started/templates/sign-in/"
                target="_blank"
              >
                Sign in
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                href="/material-ui/getting-started/templates/sign-up/"
                target="_blank"
              >
                Sign up
              </Button>
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px", color: "#FAFFF4" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "#FAFFF4",
                    flexGrow: 1,
                    fontFamily: "nunito, sans-serif",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                      fontFamily: "nunito, sans-serif",
                    }}
                  ></Box>
                  <MenuItem
                    onClick={() => scrollToSection("features")}
                    sx={{ fontFamily: "nunito, sans-serif" }}
                  >
                    Profile Settings
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection("testimonials")}
                    sx={{ fontFamily: "nunito, sans-serif" }}
                  >
                    Order History
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection("highlights")}
                    sx={{ fontFamily: "nunito, sans-serif" }}
                  >
                    Manage Listings
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection("pricing")}
                    sx={{ fontFamily: "nunito, sans-serif" }}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection("faq")}
                    sx={{ fontFamily: "nunito, sans-serif" }}
                  >
                    Logout
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-up/"
                      target="_blank"
                      sx={{
                        width: "100%",
                        fontFamily: "nunito, sans-serif",
                        backgroundColor: "#64CF94",
                      }}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-in/"
                      target="_blank"
                      sx={{
                        width: "100%",
                        fontFamily: "nunito, sans-serif",
                      }}
                    >
                      Sign in
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
};

export default AppAppBar;
