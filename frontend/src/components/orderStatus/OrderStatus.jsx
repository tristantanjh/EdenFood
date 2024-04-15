import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function OrderStatus() {
  const [orders, setOrders] = useState([]);
  const [extractedData, setExtractedData] = useState([]);
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refreshOrders, setRefreshOrders] = useState(0);
  const handleClearSearch = () => {
    setSearchValue("");
  };
  const handleChange = async (orderId, orderStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/changeOrderStatus?orderId=${orderId}&orderStatus=${orderStatus}`
      );
      setRefreshOrders((prev) => prev + 1);
    } catch (error) {
      console.error("Error changing order status:", error);
      console.log(error.response);
    }
    setOpenDialog(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getAllOrders");
        const ordersWithUserData = await Promise.all(
          response.data.orders.map(async (order) => {
            const userId = order.user;
            try {
              const userDataResponse = await axios.get(
                `http://localhost:3000/getUserWithId?userId=${userId}`
              );
              const userData = userDataResponse.data;
              return {
                ...order,
                userName: userData.user.username,
                userEmail: userData.user.email,
              };
            } catch (error) {
              console.error("Error fetching user data:", error);
              return {
                ...order,
                userName: "Unknown",
                userEmail: "Unknown",
              };
            }
          })
        );
        setOrders(ordersWithUserData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      }
    };
    fetchData();
  }, [refreshOrders]);

  useEffect(() => {
    const ordersWithIds = orders?.map((order, index) => ({
      ...order,
      id: index + 1,
    }));
    const newExtractedData = ordersWithIds
      ? ordersWithIds.map(
          ({ id, _id, pickupLocation, userName, userEmail, status }) => ({
            id,
            _id,
            pickupLocation,
            userName: userName || "Unknown",
            userEmail: userEmail || "Unknown",
            status,
          })
        )
      : [];
    setExtractedData(newExtractedData);
  }, [orders]);

  const filteredRows = extractedData.filter(
    (row) =>
      row._id.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.id.toString().toLowerCase().includes(searchValue.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "No.", width: 50 },
    { field: "_id", headerName: "Order ID", width: 250 },
    {
      field: "pickupLocation",
      headerName: "Pick-up Location",
      width: 220,
    },
    { field: "userName", headerName: "Buyer's Name", width: 220 },
    { field: "userEmail", headerName: "Buyer's Email", width: 220 },
    {
      field: "status",
      headerName: "Order Status",
      width: 200,
      renderCell: (params) => (
        <strong style={{ color: params.value === "pending" ? "red" : "green" }}>
          {params.value.toUpperCase()}
        </strong>
      ),
    },
  ];

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        bgcolor: "#FAFFF4",
        height: { xs: "100%", md: "100%" },
      })}
    >
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          <Typography
            fontFamily={"open sans, sans-serif"}
            fontSize={{ xs: "18px", sm: "24px" }}
            fontWeight={"bold"}
            color={"#181B13"}
          >
            Change Order Status
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            fontFamily="nunito, sans-serif"
            fontSize={{ xs: "14px", sm: "16px" }}
          >
            Are you sure you want to change the status of order with Id:{" "}
            {selectedOrder?._id} to{" "}
            <Typography
              component="span"
              fontWeight="bold"
              color={selectedOrder?.status === "pending" ? "green" : "red"}
            >
              {selectedOrder?.status == "pending" ? "COLLECTED" : "PENDING"}
            </Typography>
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            <Typography
              fontFamily="nunito, sans-serif"
              fontSize={{ xs: "14px", sm: "16px" }}
            >
              Cancel
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            autoFocus
            onClick={() =>
              handleChange(selectedOrder?._id, selectedOrder?.status)
            }
          >
            <Typography
              fontFamily="nunito, sans-serif"
              fontSize={{ xs: "14px", sm: "16px" }}
            >
              Confirm
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>

      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column" },
          alignItems: "center",
          justifyContent: "center",
          pb: { xs: 6, sm: 12 },
        }}
      >
        <Grid
          container
          component="main"
          sx={{ display: "flex", alignItems: "flex-start" }}
        >
          <Grid
            item
            md={12}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Typography
              fontFamily={"open sans, sans-serif"}
              fontSize={{ xs: "24px", sm: "32px" }}
              fontWeight={"bold"}
              color={"#181B13"}
              sx={{ mb: "30px" }}
            >
              Manage Order Status
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <TextField
              label="Search Order ID"
              variant="outlined"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleClearSearch}
                    aria-label="clear search"
                    sx={{
                      p: "10px",
                      "&:focus": {
                        outline: "none",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                ),
              }}
              sx={{ width: "100%", mb: 2 }}
            />
          </Grid>
          <Grid
            item
            md={12}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            {orders?.length === 0 ? (
              <Typography
                fontFamily={"open sans, sans-serif"}
                fontSize={{ xs: "16px", sm: "21px" }}
                fontWeight={"bold"}
                color={"#767676"}
              >
                There are no orders yet.
              </Typography>
            ) : (
              <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                  rows={filteredRows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10, 20]}
                  disableSelectionOnClick
                  onRowClick={(params) => {
                    setSelectedOrder(params.row);
                    setOpenDialog(true);
                  }}
                  sx={{
                    "& .MuiDataGrid-row:hover": {
                      cursor: "pointer",
                      backgroundColor: "#076365",
                      color: "#fff",
                    },
                  }}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
