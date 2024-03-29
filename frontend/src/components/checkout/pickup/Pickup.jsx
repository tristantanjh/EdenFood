import React, { useEffect, useState } from "react";
import { useCheckout } from "../../../hooks/CheckoutProvider";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  Snackbar,
  SnackbarContent,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/AuthProvider";

const regions = ["North", "Northeast", "East", "West", "Central"];
const pickupLocations = [
  {
    region: "North",
    locations: [
      "102 YISHUN AVE 5, S760102",
      "268 WOODLANDS CENTRE ROAD, S738931",
      "678A WOODLANDS AVENUE 6, S731678",
    ],
  },
  {
    region: "Northeast",
    locations: [
      "15 HOUGANG AVENUE 3, S538840",
      "10 HOUGANG AVENUE 7, S530010",
      "546 SERANGOON ROAD, S218168",
    ],
  },
  {
    region: "East",
    locations: [
      "Blk 22 EUNOS CRESCENT, S400022",
      "204 BEDOK NORTH STREET 1, S460204",
      "449 TAMPINES STREET 42, S520449",
    ],
  },
  {
    region: "West",
    locations: [
      "2 JURONG EAST, S609601",
      "272B JURONG WEST STREET 24, S642272",
      "HILLVIEW INDUSTRIAL ESTATE 40, S669248",
    ],
  },
  {
    region: "Central",
    locations: [
      "218 ORCHARD ROAD, S238851",
      "137 TELOK AYER ST, S068602",
      "267 BEACH ROAD, S199545",
    ],
  },
];

export default function Shipping() {
  const [selectedRegion, setSelectedRegion] = useState("North");
  const [selectedLocation, setSelectedLocation] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { selectedLocationLocalStorage, handleLocationChangeLocalStorage } =
    useCheckout();
  const navigation = useNavigate();
  const { sessionId } = useAuth();

  useEffect(() => {
    if (selectedLocationLocalStorage) {
      setSelectedLocation(selectedLocationLocalStorage);
      const foundRegion = pickupLocations.find((region) =>
        region.locations.includes(selectedLocationLocalStorage)
      );

      if (foundRegion) {
        setSelectedRegion(foundRegion.region);
      }
    }
  }, []);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    setSelectedLocation(""); // Clear selected locations when region changes
  };

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation((prevLocation) =>
      prevLocation === location ? "" : location
    );
  };

  const handleOpenSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = () => {
    if (!selectedLocation && !isMobile) {
      handleOpenSnackbar("Please choose a pickup location!");
      return;
    } else if (!selectedLocation && isMobile) {
      window.alert("Please select a location."); // Use the native phone alert
      return;
    }

    handleLocationChangeLocalStorage(selectedLocation);
    navigation("/checkout/" + sessionId + "/confirmation");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 40, height: "350px" }}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          sx={{ backgroundColor: "#CE0000" }} // Customize background color for error messages
          message={snackbarMessage}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <Close />
            </IconButton>
          }
        />
      </Snackbar>
      <FormControl fullWidth>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "nunito, sans-serif",
            marginBottom: "8px",
          }}
        >
          Select Region:
        </Typography>
        <Select
          labelId="region-select-label"
          id="region-select"
          value={selectedRegion}
          onChange={handleRegionChange}
          color="success"
          sx={{
            fontFamily: "nunito, sans-serif",
          }}
        >
          {regions.map((region) => (
            <MenuItem
              key={region}
              value={region}
              sx={{
                fontFamily: "nunito, sans-serif",
              }}
            >
              {region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <List style={{ marginTop: 16 }}>
        <List subheader={<li />}>
          <Typography
            variant="body1"
            sx={{ fontFamily: "nunito, sans-serif", marginLeft: "8px" }}
          >
            Choose Pickup Location:
          </Typography>
        </List>
        {pickupLocations
          .find((item) => item.region === selectedRegion)
          ?.locations.map((location) => (
            <label key={location} style={{ display: "block" }}>
              <ListItem disablePadding>
                <Checkbox
                  checked={selectedLocation === location}
                  onChange={handleLocationChange}
                  value={location}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "#388e3c", // Change checkbox color to your desired color
                    },
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "nunito, sans-serif", marginLeft: "8px" }}
                >
                  {location}
                </Typography>
              </ListItem>
            </label>
          ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          fontFamily: "open sans, sans-serif",
          backgroundColor: "#076365",
          color: "#FAFFF4",
          borderRadius: "5px",
          "&:hover": { backgroundColor: "#076365" },
          marginTop: { xs: 2, sm: 1 },
          width: "100%",
        }}
      >
        Next Page
      </Button>
    </Container>
  );
}
