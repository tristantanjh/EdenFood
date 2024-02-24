import * as React from "react";
import PropTypes from "prop-types";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";

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

export default function ItemDescriptionTab() {
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
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 6, sm: 12 },
        }}
      >
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", borderWidth: "2px" }}
        >
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab
              label="Description"
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
              label="Instructions"
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
              label="Recipes"
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "left",
            }}
          >
            <List sx={{ listStyleType: "disc" }}>
              <ListItem sx={{ display: "list-item" }}>
                <Typography
                  display="inline"
                  sx={{
                    fontFamily: "nunito, sans-serif",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Fresh
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <Typography
                  display="inline"
                  sx={{
                    fontFamily: "nunito, sans-serif",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Boneless
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <Typography
                  display="inline"
                  sx={{
                    fontFamily: "nunito, sans-serif",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Marinated
                </Typography>
              </ListItem>
            </List>
            <Typography
              display="inline"
              sx={{ fontFamily: "nunito, sans-serif", fontSize: "1rem" }}
            >
              Milkfish, scientifically known as Chanos chanos, is a popular
              saltwater fish species prized for its mild, tender flesh and
              versatility in cooking. Native to the Indian and Pacific Oceans,
              milkfish are characterized by their sleek, silvery bodies and
              forked tails.
            </Typography>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          Item Three
        </CustomTabPanel>
      </Container>
    </Box>
  );
}
