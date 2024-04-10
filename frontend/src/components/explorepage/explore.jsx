import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarSecondary from "../AppBarSecondary.jsx";
import Footer from "../Footer.jsx";
import ItemCard from "./ItemCard.jsx";
import SearchBar from "./SearchBar.jsx";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

const options = ["All Categories", "Fruits", "Vegetable", "Meats"];

export default function Explore() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [originalGroceries, setOriginalGroceries] = useState([]);
  const [filterValue, setFilterValue] = React.useState(options[0]);

  const cat = ["Fruits, Vegetable, Meats"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/getAllOtherGroceries",
          {
            params: { userId: user.id, categories: cat },
          }
        );
        setOriginalGroceries(response.data);
        setSearchResults(response.data);
        // console.log(originalGroceries)
        setLoading(false);
      } catch (error) {
        setError("Error fetching data. Please try again.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSearch = (query) => {
    const newResults = originalGroceries;
    const searchResults = newResults.map((category) => ({
      ...category,
      categoryItems: category.categoryItems.filter((item) =>
        item.name.includes(query)
      ),
    }));
    if (filterValue == "All Categories") {
      setSearchResults(searchResults);
    } else {
      const filteredResults = searchResults.filter((category) =>
        category.categoryName.includes(filterValue)
      );
      setSearchResults(filteredResults);
    }
    setSearchQuery(query);
  };

  const onFilter = (filterValue) => {
    if (filterValue == "All Categories") {
      // All category + search query
      const searchResults = originalGroceries.map((category) => ({
        ...category,
        categoryItems: category.categoryItems.filter((item) =>
          item.name.includes(searchQuery)
        ),
      }));
      setSearchResults(searchResults);
    } else {
      // Selected category + search query
      const newResults = originalGroceries;
      // Filter by search query
      const searchResults = newResults.map((category) => ({
        ...category,
        categoryItems: category.categoryItems.filter((item) =>
          item.name.includes(searchQuery)
        ),
      }));
      // Filter by selected category
      const filteredResults = searchResults.filter((category) =>
        category.categoryName.includes(filterValue)
      );
      setSearchResults(filteredResults);
    }
  };

  return (
    <div>
      <CssBaseline />
      <AppBarSecondary />
      <SearchBar onSearch={onSearch} />
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
            flexDirection: { xs: "column", md: "column" },
            alignItems: "center",
            justifyContent: "center",
            pb: { xs: 6, sm: 12 },
          }}
        >
          <Autocomplete
            value={filterValue}
            defaultValue={options[0]}
            onChange={(event, newValue) => {
              setFilterValue(newValue);
              onFilter(newValue);
            }}
            id="controllable-states-demo"
            options={options}
            renderOption={(props, option) => (
              <Box style={{ fontSize: "15px" }} {...props}>
                {option}
              </Box>
            )}
            sx={{
              width: 200,
              mr: "auto",
              mb: "2rem",
              "& .MuiAutocomplete-input": {
                fontSize: { xs: "15px", md: "16px" },
                color: "rgba(0, 0, 0, 0.7)",
              },
              // "&.MuiAutocomplete-root .MuiOutlinedInput-root": {
              //   pt: "3px",
              //   pb: "3px",
              // },
              "& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover": {
                backgroundColor: "hotpink",
              },
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Category" />
            )}
            PaperComponent={(props) => (
              <Paper
                sx={{
                  background: "#FAFFF4",
                  color: "rgba(0, 0, 0, 0.7)",
                  fontSize: "25px",
                }}
                {...props}
              />
            )}
          />
          {searchResults.map((category) =>
            category.categoryItems.length > 0 ? (
              <div
                style={{
                  marginRight: "auto",
                  marginBottom: "1rem",
                  maxHeight: isMobile ? "43vh" : "60vh",
                  overflow: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "30px",
                    fontWeight: "800",
                    m: "0 auto 1rem .5rem",
                    fontFamily: "nunito, sans-serif",
                  }}
                >
                  {category.categoryName}
                </Typography>
                <Grid container spacing={isMobile ? 1 : 1}>
                  {category.categoryItems.map((item, index) => (
                    <Grid item container justifyContent="flex-start" xs md>
                      <ItemCard key={index} {...item} />
                    </Grid>
                  ))}
                </Grid>
              </div>
            ) : (
              ""
            )
          )}
        </Container>
      </Box>

      <Footer />
    </div>
  );
}
