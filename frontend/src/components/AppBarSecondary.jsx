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
import { useAuth } from "../hooks/AuthProvider";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

function AppBarSecondary() {
  const [open, setOpen] = React.useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { sessionId } = useAuth();

  const navigateCheckout = () => {
    navigate("/checkout/" + sessionId);
  }

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

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/logOut");
      logout();
    } catch (error) {
      console.error("Error logging out:", error);
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
          bgcolor: "#FAFFF4",
          backgroundImage: "none",
          pb: 5,
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
                  src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708750197/Natural_Fresh_Food_Logo_uzq4gs.png"
                  alt="Eden Food Secondary Logo."
                />
              </a>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 0.5,
                  pt: 1,
                  alignItems: "center",
                }}
              >
                  <MenuItem
                    onClick={() => navigate("/profile")}
                    sx={{
                      py: "0px",
                      px: "12px",
                      fontFamily: "nunito, sans-serif",
                      color: "#FAFFF4",
                    }}
                  >
                    <Typography
                      color="#076365"
                      sx={{
                        fontFamily: "open sans, sans-serif",
                        fontWeight: "750",
                        fontSize: { xs: "0.9rem", md: "0.9rem" },
                        letterSpacing: "0.5px",
                        gap: { xs: "none", md: "10px" },
                        mt: { xs: 2, md: 7 },
                        pb: 4.4,
                      }}
                    >
                      PROFILE SETTINGS
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/orderhistory")}
                    sx={{
                      py: "0px",
                      px: "12px",
                      fontFamily: "nunito, sans-serif",
                    }}
                  >
                    <Typography
                      color="#076365"
                      sx={{
                        fontFamily: "open sans, sans-serif",
                        fontWeight: "750",
                        fontSize: { xs: "0.9rem", md: "0.9rem" },
                        letterSpacing: "0.5px",
                        gap: { xs: "none", md: "10px" },
                        mt: { xs: 2, md: 7 },
                        pb: 4.4,
                      }}
                    >
                      ORDER HISTORY
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/managelistings")}
                    sx={{
                      py: "0px",
                      px: "12px",
                      fontFamily: "nunito, sans-serif",
                    }}
                  >
                    <Typography
                      color="#076365"
                      sx={{
                        fontFamily: "open sans, sans-serif",
                        fontWeight: "750",
                        fontSize: { xs: "0.9rem", md: "0.9rem" },
                        letterSpacing: "0.5px",
                        gap: { xs: "none", md: "10px" },
                        mt: { xs: 2, md: 7 },
                        pb: 4.4,
                      }}
                    >
                      MANAGE LISTINGS
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/dashboard")}
                    sx={{
                      py: "0px",
                      px: "12px",
                      fontFamily: "nunito, sans-serif",
                    }}
                  >
                    <Typography
                      color="#076365"
                      sx={{
                        fontFamily: "open sans, sans-serif",
                        fontWeight: "750",
                        fontSize: { xs: "0.9rem", md: "0.9rem" },
                        letterSpacing: "0.5px",
                        gap: { xs: "none", md: "10px" },
                        mt: { xs: 2, md: 7 },
                        pb: 4.4,
                      }}
                    >
                      DASHBOARD
                    </Typography>
                  </MenuItem>
              </Box>
            </Box>
            <Button
              color="primary"
              variant="text"
              size="small"
              component="a"
              onClick={navigateCheckout}
              sx={{
                display: { xs: "none", md: "flex" },
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
              Checkout
            </Button>
            <Button
              color="primary"
              variant="text"
              size="small"
              component="a"
              onClick={handleLogout}
              sx={{
                display: { xs: "none", md: "flex" },
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
              Log Out
            </Button>

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
                  color: "#076365",
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
                        size="small"
                        component="a"
                        onClick={handleLogout}
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
                        Log Out
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

AppBarSecondary.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
};

export default AppBarSecondary;
