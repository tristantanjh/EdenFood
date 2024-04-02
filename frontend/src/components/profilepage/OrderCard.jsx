import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SetMealIcon from "@mui/icons-material/SetMeal";
import ItemQuantity from "./ItemQuantity";
import { regions, pickupLocations } from "../common/PickupLocations";
import LocationModal from "../common/LocationModal";

function OrderCard(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const region = pickupLocations
      .find((region) =>
        region.locations.filter((location) =>
          location.name.includes(props.pickupLocation)
        )
      )
      .locations.find((location) =>
        location.name.includes(props.pickupLocation)
      );

    console.log(region);
  }, []);

  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: isMobile ? 400 : 800,
        borderRadius: "8px",
        mb: 2,
      }}
    >
      <CardContent sx={{ padding: "0 !important", mb: 2 }}>
        <Grid container spacing={2}>
          <Grid
            item
            style={{
              width: "100%",
              backgroundColor: "#076365",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: isMobile ? 1 : 2,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "nunito, sans-serif ",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  pl: isMobile ? 1 : 2,
                }}
              >
                Order ID: {props.orderID}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "nunito, sans-serif",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  pr: isMobile ? 0 : 2,
                  pl: isMobile ? 10 : 0,
                }}
              >
                Order Date: {props.orderDate}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pl: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "grey.300",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: 1,
                    borderColor: "grey.500",
                    mr: 1,
                  }}
                >
                  <SetMealIcon />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "nunito, sans-serif",
                    color: "#000000",
                    fontWeight: "bold",
                  }}
                >
                  {props.orderSeller}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: "nunito, sans-serif",
                  color: "#076365",
                  fontWeight: "bold",
                  pr: 4,
                }}
              >
                {props.orderStatus}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            {props.orderItems.map((item, index) => (
              <ItemQuantity key={index} {...item} />
            ))}
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "right" }}>
            <Typography
              sx={{
                fontFamily: "nunito, sans-serif",
                fontWeight: "bold",
                fontSize: 22,
                pr: 4,
              }}
            >
              Total: ${props.orderTotal}
            </Typography>
          </Grid>
          <Grid item container spacing={2} justifyContent="center">
            <Grid item xs={4} display="flex" justifyContent="center">
              <Button
                sx={{
                  backgroundColor: "#64CF94",
                  borderColor: "#64CF94",
                  color: "#FFFFFF",
                  borderRadius: 15,
                  fontSize: isMobile ? 10 : 15,
                  width: isMobile ? 60 : 120,
                }}
              >
                Rate
              </Button>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center">
              <Button
                onClick={() => setModalOpen(true)}
                sx={{
                  backgroundColor: "#64CF94",
                  borderColor: "#64CF94",
                  color: "#FFFFFF",
                  borderRadius: 15,
                  fontSize: isMobile ? 10 : 15,
                  width: isMobile ? 60 : 120,
                }}
              >
                View Location
              </Button>
              <LocationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                locations={pickupLocations
                  .find((region) =>
                    region.locations.filter((location) =>
                      location.name.includes(props.pickupLocation)
                    )
                  )
                  .locations.find((location) =>
                    location.name.includes(props.pickupLocation)
                  )}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center">
              <Button
                sx={{
                  backgroundColor: "#64CF94",
                  borderColor: "#64CF94",
                  color: "#FFFFFF",
                  borderRadius: 15,
                  fontSize: isMobile ? 10 : 15,
                  width: isMobile ? 60 : 120,
                }}
              >
                Report
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default OrderCard;
