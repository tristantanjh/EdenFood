import React, { useState } from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    setSelectedLocation(""); // Clear selected locations when region changes
  };

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation((prevLocation) =>
      prevLocation === location ? '' : location
    );
  };

  const handleSubmit = () => {
    navigate("/checkout/confirmation");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 40 }}>
      <FormControl fullWidth>
        <InputLabel id="region-select-label">Select Region</InputLabel>
        <Select
          labelId="region-select-label"
          id="region-select"
          value={selectedRegion}
          onChange={handleRegionChange}
          label="Select Region"
        >
          {regions.map((region) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <List style={{ marginTop: 16 }}>
        <List subheader={<li />}>
          <ListItemText primary="Choose Pickup Location:" />
        </List>
        {pickupLocations
          .find((item) => item.region === selectedRegion)
          ?.locations.map((location) => (
            <label key={location} style={{ display: 'block' }}>
              <ListItem disablePadding>
                <Checkbox
                  checked={selectedLocation === location}
                  onChange={handleLocationChange}
                  value={location}
                />
                <ListItemText primary={location} />
              </ListItem>
            </label>
          ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Next Page
      </Button>
    </Container>
  );
}
