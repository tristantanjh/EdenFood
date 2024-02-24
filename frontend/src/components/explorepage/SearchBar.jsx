import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

// const categories = [
//   {
//     value: "All",
//     label: "All",
//   },
//   {
//     value: "Fruits & Vegetables",
//     label: "Fruits & Vegetables",
//   },
//   {
//     value: "Meat",
//     label: "Meat",
//   },
//   {
//     value: "Halal",
//     label: "Halal",
//   },
// ];

export default function SearchBar() {
  const inputProps = {
    textField: {
      width: 300,
      margin: 100,
    },
    //style for font size
    refont: {
      fontFamily: "open sans, sans-serif",
    },
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const customTheme = createTheme({
    palette: {
      mode: theme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#BEBEBE",
            "--TextField-brandBorderHoverColor": "#076365",
            "--TextField-brandBorderFocusedColor": "#076365",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
          fontFamily: "open sans, sans-serif",
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&::before, &::after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&::before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
            fontFamily: {
              fontFamily: "open sans, sans-seriff",
            },
          },
        },
      },
      MuiInputLabelRoot: {
        styleOverrides: {
          root: {
            "&::before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColorr)",
            },
            "&:hover": {
              bgcolor: "2px solid var(--TextField-brandBorderHoverColor)",
              color: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });
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
          width: "100%",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          pt: { xs: 11, sm: 13 },
          pb: { xs: 6, sm: 12 },
        }}
      >
        {/* <ThemeProvider theme={customTheme}>
            <TextField
              id="standard-select-category"
              select
              defaultValue="All"
              SelectProps={{
                native: true,
              }}
              variant="standard"
              sx={{
                width: "20%",
                ml: "1%",
                fontFamily: "open sans, sans-serif",
              }}
            >
              {categories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </ThemeProvider> */}
        <Stack direction="row" width={"95%"}>
          <ThemeProvider theme={customTheme}>
            <TextField
              id="outlined-search-food-produce"
              label="Search for Food Produce"
              size="small"
              defaultValue=""
              SelectProps={{
                native: true,
              }}
              InputProps={{
                style: { fontFamily: "nunito, sans-serif" },
              }}
              variant="outlined"
              sx={{
                width: "100%",
                fontFamily: "open sans, sans-serif",
              }}
            ></TextField>
          </ThemeProvider>
          <IconButton
            type="button"
            sx={{
              p: "10px",
              ml: "-95px",
              mb: "5px",
              "&:focus": { outline: "none" },
            }}
            aria-label="search"
          >
            <CloseIcon />
          </IconButton>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderWidth: "1.1px",
              height: "28px",
              mt: "7px",
            }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px", mb: "4.5px", "&:focus": { outline: "none" } }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}
