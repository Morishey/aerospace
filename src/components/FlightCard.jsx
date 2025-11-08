import React from "react";
import { Card, CardContent, Typography, Box, Avatar, Button } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

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
        {/* Airline Logo */}
        <Avatar
          src={flight.logo}
          alt={flight.airline}
          sx={{ width: 50, height: 50, mr: 2 }}
        />

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

export default FlightCard;
