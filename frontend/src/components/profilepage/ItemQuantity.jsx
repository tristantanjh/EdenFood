import React from "react";
import { Box, List, ListItem, ListItemText, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ItemQuantity(props) {
  return (
    <Box sx={{ pl: 4, display: "flex", m: 2 }}>
      <img src={props.itemImageURL} width="100" height="100" />

      <List>
        <ListItem>
          <ListItemText
            primary={props.itemName}
            secondary={"Qty: " + props.itemQuantity}
          />
        </ListItem>
      </List>
    </Box>
  );
}
