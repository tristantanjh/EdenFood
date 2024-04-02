import React, { useEffect } from "react";
import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom";
import AppBarSecondary from "../components/AppBarSecondary";
import CssBaseline from "@mui/material/CssBaseline";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, Divider } from "@mui/material";
import { CheckoutProvider } from "../hooks/CheckoutProvider";
import CartItemsSection from "../components/checkout/CartItemsSection";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../hooks/AuthProvider";
import ErrorPage from "../routes/ErrorPage";

export default function CheckoutLayout() {
  const isMobile = useMediaQuery("(max-width: 960px)");
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const { sessionId } = useAuth();
  const { session } = useParams();
  const isValidSessionId = sessionId === session;

  const steps = ["Pickup Details", "Confirmation"]; // Define your steps here based on your route

  useEffect(() => {
    const stepMapping = {
      shipping: 0,
      confirmation: 1,
    };
    const currentStep = stepMapping[location.pathname.split("/").pop()] || 0;
    setActiveStep(currentStep);
  }, [location.pathname, setActiveStep]);

  return isValidSessionId ? isMobile ? (
    <CheckoutProvider>
      <div style={{ backgroundColor: "#FAFFF4", height: "100vh" }}>
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
        <Outlet />
        <Box
          sx={{
            pt: 4,
          }}
        >
          <Divider />
          <Typography
            sx={{
              pt: 4,
              pb: 4,
              fontFamily: "open sans, sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              color: "#181B13",
              marginLeft: 2.3,
            }}
          >
            Order Summary
          </Typography>
          <CartItemsSection />
        </Box>
      </div>
    </CheckoutProvider>
  ) : (
    <CheckoutProvider>
      <div style={{ backgroundColor: "#FAFFF4", height: "100vh" }}>
        <CssBaseline />
        <AppBarSecondary />
        <Box
          sx={{
            height: { xs: "100px", sm: "100x" },
          }}
        />
        <Divider flexItem />
        <Box p={2} display="flex" flexDirection="row" alignItems="center">
          <Box flex={1.5} pr={8}>
          <Typography
            sx={{
              py: 4,
              fontFamily: "open sans, sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              color: "#181B13",
              marginLeft: 6,
            }}
          >
            Order Summary
          </Typography>
            <CartItemsSection />
          </Box>
          {/* <Divider orientation="vertical" flexItem /> */}
          <Box flex={3} pl={2}>
            <Box pb={2}>
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
                        sx={{
                          fontFamily: "nunito, sans-serif",
                          fontSize: "16px",
                        }}
                      >
                        {label}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            {/* Render Outlet component here */}
            <Outlet />
          </Box>
        </Box>
        <Divider
          orientation="vertical"
          style={{
            position: "absolute",
            top: "100px",
            bottom: "0",
            left: "calc(33.33% + 1px)",
            zIndex: 1,
            maxHeight: "calc(100vh - 100px)",
          }}
        />{" "}
      </div>
    </CheckoutProvider>
  ) : (
    <ErrorPage />
  );
}
