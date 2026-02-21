import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

// Updated flight data with realistic airlines
const flights = [
  { airline: "Delta Airlines", from: "JKIA", to: "ITIA", time: "14h 45m", price: "2100" },
  { airline: "British Airways", from: "DPS", to: "CGK", time: "10h 50m", price: "2020" },
  { airline: "Qatar Airways", from: "JKIA", to: "ITIA", time: "12h 30m", price: "1900" },
  { airline: "Emirates", from: "DPS", to: "CGK", time: "12h 15m", price: "2160" },
  { airline: "Ethiopian Airlines", from: "JKIA", to: "ITIA", time: "13h 10m", price: "1800" },
  { airline: "Aeroflot Russian Airlines", from: "DPS", to: "CGK", time: "13h 25m", price: "2800" },
  { airline: "Air Canada", from: "JKIA", to: "CGK", time: "14h 00m", price: "2200" },
  { airline: "Singapore Airlines", from: "DPS", to: "ITIA", time: "14h 30m", price: "2400" },
  { airline: "Qantas Airways", from: "JKIA", to: "CGK", time: "15h 15m", price: "2600" },
  { airline: "Turkish Airlines", from: "CGK", to: "ITIA", time: "15h 45m", price: "2800" },
];

const FlightCard = ({ flight }) => {
  return (
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        width: "100%",
        overflow: "hidden",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center", p: 2 }}>
        {/* Flight Icon */}
        <FlightTakeoffIcon sx={{ fontSize: 50, color: "primary.main", mr: 2 }} />

        {/* Flight Info */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {flight.airline}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
            <Typography variant="body2">{flight.from}</Typography>
            <FlightTakeoffIcon sx={{ fontSize: 18, color: "primary.main" }} />
            <Typography variant="body2">{flight.to}</Typography>
          </Box>
        </Box>

        {/* Flight Duration & Price */}
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="body2" color="text.secondary">
            {flight.time}
          </Typography>
          <Typography variant="subtitle1" fontWeight={600}>
            ${flight.price}
          </Typography>
        </Box>

        {/* Book Button */}
        <Button
          variant="contained"
          color="secondary"
          sx={{ ml: 2, px: 2, py: 0.7, fontWeight: 600 }}
        >
          Book
        </Button>
      </CardContent>
    </Card>
  );
};

export { FlightCard, flights };
