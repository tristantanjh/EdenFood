import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MapComponent from "./MapComponent";

const LocationModal = ({ isOpen, locations, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          fontFamily: "open sans, sans-serif",
          fontWeight: 700,
          fontSize: "24px",
          color: "#181B13",
        }}
      >
        Locations on Map
      </DialogTitle>
      <DialogContent>
        <MapComponent locationsList={locations} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            fontFamily: "open sans, sans-serif",
            backgroundColor: "#076365",
            color: "#FAFFF4",
            borderRadius: "5px",
            "&:hover": { backgroundColor: "#076365" },
            width: "100%",
            marginLeft: "10px",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LocationModal;
