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
      sx={{
        boxShadow: 5,
        color: "#076365",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "#076365",
          backgroundImage: "none",
          pb: 2.5,
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
                    ml: { xs: "-5vw", md: "-5vw" },
                    alignSelf: "flex-start",
                    height: { xs: 130, sm: 170 },
                    objectFit: "cover",
                  }}
                  src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708587495/2_xzanz3.png"
                  alt="Eden Food Primary Logo."
                />
              </a>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                }}
              >
                <MenuItem
                  onClick={() => scrollToSection("features")}
                  sx={{
                    py: "6px",
                    px: "12px",
                    fontFamily: "nunito, sans-serif",
                    color: "#FAFFF4",
                  }}
                >
                  <Typography
                    variant="nunito, sans-serif"
                    color="#FAFFF4"
                    sx={{
                      fontFamily: "open sans, sans-serif",
                      fontWeight: "750",
                      fontSize: { xs: "0.9rem", md: "0.9rem" },
                      letterSpacing: "0.5px",
                      gap: { xs: "none", md: "10px" },
                      mt: { xs: 2, md: 6 },
                      pb: 3,
                    }}
                  >
                    PROFILE SETTINGS
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
                  <Typography
                    variant="nunito, sans-serif"
                    color="#FAFFF4"
                    sx={{
                      fontFamily: "open sans, sans-serif",
                      fontWeight: "750",
                      fontSize: { xs: "0.9rem", md: "0.9rem" },
                      letterSpacing: "0.5px",
                      gap: { xs: "none", md: "10px" },
                      mt: { xs: 2, md: 6 },
                      pb: 3,
                    }}
                  >
                    ORDER HISTORY
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
                  <Typography
                    variant="nunito, sans-serif"
                    color="#FAFFF4"
                    sx={{
                      fontFamily: "open sans, sans-serif",
                      fontWeight: "750",
                      fontSize: { xs: "0.9rem", md: "0.9rem" },
                      letterSpacing: "0.5px",
                      gap: { xs: "none", md: "10px" },
                      mt: { xs: 2, md: 6 },
                      pb: 3,
                    }}
                  >
                    MANAGE LISTINGS
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
                  <Typography
                    variant="nunito, sans-serif"
                    color="#FAFFF4"
                    sx={{
                      fontFamily: "open sans, sans-serif",
                      fontWeight: "750",
                      fontSize: { xs: "0.9rem", md: "0.9rem" },
                      letterSpacing: "0.5px",
                      gap: { xs: "none", md: "10px" },
                      mt: { xs: 2, md: 6 },
                      pb: 3,
                    }}
                  >
                    DASHBOARD
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
                  <Typography
                    variant="nunito, sans-serif"
                    color="#FAFFF4"
                    sx={{
                      fontFamily: "open sans, sans-serif",
                      fontWeight: "750",
                      fontSize: { xs: "0.9rem", md: "0.9rem" },
                      letterSpacing: "0.5px",
                      gap: { xs: "none", md: "10px" },
                      mt: { xs: 2, md: 6 },
                      pb: 3,
                    }}
                  >
                    LOGOUT
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
                sx={{
                  width: "100%",
                  fontFamily: "nunito, sans-serif",
                  backgroundColor: "#64CF94",
                  color: "#FFF",
                  fontFamily: "nunito, sans-serif",
                  fontWeight: "700",
                  fontSize: "1rem",
                  width: "125px",
                  padding: "3px",
                  borderRadius: "15px",
                  minWidth: "70px",
                  "&:hover": {
                    backgroundColor: alpha("#64CF94", 0.6),
                    color: "#FFF",
                  },
                  mt: { xs: 2, md: 3 },
                }}
              >
                Register
              </Button>
              <Button
                color="primary"
                variant="text"
                size="small"
                component="a"
                href="/material-ui/getting-started/templates/sign-up/"
                target="_blank"
                sx={{
                  width: "100%",
                  fontFamily: "nunito, sans-serif",
                  backgroundColor: "#64CF94",
                  color: "#FFF",
                  fontFamily: "nunito, sans-serif",
                  fontWeight: "700",
                  fontSize: "1rem",
                  width: "125px",
                  padding: "3px",
                  borderRadius: "15px",
                  minWidth: "70px",
                  "&:hover": {
                    backgroundColor: alpha("#64CF94", 0.6),
                    color: "#FFF",
                  },
                  mt: { xs: 2, md: 3 },
                }}
              >
                Log In
              </Button>
            </Box>
            <Box
              sx={{
                display: { sm: "", md: "none" },
                mt: "15px",
              }}
            >
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{
                  minWidth: "20px",
                  p: "4px",
                  color: "#FAFFF4",
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
                    color="#076365"
                    sx={{
                      fontFamily: "open sans, sans-serif",
                      fontWeight: "750",
                      fontSize: { xs: "0.9rem", md: "0.9rem" },
                      letterSpacing: "0.5px",
                      gap: { xs: "none", md: "10px" },
                      color: (theme) => "#076365",
                    }}
                  >
                    <ListItemIcon>
                      <img
                        src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708483826/user_zv61ah.png"
                        alt="Profile Icon"
                        style={{ width: "25px", height: "25px" }}
                      />
                    </ListItemIcon>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderWidth: "1.1px",
                        mr: "-2px",
                        mr: "15px",
                      }}
                    />
                    PROFILE SETTINGS
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection("testimonials")}
                    sx={{
                      fontFamily: "open sans, sans-serif",
                      fontWeight: "750",
                      fontSize: { xs: "0.9rem", md: "0.9rem" },
                      letterSpacing: "0.5px",
                      gap: { xs: "none", md: "10px" },
                      color: (theme) => "#076365",
                    }}
                  >
                    <ListItemIcon>
                      <img
                        src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708483824/to-do-list_taukoy.png"
                        alt="Order History Icon"
                        style={{ width: "25px", height: "25px" }}
                      />
                    </ListItemIcon>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderWidth: "1.1px",
                        mr: "-2px",
                        mr: "15px",
                      }}
                    />
                    ORDER HISTORY
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection("highlights")}
                    sx={{
                      fontFamily: "open sans, sans-serif",
                      fontWeight: "750",
                      fontSize: { xs: "0.9rem", md: "0.9rem" },
                      letterSpacing: "0.5px",
                      gap: { xs: "none", md: "10px" },
                      color: (theme) => "#076365",
                    }}
                  >
                    <ListItemIcon
                      style={{ color: "#076365", marginLeft: "-3px" }}
                    >
                      <SettingsIcon style={{ width: "30px", height: "30px" }} />
                    </ListItemIcon>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderWidth: "1.1px",
                        marginLeft: "3px",
                        mr: "1px",
                        mr: "15px",
                      }}
                    />
                    MANAGE LISTINGS
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection("pricing")}
                    sx={{
                      fontFamily: "open sans, sans-serif",
                      fontWeight: "750",
                      fontSize: { xs: "0.9rem", md: "0.9rem" },
                      letterSpacing: "0.5px",
                      gap: { xs: "none", md: "10px" },
                      color: (theme) => "#076365",
                    }}
                  >
                    <ListItemIcon>
                      <img
                        src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708483825/dashboard_uncrnk.png"
                        alt="Dashboard Icon"
                        style={{ width: "25px", height: "25px" }}
                      />
                    </ListItemIcon>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderWidth: "1.1px",
                        mr: "-2px",
                        mr: "15px",
                      }}
                    />
                    DASHBOARD
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection("faq")}
                    sx={{
                      fontFamily: "open sans, sans-serif",
                      fontWeight: "750",
                      fontSize: { xs: "0.9rem", md: "0.9rem" },
                      letterSpacing: "0.5px",
                      gap: { xs: "none", md: "10px" },
                      color: (theme) => "#076365",
                    }}
                  >
                    <ListItemIcon>
                      <img
                        src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708483824/logout_xxldjy.png"
                        alt="Logout Icon"
                        style={{ width: "25px", height: "25px" }}
                      />
                    </ListItemIcon>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderWidth: "1.1px",
                        mr: "-2px",
                        mr: "15px",
                      }}
                    />
                    LOGOUT
                  </MenuItem>
                  <Divider />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="text"
                        component="a"
                        href="/material-ui/getting-started/templates/sign-up/"
                        target="_blank"
                        sx={{
                          width: "100%",
                          fontFamily: "nunito, sans-serif",
                          backgroundColor: "#64CF94",
                          color: "#FFF",
                          fontFamily: "nunito, sans-serif",
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
                        href="/material-ui/getting-started/templates/sign-in/"
                        target="_blank"
                        sx={{
                          width: "100%",
                          fontFamily: "nunito, sans-serif",
                          backgroundColor: "#64CF94",
                          color: "#FFF",
                          fontFamily: "nunito, sans-serif",
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
