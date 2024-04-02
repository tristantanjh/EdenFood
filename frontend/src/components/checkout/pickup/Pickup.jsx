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
import { Close, Place } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/AuthProvider";
import LocationModal from "../../common/LocationModal";
import { regions, pickupLocations } from "../../common/PickupLocations";

// const regions = ["North", "Northeast", "East", "West", "Central"];
// const pickupLocations = [
//   {
//     region: "North",
//     locations: [
//       {
//         id: 1,
//         name: "102 YISHUN AVE 5, S760102",
//         position: { lat: 1.430700, lng: 103.828820 },
//       },
//       {
//         id: 2,
//         name: "268 WOODLANDS CENTRE ROAD, S738931",
//         position: { lat: 1.441070, lng: 103.769070 },
//       },
//       {
//         id: 3,
//         name: "678A WOODLANDS AVENUE 6, S731678",
//         position: { lat: 1.440410, lng: 103.801520 },
//       },
//     ],
//   },
//   {
//     region: "Northeast",
//     locations: [
//       {
//         id: 1,
//         name: "15 HOUGANG AVENUE 3, S538840",
//         position: { lat: 1.362690, lng: 103.891820 },
//       },
//       {
//         id: 2,
//         name: "10 HOUGANG AVENUE 7, S530010",
//         position: { lat: 1.363320192016653, lng: 103.8948225673747 },
//       },
//       {
//         id: 3,
//         name: "546 SERANGOON ROAD, S218168",
//         position: { lat: 1.3140876328329143, lng: 103.85711692507167 },
//       },
//     ],
//   },
//   {
//     region: "East",
//     locations: [
//       {
//         id: 1,
//         name: "Blk 22 EUNOS CRESCENT, S400022",
//         position: { lat: 1.3248534765737643, lng: 103.90195120970395 },
//       },
//       {
//         id: 2,
//         name: "204 BEDOK NORTH STREET 1, S460204",
//         position: { lat: 1.326750385101299, lng: 103.93028860000001 },
//       },
//       {
//         id: 3,
//         name: "449 TAMPINES STREET 42, S520449",
//         position: { lat: 1.3570629370867016, lng: 103.9510849576708 },
//       },
//     ],
//   },
//   {
//     region: "West",
//     locations: [
//       {
//         id: 1,
//         name: "2 JURONG EAST, S609601",
//         position: { lat: 1.3349379700910333, lng: 103.74687443381144 },
//       },
//       {
//         id: 2,
//         name: "272B JURONG WEST STREET 24, S642272",
//         position: { lat: 1.3505957986442818, lng: 103.70500505388092 },
//       },
//       {
//         id: 3,
//         name: "HILLVIEW INDUSTRIAL ESTATE 40, S669248",
//         position: { lat: 1.365, lng: 103.756 },
//       },
//     ],
//   },
//   {
//     region: "Central",
//     locations: [
//       {
//         id: 1,
//         name: "218 ORCHARD ROAD, S238851",
//         position: { lat: 1.301612906460955, lng: 103.83878833236729 },
//       },
//       {
//         id: 2,
//         name: "137 TELOK AYER ST, S068602",
//         position: { lat: 1.282, lng: 103.848 },
//       },
//       {
//         id: 3,
//         name: "267 BEACH ROAD, S199545",
//         position: { lat: 1.302, lng: 103.861 },
//       },
//     ],
//   },
// ];

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
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (selectedLocationLocalStorage) {
      setSelectedLocation(selectedLocationLocalStorage);
      const foundRegion = pickupLocations.find((region) =>
        region.locations.find((location) => location.name.includes(selectedLocationLocalStorage))
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
            fontWeight: 600
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
            sx={{
              fontFamily: "nunito, sans-serif",
              marginLeft: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontWeight: 600
            }}
          >
            Choose Pickup Location:
            <Box
              onClick={() => setModalOpen(true)}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Place sx={{ color: "#076365", marginRight: 0.5 }} />
              <Typography
                variant="body1"
                sx={{ fontFamily: "nunito, sans-serif", fontWeight: 600}}
              >
                View Locations
              </Typography>
            </Box>
          </Typography>
          <LocationModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            locations={pickupLocations.find((regions) =>
              regions.region.includes(selectedRegion)
            )}
          />
        </List>
        {pickupLocations
          .find((item) => item.region === selectedRegion)
          ?.locations.map((location) => (
            <label key={location.id} style={{ display: "block" }}>
              <ListItem disablePadding>
                <Checkbox
                  checked={selectedLocation === location.name}
                  onChange={handleLocationChange}
                  value={location.name}
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
                  {location.name}
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
