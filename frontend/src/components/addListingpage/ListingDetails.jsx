import React, { useState } from "react";
import {
  TextField,
  CssBaseline,
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import UploadImage from "./UploadImage";
import ListingDescriptionTab from "./ListingDescriptionTab";
import axios from "axios"; // Ensure axios is imported if you're using it for API calls
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function ListingDetails() {
  const theme = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    title: "",
    freshness: "",
    category: "",
    price: "",
    quantity: "",
    imageURL: "",
    description: "",
    instruction: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageURL: [],
    price: 0,
    user: user.id,
    category: "",
    instruction: "",
    freshness: 0,
    quantity: 0,
  });
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDescriptionChange = (description) => {
    setFormData((prevState) => ({
      ...prevState,
      description,
    }));
  };

  const handleInstructionChange = (instruction) => {
    setFormData((prevState) => ({
      ...prevState,
      instruction: instruction,
    }));
  };

  const handleImageChange = (updatedImageURLs, action) => {
    setFormData((prevState) => ({
      ...prevState,
      imageURL: updatedImageURLs,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      title: "",
      freshness: "",
      category: "",
      price: "",
      quantity: "",
      imageURL: "",
      description: "",
      instruction: "",
    };

    if (!formData.title) {
      newErrors.title = "Title is required";
      valid = false;
    }
    if (!formData.freshness) {
      newErrors.freshness = "Freshness is required";
      valid = false;
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
      valid = false;
    }
    if (formData.price <= 0) {
      newErrors.price = "Price is required and must be greater than 0";
      valid = false;
    }
    if (formData.quantity <= 0) {
      newErrors.price = "Quantity is required and must be greater than 0";
      valid = false;
    }
    if (!formData.imageURL) {
      newErrors.imageURL = "Image is required";
      valid = false;
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
      valid = false;
    }
    if (!formData.instruction) {
      newErrors.instruction = "Instructions is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, ...restOfData } = formData;

    const transformedData = {
      name: title,
      ...restOfData,
    };
    console.log(transformedData);

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:3000/createGrocery",
          transformedData
        );
        console.log(response.data);
        navigate("/profile");
      } catch (error) {
        console.error(
          "Error creating listing:",
          error?.response?.data?.message
        );
      }
    }
  };

  return (
    <div>
      <CssBaseline />
      <Box sx={{ width: "100%", bgcolor: "#FAFFF4", height: "auto" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 6, sm: 12 },
            backgroundColor: "#FAFFF4",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ margin: "0.3%", width: isSmallScreen ? "90%" : "80%" }}
              id="title"
              name="title"
              label="(Insert Title)"
              onChange={handleChange}
              error={Boolean(errors.title)}
            />
            <TextField
              sx={{ width: isSmallScreen ? "90%" : "80%", mt: 2 }}
              id="freshness"
              label="(Insert days of freshness)"
              variant="outlined"
              name="freshness"
              onChange={handleChange}
              error={Boolean(errors.freshness)}
            />
            <FormControl
              sx={{ width: isSmallScreen ? "90%" : "80%", mt: 2 }}
              error={Boolean(errors.category)}
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formData.category}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value={"Fruits"}>Fruits</MenuItem>
                <MenuItem value={"Vegetable"}>Vegetable</MenuItem>
                <MenuItem value={"Meat"}>Meat</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ width: isSmallScreen ? "90%" : "80%", mt: 2 }}
              id="price"
              label="$ (Price)"
              name="price"
              variant="outlined"
              onChange={handleChange}
              error={Boolean(errors.price)}
            />
            <TextField
              sx={{ width: isSmallScreen ? "90%" : "80%", mt: 2 }}
              id="quantity"
              label="Quantity"
              name="quantity"
              onChange={handleChange}
              error={Boolean(errors.quantity)}
            />
            <UploadImage onImageChange={handleImageChange} />
            <ListingDescriptionTab
              onDescriptionChange={handleDescriptionChange}
              onInstructionChange={handleInstructionChange}
              initialDescription={formData.description}
              initialInstructions={formData.instruction}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                py: isSmallScreen ? 1.5 : 1,
                fontFamily: "open sans, sans-serif",
                backgroundColor: "#076365",
                color: "#FAFFF4",
                borderRadius: "30px",
                "&:hover": { backgroundColor: "#076365" },
                width: isSmallScreen ? "calc(100% - 40px)" : "60%",
                maxWidth: "400px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Add Listing
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
