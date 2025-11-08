import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TrackFlightPage = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [trackedFlight, setTrackedFlight] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTrack = () => {
    const input = flightNumber.trim().toLowerCase();

    if (input === "ga1028394") {
      navigate("/booked"); // navigate to Boarding Pass page
      setError(""); // clear error
      return;
    }

    if (flightNumber.trim() !== "") {
      setTrackedFlight(null);
      setError("❌ Ticket not found. Try again."); // show error
    } else {
      setError(""); // clear error if input is empty
    }
  };

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Track Your Flight
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Enter your flight number to see its status
        </Typography>
      </Box>

      {/* Track Flight Form */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          mb: 1,
          gap: 2,
        }}
      >
        <TextField
          label="Flight Number"
          variant="outlined"
          value={flightNumber}
          onChange={(e) => {
            setFlightNumber(e.target.value);
            if (error) setError(""); // clear error as soon as user types
          }}
          sx={{ width: { xs: "100%", sm: "300px" } }}
          error={!!error}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleTrack}
          sx={{ height: "56px" }}
        >
          Track Flight
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography
          variant="caption"
          color="error"
          sx={{ display: "block", textAlign: "center", mb: 3 }}
        >
          {error}
        </Typography>
      )}

      {/* Flight Status Card (if needed) */}
      {trackedFlight && (
        <Card sx={{ maxWidth: 500, mx: "auto", p: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {trackedFlight.airline}
            </Typography>
            <Typography variant="body1">
              From: {trackedFlight.from} → To: {trackedFlight.to}
            </Typography>
            <Typography variant="body1">Departure: {trackedFlight.departure}</Typography>
            <Typography variant="body1">Arrival: {trackedFlight.arrival}</Typography>
            <Typography variant="body1" color="secondary">
              Status: {trackedFlight.status}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default TrackFlightPage;
