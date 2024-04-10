import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import ItemCard from "./ItemCard";
import OrderCard from "./OrderCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import axios from "axios";
import BuyerReview from "./BuyerReview.jsx";
import OrderHistoryOrder from "../orderhistory/OrderHistoryOrder";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Tab = styled(MuiTab)({
  "&.Mui-selected, &.Mui-selected:hover": {
    fontWeight: "bold",
    color: "#000000",
  },
});

const Tabs = styled(MuiTabs)({
  ".css-1aquho2-MuiTabs-indicator": {
    backgroundColor: "#076365",
  },
});

function getFreshness(freshness, createdDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const created = new Date(createdDate);
  const diffTime = Math.abs(today - created);
  console.log(diffTime);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return parseInt(freshness) - diffDays;
}

const Accordion = styled(MuiAccordion)({
  "&.Mui-expanded": {
    margin: "0",
  },
  "&.MuiAccordion-root": {
    width: "100%",
  },
  ".css-15v22id-MuiAccordionDetails-root": {
    padding: "0",
  },
});

export default function ProfileDescriptionTab(props) {
  const theme = useTheme();
  const user = props.user;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState(0);
  const [listings, setListings] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const today = new Date();
  const [expanded, setExpanded] = React.useState("panel0");
  today.setHours(0, 0, 0, 0);

  const activeListings = listings.filter(
    (listing) => getFreshness(listing.freshness, listing.createdAt) >= 0
  );
  const inactiveListings = listings.filter(
    (listing) => getFreshness(listing.freshness, listing.createdAt) < 0
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/getListingsByUserId", {
        params: { userId: user.id },
      })
      .then((res) => {
        if (res.data.groceries) {
          setListings(res.data.groceries);
        } else {
          setListings([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:3000/getOrdersWithUserId", {
        params: { userId: user.id },
      })
      .then((res) => {
        console.log(res.data.orders);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePanel = (panel) => (event, newExpanded) => {
    console.log(panel);
    console.log(newExpanded);
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        bgcolor: "#FAFFF4",
        height: { xs: "100%", md: "100%" },
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column" },
          // alignItems: "center",
          // justifyContent: "flex-start",
          pt: { xs: 4, md: 4 },
          //   pb: { xs: 6, sm: 12 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            borderBottom: 1,
            borderColor: "divider",
            borderWidth: "2px",
          }}
        >
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab
              label="Listings"
              {...a11yProps(0)}
              sx={{
                fontFamily: "nunito, sans-serif",
                textTransform: "none",
                fontSize: "1rem",
                btn: {
                  "&:hover": {
                    borderColor: "none",
                  },
                },
              }}
            />
            <Divider
              orientation="vertical"
              style={{ height: 30, alignSelf: "center" }}
            />
            <Tab
              label="Order History"
              {...a11yProps(2)}
              sx={{
                fontFamily: "nunito, sans-serif",
                textTransform: "none",
                fontSize: "1rem",
                btn: {
                  "&:hover": {
                    borderColor: "none",
                  },
                },
              }}
            />
            <Divider
              orientation="vertical"
              style={{ height: 30, alignSelf: "center" }}
            />
            <Tab
              label="Reviews"
              {...a11yProps(4)}
              sx={{
                fontFamily: "nunito, sans-serif",
                textTransform: "none",
                fontSize: "1rem",
                btn: {
                  "&:hover": {
                    borderColor: "none",
                  },
                },
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} sx={{ width: "100%" }}>
          {/* <Container
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "column" },
              // alignItems: "center",
              // justifyContent: "flex-start",
              pb: { xs: 6, sm: 12 },
            }}
          > */}
          {/* <div
              style={{
                marginRight: "auto",
                // marginBottom: "1rem",
              }}
            > */}
          {/* <Box
              sx={{
                // alignItems: "flex-start",
                pb: isMobile ? 1 : 2,
                // ml: isMobile ? "18%" : "3%",
              }}
            > */}

          {/* </Box> */}
          <Grid
            container
            // sx={{ ml: isMobile ? 0 : 3 }}
            spacing={isMobile ? 1 : 1}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "column" },
              // alignItems: "center",
              // justifyContent: "flex-start",
              pb: { xs: 6, sm: 12 },
              ml: isMobile ? 0 : 3,
            }}
          >
            <Link to="/addListing">
              <Button
                sx={{
                  backgroundColor: "#64CF94",
                  borderColor: "#64CF94",
                  color: "#FFFFFF",
                  borderRadius: 15,
                  fontSize: isMobile ? 10 : 15,
                  width: isMobile ? 150 : 200,
                  mb: "1rem",
                }}
              >
                Add New Listing <AddIcon sx={{ ml: isMobile ? 10 / 100 : 1 }} />
              </Button>
            </Link>
            <div
              style={{
                marginRight: "auto",
                marginBottom: "1rem",
                maxHeight: isMobile ? "43vh" : "60vh",
                overflow: "auto",
              }}
            >
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "800",
                  // m: "0 auto 1rem .5rem",
                  fontFamily: "nunito, sans-serif",
                }}
              >
                Active Listings
              </Typography>
              {activeListings.length > 0 ? (
                <Grid container spacing={isMobile ? 1 : 1}>
                  {activeListings.map((listing, index) => (
                    <Grid item container xs md key={index}>
                      <ItemCard
                        imageURL={listing.imageURL}
                        name={listing.name}
                        freshness={getFreshness(
                          listing.freshness,
                          listing.createdAt
                        )}
                        price={listing.price}
                        id={listing._id}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box
                  id="image"
                  component="img"
                  fullWidth
                  sx={{
                    height: "250px",
                    width: "auto",
                    maxWidth: "425px",
                    objectFit: "contain",
                    mt: "3rem",
                  }}
                  src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1712733794/active_a7efbk.png"
                  alt="Uploaded Profile Picture"
                />
              )}
            </div>
          </Grid>
          <Grid
            container
            sx={{ ml: isMobile ? 0 : 3 }}
            spacing={isMobile ? 1 : 1}
          >
            <div
              style={{
                marginRight: "auto",
                marginBottom: "1rem",
                maxHeight: isMobile ? "43vh" : "60vh",
                overflow: "auto",
              }}
            >
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "800",
                  // m: "0 auto 1rem .5rem",
                  fontFamily: "nunito, sans-serif",
                }}
              >
                Inactive Listings
              </Typography>
              {inactiveListings.length > 0 ? (
                <Grid container spacing={isMobile ? 1 : 1}>
                  {inactiveListings.map((listing, index) => (
                    <Grid item container xs md key={index}>
                      <ItemCard
                        imageURL={listing.imageURL}
                        name={listing.name}
                        freshness={getFreshness(
                          listing.freshness,
                          listing.createdAt
                        )}
                        price={listing.price}
                        id={listing._id}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box
                  id="image"
                  component="img"
                  fullWidth
                  sx={{
                    height: "250px",
                    width: "auto",
                    maxWidth: "425px",
                    objectFit: "contain",
                    mt: "3rem",
                  }}
                  src="https://res.cloudinary.com/dhdnzfgm8/image/upload/v1712733793/inactive_utb64c.png"
                  alt="Uploaded Profile Picture"
                />
              )}
            </div>
          </Grid>
          {/* </div> */}
          {/* </Container> */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {orders.map((order, index) => (
            <Accordion
              expanded={expanded === "panel" + index}
              onChange={handlePanel("panel" + index)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#FFF" }} />}
                sx={{ backgroundColor: "#076365" }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "18px" },
                    fontWeight: "bold",
                    mr: { xs: "40px", md: "auto" },
                    color: "#FFF",
                  }}
                >
                  No: {index + 1}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "18px" },
                    fontWeight: "bold",
                    ml: "auto",
                    mr: { xs: ".2rem", md: "18px" },
                    color: "#FFF",
                  }}
                >
                  Date: {order.createdAt.substring(0, 10).replace(/-/g, "/")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <OrderHistoryOrder key={index} {...order} />
              </AccordionDetails>
            </Accordion>
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <BuyerReview buyerId={user.id} />
        </CustomTabPanel>
      </Container>
    </Box>
  );
}
