import * as React from "react";
import PropTypes from "prop-types";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

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

export default function ListingDescriptionTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box
        sx={{
          mt: "5%",
          borderBottom: 1,
          borderColor: "divider",
          borderWidth: "2px",
        }}
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
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            id="standard-multiline-static"
            multiline
            rows={6}
            placeholder="(Insert Item Description here)"
            sx={{ width: "140%", margin: "0.3%" }}
          />
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            id="standard-multiline-static"
            multiline
            rows={6}
            placeholder="(Insert Instructions here)"
            sx={{ width: "140%", margin: "0.3%" }}
          />
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
      <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            id="standard-multiline-static"
            multiline
            rows={6}
            placeholder="(Insert Recipes here)"
            sx={{ width: "140%", margin: "0.3%" }}
          />
        </Container>
      </CustomTabPanel>
    </div>
  );
}
