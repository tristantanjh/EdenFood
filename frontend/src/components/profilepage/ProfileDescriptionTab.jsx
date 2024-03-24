import * as React from "react";
import PropTypes from "prop-types";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
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

const items = [
  {
    itemImageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
    itemName: "Norwegian Salmon (100g)",
    itemFreshness: "3",
    itemPrice: "5.95",
    itemRating: "3",
  },
  {
    itemImageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
    itemName: "British Salmon (100g)",
    itemFreshness: "2",
    itemPrice: "10.95",
    itemRating: "5",
  },
  {
    itemImageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
    itemName: "Singapore Salmon (100g)",
    itemFreshness: "5",
    itemPrice: "15.95",
    itemRating: "2",
  },
  {
    itemImageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
    itemName: "African Salmon (100g)",
    itemFreshness: "3",
    itemPrice: "0.95",
    itemRating: "1",
  },
  {
    itemImageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
    itemName: "Norwegian Salmon (100g)",
    itemFreshness: "3",
    itemPrice: "5.95",
    itemRating: "3",
  },
  {
    itemImageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
    itemName: "British Salmon (100g)",
    itemFreshness: "2",
    itemPrice: "10.95",
    itemRating: "5",
  },
  {
    itemImageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
    itemName: "Singapore Salmon (100g)",
    itemFreshness: "5",
    itemPrice: "15.95",
    itemRating: "2",
  },
  {
    itemImageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
    itemName: "African Salmon (100g)",
    itemFreshness: "3",
    itemPrice: "0.95",
    itemRating: "1",
  },
  {
    itemImageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1710778183/broccoli_xxtddq.jpg",
    itemName: "Malaysian Broccoli (50g)",
    itemFreshness: "3",
    itemPrice: "5.95",
    itemRating: "3",
  },
  {
    itemImageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1710778183/broccoli_xxtddq.jpg",
    itemName: "Thailand Broccoli (100g)",
    itemFreshness: "7",
    itemPrice: "7.95",
    itemRating: "5",
  },
  {
    itemImageURL:
      "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1710778183/broccoli_xxtddq.jpg",
    itemName: "Malaysian Broccoli (50g)",
    itemFreshness: "3",
    itemPrice: "5.95",
    itemRating: "3",
  },
];

const orders = [
  {
    orderID: "123456",
    orderTotal: "5.95",
    orderDate: "10/10/2021",
    orderSeller: "Seller 1",
    orderStatus: "Completed",
    orderItems: [
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
        itemName: "Norwegian Salmon (100g)",
        itemQuantity: "3",
      },
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
        itemName: "British Salmon (100g)",
        itemQuantity: "3",
      },
    ],
  },
  {
    orderID: "123457",
    orderTotal: "6.95",
    orderDate: "10/10/2022",
    orderSeller: "Seller 2",
    orderStatus: "To Collect",
    orderItems: [
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
        itemName: "Singapore Salmon (100g)",
        itemQuantity: "3",
      },
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
        itemName: "African Salmon (100g)",
        itemQuantity: "3",
      },
      {
        itemImageURL:
          "https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708579937/ca-creative-kC9KUtSiflw-unsplash_bzryh1.jpg",
        itemName: "Norwegian Salmon (100g)",
        itemQuantity: "3",
      },
    ],
  },
];

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

export default function ProfileDescriptionTab() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          alignItems: "center",
          justifyContent: "center",
          pt: { xs: 4, md: 4 },
          //   pb: { xs: 6, sm: 12 },
        }}
      >
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", borderWidth: "2px" }}
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
              label="Insights"
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
        <CustomTabPanel value={value} index={0}>
          <Container
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "column" },
              alignItems: "center",
              justifyContent: "center",
              pb: { xs: 6, sm: 12 },
            }}
          >
            <div
              style={{
                marginRight: "auto",
                marginBottom: "1rem",
              }}
            >
              <Box
                sx={{
                  alignItems: "flex-start",
                  pb: isMobile ? 1 : 2,
                  ml: isMobile ? "18%" : "3%",
                }}
              >
                <Button
                  sx={{
                    backgroundColor: "#64CF94",
                    borderColor: "#64CF94",
                    color: "#FFFFFF",
                    borderRadius: 15,
                    fontSize: isMobile ? 10 : 15,
                    width: isMobile ? 90 : 150,
                  }}
                >
                  Add New <AddIcon sx={{ ml: isMobile ? 0.5 : 1 }} />
                </Button>
              </Box>
              <Grid container spacing={isMobile ? 1 : 1}>
                {items.map((item, index) => (
                  <Grid item container justifyContent="center" xs md>
                    <ItemCard key={index} {...item} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Container>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {orders.map((order, index) => (
            <OrderCard key={index} {...order} />
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          Item Three
        </CustomTabPanel>
      </Container>
    </Box>
  );
}
