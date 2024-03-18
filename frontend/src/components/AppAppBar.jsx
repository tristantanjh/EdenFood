import * as React from "react";
import PropTypes from "prop-types";
import "../index.css";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import SettingsIcon from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { alpha } from "@mui/material";
import { Link } from "react-router-dom";

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
    <div
      style={{
        WebkitBoxShadow: "5px 5px 15px 5px #076365",
        color: "#076365",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "#076365",
          backgroundImage: "none",
          pb: 4.4,
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
              <a href="/">
                <Box
                  display={{ md: "flex" }}
                  id="image"
                  component="img"
                  sx={{
                    mt: { xs: 5, md: 4 },
                    ml: { xs: "-1vw", sm: "-3vw" },
                    mr: "1vw",
                    alignSelf: "flex-start",
                    height: { xs: 80, sm: 100 },
                    objectFit: "cover",
                  }}
                  src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708576163/Natural_Fresh_Food_Logo_1_n9mbxk.png"
                  alt="Eden Food Primary Logo."
                />
              </a>
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
                href="/register"
                sx={{
                  fontFamily: "nunito, sans-serif",
                  backgroundColor: "#64CF94",
                  color: "#FFF",
                  fontWeight: "700",
                  fontSize: "1rem",
                  width: "125px",
                  padding: "3px",
                  borderRadius: "999px",
                  minWidth: "70px",
                  "&:hover": {
                    backgroundColor: alpha("#64CF94", 0.6),
                    color: "#FFF",
                  },
                  mt: { xs: 2, md: 4 },
                  mr: 1,
                }}
              >
                Register
              </Button>
              <Button
                color="primary"
                variant="text"
                size="small"
                component="a"
                href="/login"
                sx={{
                  fontFamily: "nunito, sans-serif",
                  backgroundColor: "#64CF94",
                  color: "#FFF",
                  fontWeight: "700",
                  fontSize: "1rem",
                  width: "125px",
                  padding: "3px",
                  borderRadius: "999px",
                  minWidth: "70px",
                  "&:hover": {
                    backgroundColor: alpha("#64CF94", 0.6),
                    color: "#FFF",
                  },
                  mt: { xs: 2, md: 4 },
                }}
              >
                Log In
              </Button>
            </Box>
            <Box
              sx={{
                display: { sm: "", md: "none" },
                mt: "30px",
              }}
            >
              <Button
                color="primary"
                variant="text"
                component="a"
                href="/login"
                sx={{
                  fontFamily: "nunito, sans-serif",
                  backgroundColor: "#64CF94",
                  color: "#FFF",
                  fontWeight: "700",
                  fontSize: "1rem",
                  width: "135px",
                  padding: "5px",
                  borderRadius: "20px",
                  minWidth: "100px",
                  boxshadow: "none",
                  "&:hover": {
                    backgroundColor: alpha("#64CF94", 0.6),
                    color: "#FFF",
                    boxshadow: "none",
                  },
                }}
              >
                Log In
              </Button>
              {/* <Button
                variant="text"
                color="primary"
                size="large"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{
                  minWidth: "20px",
                  p: "4px",
                  color: "#FAFFF4",
                  "&:focus": { outline: "none" },
                }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  id="drawerContent"
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "#FAFFF4",
                    flexGrow: 1,
                    fontFamily: "nunito, sans-serif",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="text"
                        component="a"
                        href="/register"
                        sx={{
                          fontFamily: "nunito, sans-serif",
                          backgroundColor: "#64CF94",
                          color: "#FFF",
                          fontWeight: "700",
                          fontSize: "1rem",
                          width: "135px",
                          padding: "5px",
                          borderRadius: "20px",
                          minWidth: "100px",
                          boxshadow: "none",
                          "&:hover": {
                            backgroundColor: alpha("#64CF94", 0.6),
                            color: "#FFF",
                            boxshadow: "none",
                          },
                        }}
                      >
                        Register
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="text"
                        component="a"
                        href="/login"
                        sx={{
                          fontFamily: "nunito, sans-serif",
                          backgroundColor: "#64CF94",
                          color: "#FFF",
                          fontWeight: "700",
                          fontSize: "1rem",
                          width: "135px",
                          padding: "5px",
                          borderRadius: "20px",
                          minWidth: "100px",
                          "&:hover": {
                            backgroundColor: alpha("#64CF94", 0.6),
                            color: "#FFF",
                          },
                        }}
                      >
                        Log In
                      </Button>
                    </MenuItem>
                  </div>
                </Box>
              </Drawer> */}
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
