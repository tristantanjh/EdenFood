import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import MuiCardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import moment from "moment";

const items = [
  {
    date: "23 Feb",
    quantity: "4",
    index: "1",
  },
  {
    date: "24 Feb",
    quantity: "5",
    index: "2",
  },
  {
    date: "25 Feb",
    quantity: "0",
    index: "3",
  },
  {
    date: "26 Feb",
    quantity: "5",
    index: "4",
  },
  {
    date: "27 Feb",
    quantity: "3",
    index: "5",
  },
];

const today = moment().format("YYYY-MM-DD");

const ToggleButton = styled(MuiToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "#FDF3A7",
    backgroundColor: "#076365",
    borderRadius: "4px",
  },
});

const CardContent = styled(MuiCardContent)({
  "&:last-child": {
    paddingBottom: 8,
  },
});

export default function ProductAvailability({ quantity }) {
  const [alignment, setAlignment] = React.useState("1");

  const handleChange = (event, newAlignment) => {
    console.log(newAlignment)
    setAlignment(newAlignment);
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
          pt: { xs: 4, sm: 8 },
          pb: { xs: 3, sm: 6 },
        }}
      >
        <Card variant="outlined" sx={{ minWidth: 27, borderRadius: "10px", borderWidth: "2px" }}>
          <CardContent sx={{ p: 1, pl: 3 }}>
            <Typography
              variant="h6"
              component="div"
              display="inline"
              sx={{ fontFamily: "nunito, sans-serif", fontWeight: "bold" }}
            >
              Product Availability
            </Typography>
            <Typography
              display="inline"
              sx={{
                ml: 1.2,
                mb: 0.7,
                mr: { xs: 0, sm: 8 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontFamily: "nunito, sans-serif",
              }}
              color="text.secondary"
            >
              (select one)
            </Typography>

            <ToggleButtonGroup
              sx={{ flexWrap: "wrap" }}
              value={alignment}
              exclusive
              onChange={handleChange}
            >
              {items.map((item, index) => (
                  
                  <ToggleButton
                    value={index + 1}
                    sx={{
                      color: item.quantity == 0 ? "rgba(0, 0, 0, 0.54)" : "#000000",
                      p: "5px",
                      pl: { xs: '5px', md: 3 },
                      border: "0",
                      pointerEvents: item.quantity == 0 ? "none" : "auto",
                    }}
                  >
                    <div
                      style={{ display: "grid", gridAutoRows: "min-content" }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: '0.8rem', sm: '1rem' },
                          textTransform: "none",
                          textAlign: "left",
                          mr: "50px",
                          fontWeight: "bold",
                        }}
                      >
                        {moment(item.date, "DD MMM").format("YYYY-MM-DD") ===
                        today
                          ? "Today:"
                          : item.date}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: '0.8rem', sm: '0.9rem' },
                          textTransform: "none",
                          textAlign: "left",
                        }}
                      >
                        {item.quantity > 0
                          ? `${quantity} left`
                          : "Unavailable"}
                      </Typography>
                    </div>
                  </ToggleButton>
                )
              )}
            </ToggleButtonGroup>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
