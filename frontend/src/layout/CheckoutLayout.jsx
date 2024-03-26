import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppBarSecondary from "../components/AppBarSecondary";
import CssBaseline from "@mui/material/CssBaseline";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CheckoutProvider } from "../hooks/CheckoutProvider";

const exampleGroceries = [
  {
    _id: "610f72f4b214f2d2e8e25a2a",
    name: "Apple",
    description: "Fresh and juicy apple",
    imageURL: "https://example.com/apple.jpg",
    price: 1.99,
    user: "610f72f4b214f2d2e8e25a1f", // User ID
    categories: ["Fruits"],
    reviews: ["611f72f4b214f2d2e8e25a1a", "611f72f4b214f2d2e8e25a1b"],
  },
  {
    _id: "610f72f4b214f2d2e8e25a2b",
    name: "Banana",
    description: "Yellow and tasty banana",
    imageURL: "https://example.com/banana.jpg",
    price: 0.99,
    user: "610f72f4b214f2d2e8e25a1f", // User ID
    categories: ["Fruits"],
    reviews: ["611f72f4b214f2d2e8e25a1c"],
  },
  {
    _id: "610f72f4b214f2d2e8e25a2c",
    name: "Mango",
    description: "Sweet and delicious mango",
    imageURL: "https://example.com/mango.jpg",
    price: 2.49,
    user: "610f72f4b214f2d2e8e25a1f", // User ID
    categories: ["Fruits"],
    reviews: ["611f72f4b214f2d2e8e25a1d"],
  },
];

const exampleCartData = {
  user: "610f72f4b214f2d2e8e25a1f", // User ID
  items: [
    {
      grocery: "610f72f4b214f2d2e8e25a2a", // Apple
      quantity: 2,
    },
    {
      grocery: "610f72f4b214f2d2e8e25a2b", // Banana
      quantity: 1,
    },
    {
      grocery: "610f72f4b214f2d2e8e25a2c", // Mango
      quantity: 3,
    },
  ],
};

export default function CheckoutLayout() {
  // const { activeStep } = useCheckout(); // Access setActiveStep from context
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  useEffect(() => {
    const stepMapping = {
      shipping: 0,
      confirmation: 1,
    };
    const currentStep = stepMapping[location.pathname.split("/").pop()] || 0;
    setActiveStep(currentStep);
  }, [location.pathname, setActiveStep]);

  const steps = ["Pickup Details", "Confirmation"]; // Define your steps here based on your route

  return (
    <div style={{ backgroundColor: "#FAFFF4", height: "100vh" }}>
      <CheckoutProvider>
      <CssBaseline />
      <AppBarSecondary />
      <Box
        sx={{
          height: { xs: "100px", sm: "128px" },
        }}
      />
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        style={{ backgroundColor: "transparent" }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                style: {
                  color: index <= activeStep ? "#076365" : "#BEBEBE", // Change font color of the step
                },
              }}
            >
              <Typography
                sx={{ fontFamily: "nunito, sans-serif", fontSize: "16px" }}
              >
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          pb: 4,
        }}
      />
      <Outlet />
      </CheckoutProvider>
    </div>
  );
}
