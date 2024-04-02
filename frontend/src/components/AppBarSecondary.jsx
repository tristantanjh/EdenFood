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
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCart from "./shoppingCartpage/shoppingCart";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

function AppBarSecondary() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const { logout } = useAuth();
  const { user } = useAuth();
  const profilePic = user.profilePic;
  const cartNum = user?.cart?.items?.size() || 0;
  const navigate = useNavigate();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const toggleCartDrawer = (newOpen) => () => {
    setCartOpen(newOpen);
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
              paddingRight: 0,
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
                    height: { xs: 70, sm: 100 },
                    objectFit: "cover",
                  }}
                  src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708750197/Natural_Fresh_Food_Logo_uzq4gs.png"
                  alt="Eden Food Secondary Logo."
                />
              </a>
            </Box>
            <Box
              sx={{
                mt: "30px",
                mr: { xs: "-1rem", md: "-3rem" },
              }}
            >
              <IconButton
                onClick={toggleCartDrawer(true)}
                aria-label="cart"
                sx={{ marginRight: { xs: "8px", sm: "15px" } }}
              >
                <StyledBadge badgeContent={cartNum} color="error">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
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
                <Box sx={{ flexGrow: 1 }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "16px",
                      backgroundColor: "#FAFFF4",
                      p: "4px",
                      height: { xs: "38px", sm: "50px" },
                      width: { xs: "70px", sm: "100px" },
                      maxWidth: "100px",
                      marginLeft: "auto",
                    }}
                  >
                    <Box
                      sx={{
                        mt: 1,
                        mr: { xs: "3px", sm: "7px" },
                      }}
                    >
                      <MenuIcon fontSize="small" />
                    </Box>

                    <Avatar
                      alt="Profile Image"
                      src={profilePic}
                      sx={{
                        width: { xs: 24, sm: 28, md: 32 },
                        height: { xs: 24, sm: 28, md: 32 },
                        ml: { xs: "3px", sm: "7px" },
                      }}
                    />
                  </Paper>
                </Box>
              </Button>
              <Drawer
                anchor="right"
                open={cartOpen}
                onClose={toggleCartDrawer(false)}
              >
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
                  <ShoppingCart setCartOpen={setCartOpen} />
                </Box>
              </Drawer>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
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
                    onClick={() => navigate("/profile")}
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
                    onClick={() => navigate("/profile")}
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
                    onClick={() => navigate("/orderhistory")}
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
                    INSIGHTS
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
