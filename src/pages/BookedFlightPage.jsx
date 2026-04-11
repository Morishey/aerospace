import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Avatar,
  Chip,
  alpha,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import LuggageIcon from "@mui/icons-material/Luggage";
import WifiIcon from "@mui/icons-material/Wifi";
import PowerIcon from "@mui/icons-material/Power";
import PetsIcon from "@mui/icons-material/Pets";
import InfoIcon from "@mui/icons-material/Info";
import TimelineIcon from "@mui/icons-material/Timeline";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";

// Modern Barcode Design
const ModernBarcode = () => (
  <Box sx={{ display: "flex", justifyContent: "center", gap: 0.8, my: 2 }}>
    {[
      42, 28, 35, 48, 22, 38, 45, 32, 40, 25, 52, 30, 44, 38, 42, 35, 48, 28,
      52, 36,
    ].map((height, i) => (
      <Box
        key={i}
        sx={{
          width: i % 3 === 0 ? 4 : 2,
          height,
          background: `linear-gradient(180deg, #1a1a1a 0%, #333 100%)`,
          borderRadius: "2px 2px 0 0",
        }}
      />
    ))}
  </Box>
);

// Passenger Detail Item Component
const DetailItem = ({ icon, label, value, color = "#0a2a5a" }) => (
  <Box sx={{ mb: 2 }}>
    <Typography
      variant="caption"
      sx={{
        color: "#94a3b8",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        mb: 0.5,
        fontSize: { xs: "0.65rem", sm: "0.7rem" },
      }}
    >
      {icon} {label}
    </Typography>
    <Typography
      variant="body1"
      sx={{ fontWeight: 600, color, fontSize: { xs: "0.95rem", sm: "1.1rem" } }}
    >
      {value || "—"}
    </Typography>
  </Box>
);

const BoardingPass = () => {
  const { flightId } = useParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const passRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!flightId) {
      setError("No flight ID provided");
      setLoading(false);
      return;
    }

    const fetchFlight = async () => {
      try {
        const { data, error } = await supabase
          .from("flights")
          .select("*")
          .eq("id", flightId)
          .single();

        if (error) throw error;
        setFlight(data);
      } catch (err) {
        console.error("Error fetching flight:", err);
        setError(err.message || "Flight not found");
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [flightId]);

  const handleDownload = async () => {
    if (!passRef.current) return;
    try {
      const canvas = await html2canvas(passRef.current, {
        backgroundColor: "#fff",
        scale: 2,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `boarding-pass-${flight?.flight_number || "flight"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Screenshot failed:", err);
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "--:--";
    const [hour, minute] = timeStr.split(":");
    let h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minute} ${ampm}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Helper to get MUI color based on status text
  const getStatusColor = (status) => {
    if (!status) return "default";
    const lowerStatus = status.toLowerCase();

    if (
      lowerStatus.includes("rescheduled") ||
      lowerStatus.includes("canceled") ||
      lowerStatus.includes("cancelled") ||
      lowerStatus.includes("delayed")
    ) {
      return "error";
    }
    if (
      lowerStatus.includes("confirmed") ||
      lowerStatus.includes("on time") ||
      lowerStatus.includes("scheduled")
    ) {
      return "success";
    }
    if (lowerStatus.includes("boarding")) {
      return "warning";
    }
    if (lowerStatus.includes("in flight") || lowerStatus.includes("departed")) {
      return "info";
    }
    return "default";
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !flight) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5" color="error">{error || "Flight data not available"}</Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>Back to Home</Button>
      </Box>
    );
  }

  // Helper to safely get values with fallbacks to keep design identical
  const depCode = flight.departure_airport_code || "NBO";
  const depCity = flight.departure_city || "Nairobi, KE";
  const layoverCode = flight.layover_airport_code || "DOH";
  const layoverCity = flight.layover_city || "QA";
  const layoverDuration = flight.layover_duration || "2h 00m";
  const arrCode = flight.arrival_airport_code || "ORD";
  const arrCity = flight.arrival_city || "Chicago, IL";
  const depTime = formatTime(flight.departure_time);
  const arrTime = formatTime(flight.arrival_time);
  const totalDuration = flight.total_journey_duration || "22h 00m";
  const passengerName = flight.passenger_name || "ALEXANDER PERISIC";
  const passport = flight.passport_number || "805749";
  const ticket = flight.ticket_number || "DL80287608";
  const seat = flight.seat || "3C (Window) • All flights";
  const baggage = flight.baggage || "2 pieces checked • 1 carry-on";
  const flightDate = formatDate(flight.flight_date);
  const totalPrice = `${flight.currency || "$"}${flight.total_price || "2,482"}`;
  const gateDep = flight.gate_departure || "Gate 4";
  const gateArr = flight.gate_arrival || "Gate 2";
  const status = flight.status || "Missed";
  const airline = flight.airline_name || "Delta Air Lines";
  const airlineCode = flight.airline_code || "DL";
  const operated = flight.operated_by || "SkyWest DBA Delta Connection";
  const flightNum = flight.flight_number || "DL3917 DL802";
  const tripType = flight.trip_type || "ONE WAY";
  const classLabel = flight.class || "Delta First";
  const boardGroup = flight.boarding_group || "A";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 10% 30%, #f8fafc 0%, #e2e8f0 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: { xs: 1.5, sm: 3 },
        gap: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: 700 }}
      >
        <Paper
          ref={passRef}
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 700,
            borderRadius: { xs: 3, sm: 4 },
            overflow: "hidden",
            bgcolor: "#ffffff",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            position: "relative",
          }}
        >
          {/* Decorative Top Bar */}
          <Box
            sx={{
              height: 8,
              background:
                "linear-gradient(90deg, #0f2b5e 0%, #1e4a8b 50%, #2e6bb5 100%)",
            }}
          />

          <Box sx={{ p: { xs: 2, sm: 4 } }}>
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  sx={{
                    bgcolor: "#0f2b5e",
                    width: { xs: 48, sm: 56 },
                    height: { xs: 48, sm: 56 },
                    borderRadius: 2,
                    fontSize: { xs: 16, sm: 20 },
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {airlineCode}
                </Avatar>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748b",
                      fontWeight: 500,
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                    }}
                  >
                    {airline}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#0f2b5e",
                      letterSpacing: "-0.5px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    {flightNum}
                    <Chip
                      label={tripType}
                      size="small"
                      sx={{
                        bgcolor: alpha("#0f2b5e", 0.1),
                        color: "#0f2b5e",
                        fontWeight: 700,
                        fontSize: "0.5rem",
                        height: 18,
                      }}
                    />
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#94a3b8", display: "block" }}
                  >
                    ¹ {operated}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                {/* Dynamic status chip using MUI color */}
                <Chip
                  label={status}
                  size="small"
                  color={getStatusColor(status)}
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "0.55rem", sm: "0.7rem" },
                    mb: 0.5,
                    height: { xs: 20, sm: 24 },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: "#94a3b8",
                    display: "block",
                    fontSize: { xs: "0.55rem", sm: "0.7rem" },
                  }}
                >
                  {classLabel} • <br />
                  Boarding Group {boardGroup}
                </Typography>
              </Box>
            </Box>

            {/* Pet in cabin badge (unchanged, still commented) */}
            {/* <Box ... > ... </Box> */}

            {/* Flight Route with Stops */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                borderRadius: 3,
                p: { xs: 1.5, sm: 3 },
                mb: 3,
                border: "1px solid rgba(226, 232, 240, 0.6)",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#0f2b5e",
                  fontWeight: 700,
                  mb: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: { xs: "0.7rem", sm: "0.875rem" },
                }}
              >
                <TimelineIcon sx={{ fontSize: { xs: 16, sm: 18 } }} /> {tripType} •{" "}
                {flight.layover_count || 1} STOP
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {/* NBO */}
                <Box sx={{ textAlign: "center", minWidth: 0, flex: 1 }}>
                  <Tooltip title={flight.departure_airport_name || "Ekambasi, Nairobi"} arrow>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "#0f2b5e",
                        fontSize: { xs: "1rem", sm: "1.5rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      {depCode}
                    </Typography>
                  </Tooltip>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      display: "block",
                      fontSize: { xs: "0.65rem", sm: "0.7rem" },
                    }}
                  >
                    {depCity}
                  </Typography>
                </Box>

                <FlightTakeoffIcon
                  sx={{
                    color: "#94a3b8",
                    fontSize: { xs: 14, sm: 18 },
                    mx: { xs: 0.5, sm: 1 },
                    flexShrink: 0,
                  }}
                />

                {/* DOH (layover) */}
                <Box sx={{ textAlign: "center", minWidth: 0, flex: 1 }}>
                  <Tooltip title={flight.layover_airport_name || "Qatar, QA"} arrow>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "#0f2b5e",
                        fontSize: { xs: "1rem", sm: "1.5rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      {layoverCode}
                    </Typography>
                  </Tooltip>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      display: "block",
                      fontSize: { xs: "0.65rem", sm: "0.7rem" },
                    }}
                  >
                    {layoverCity}
                  </Typography>
                  <Chip
                    label={layoverDuration}
                    size="small"
                    sx={{
                      mt: 0.5,
                      height: 16,
                      fontSize: "0.5rem",
                      bgcolor: alpha("#f59e0b", 0.1),
                      color: "#f59e0b",
                    }}
                  />
                </Box>

                <FlightTakeoffIcon
                  sx={{
                    color: "#94a3b8",
                    fontSize: { xs: 14, sm: 18 },
                    mx: { xs: 0.5, sm: 1 },
                    flexShrink: 0,
                  }}
                />

                {/* ORD (Final) */}
                <Box sx={{ textAlign: "center", minWidth: 0, flex: 1 }}>
                  <Tooltip title={flight.arrival_airport_name || "Chicago, IL"} arrow>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "#0f2b5e",
                        fontSize: { xs: "1rem", sm: "1.5rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      {arrCode}
                    </Typography>
                  </Tooltip>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      display: "block",
                      fontSize: { xs: "0.65rem", sm: "0.7rem" },
                    }}
                  >
                    {arrCity}
                  </Typography>
                </Box>
              </Box>

              {/* Journey summary */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  pt: 1.5,
                  borderTop: "1px dashed #cbd5e1",
                  gap: 1,
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      fontSize: { xs: "0.55rem", sm: "0.7rem" },
                    }}
                  >
                    First Departure
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "#0f2b5e",
                      fontSize: { xs: "0.65rem", sm: "0.875rem" },
                    }}
                  >
                    {depTime} • {depCode}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      fontSize: { xs: "0.55rem", sm: "0.7rem" },
                    }}
                  >
                    Total Journey
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "#0f2b5e",
                      fontSize: { xs: "0.65rem", sm: "0.875rem" },
                    }}
                  >
                    {totalDuration}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      fontSize: { xs: "0.55rem", sm: "0.7rem" },
                    }}
                  >
                    Final Arrival
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "#0f2b5e",
                      fontSize: { xs: "0.65rem", sm: "0.875rem" },
                    }}
                  >
                    {arrTime} • {arrCode}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Time Cards */}
            <Grid container spacing={1.5} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    bgcolor: alpha("#0891b2", 0.04),
                    borderRadius: 2,
                    border: "1px solid rgba(8, 145, 178, 0.1)",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                      mb: 0.5,
                    }}
                  >
                    <AccessTimeIcon
                      sx={{ color: "#0891b2", fontSize: { xs: 16, sm: 20 } }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#0891b2",
                        fontWeight: 600,
                        fontSize: { xs: "0.65rem", sm: "0.875rem" },
                      }}
                    >
                      FIRST DEPARTURE
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "#0f2b5e",
                      fontSize: { xs: "1.5rem", sm: "2.125rem" },
                    }}
                  >
                    {depTime}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      fontSize: { xs: "0.55rem", sm: "0.7rem" },
                    }}
                  >
                    {depCity.split(",")[0]} ({depCode}) • {gateDep}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    bgcolor: alpha("#059669", 0.04),
                    borderRadius: 2,
                    border: "1px solid rgba(5, 150, 105, 0.1)",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                      mb: 0.5,
                    }}
                  >
                    <AccessTimeIcon
                      sx={{ color: "#059669", fontSize: { xs: 16, sm: 20 } }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#059669",
                        fontWeight: 600,
                        fontSize: { xs: "0.65rem", sm: "0.875rem" },
                      }}
                    >
                      FINAL ARRIVAL
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "#0f2b5e",
                      fontSize: { xs: "1.5rem", sm: "2.125rem" },
                    }}
                  >
                    {arrTime}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      fontSize: { xs: "0.55rem", sm: "0.7rem" },
                    }}
                  >
                    {arrCity.split(",")[0]} ({arrCode}) • {gateArr}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Passenger Details */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <DetailItem
                  icon={
                    <ConfirmationNumberIcon
                      sx={{ fontSize: { xs: 14, sm: 16 }, color: "#0f2b5e" }}
                    />
                  }
                  label="TICKET NUMBER"
                  value={ticket}
                />
                <DetailItem
                  icon={
                    <EventSeatIcon
                      sx={{ fontSize: { xs: 14, sm: 16 }, color: "#0f2b5e" }}
                    />
                  }
                  label="SEAT"
                  value={seat}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  {/* Pet icon and text (commented as original) */}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem
                  icon={
                    <LuggageIcon
                      sx={{ fontSize: { xs: 14, sm: 16 }, color: "#0f2b5e" }}
                    />
                  }
                  label="BAGGAGE"
                  value={baggage}
                />
                <DetailItem
                  icon={
                    <FlightTakeoffIcon
                      sx={{ fontSize: { xs: 14, sm: 16 }, color: "#0f2b5e" }}
                    />
                  }
                  label="FLIGHT DATE"
                  value={flightDate}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  {/* Info icon (commented) */}
                </Box>
              </Grid>
            </Grid>

            {/* Passenger Name */}
            <Box
              sx={{
                bgcolor: "#f8fafc",
                p: { xs: 1.5, sm: 2 },
                borderRadius: 2,
                mb: 3,
                border: "1px solid #e2e8f0",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#64748b",
                  display: "block",
                  mb: 0.5,
                  fontSize: { xs: "0.6rem", sm: "0.7rem" },
                }}
              >
                PASSENGER
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#0f2b5e",
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                }}
              >
                {passengerName}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 0.5,
                }}
              >
                {/* Pet icon (commented) */}
              </Box>
            </Box>

            {/* Price & Barcode Section */}
            <Box
              sx={{
                bgcolor: "#ffffff",
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                border: "2px dashed #cbd5e1",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      display: "block",
                      textAlign: "left",
                    }}
                  >
                    Total paid
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, color: "#0f2b5e" }}
                  >
                    {totalPrice}
                  </Typography>
                </Box>
                <Chip
                  label={classLabel}
                  sx={{
                    bgcolor: alpha("#0f2b5e", 0.1),
                    color: "#0f2b5e",
                    fontWeight: 700,
                  }}
                />
              </Box>
              <ModernBarcode />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#0f2b5e",
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                  }}
                >
                  {depCode} → {layoverCode} → {arrCode}
                </Typography>
                <QrCode2Icon
                  sx={{ color: "#0f2b5e", fontSize: { xs: 24, sm: 28 } }}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: "#64748b",
                  fontSize: { xs: "0.55rem", sm: "0.7rem" },
                }}
              >
                Scan for mobile boarding • {tripType} • {flightDate}
              </Typography>
            </Box>

            {/* Amenities (unchanged) */}
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Chip
                icon={<WifiIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                label="Wi-Fi"
                size="small"
                variant="outlined"
                sx={{
                  color: "#64748b",
                  fontSize: { xs: "0.65rem", sm: "0.7rem" },
                  height: { xs: 24, sm: 28 },
                }}
              />
              <Chip
                icon={<PowerIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                label="Power"
                size="small"
                variant="outlined"
                sx={{
                  color: "#64748b",
                  fontSize: { xs: "0.65rem", sm: "0.7rem" },
                  height: { xs: 24, sm: 28 },
                }}
              />
              <Chip
                label="Snacks"
                size="small"
                variant="outlined"
                sx={{
                  color: "#64748b",
                  fontSize: { xs: "0.65rem", sm: "0.7rem" },
                  height: { xs: 24, sm: 28 },
                }}
              />
              {/* Pet service chip (commented) */}
            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              bgcolor: "#f8fafc",
              borderTop: "1px solid #e2e8f0",
              p: { xs: 1.5, sm: 2 },
              textAlign: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#94a3b8",
                fontSize: { xs: "0.55rem", sm: "0.7rem" },
              }}
            >
              Please arrive at the gate at least 30 minutes before departure •
              Have your ID ready
            </Typography>
            {/* Pet reminder (commented) */}
          </Box>
        </Paper>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            component={Link}
            to="/"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 3,
              borderColor: "#cbd5e1",
              color: "#475569",
              fontWeight: 600,
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
              "&:hover": {
                borderColor: "#0f2b5e",
                bgcolor: alpha("#0f2b5e", 0.02),
              },
            }}
          >
            Back to Home
          </Button>
          <Button
            onClick={handleDownload}
            variant="contained"
            startIcon={<DownloadIcon />}
            sx={{
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 3,
              bgcolor: "#0f2b5e",
              color: "white",
              fontWeight: 600,
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
              boxShadow: "0 10px 20px -5px rgba(15, 43, 94, 0.3)",
              "&:hover": {
                bgcolor: "#1a3a7a",
                transform: "translateY(-2px)",
                boxShadow: "0 15px 25px -5px rgba(15, 43, 94, 0.4)",
              },
            }}
          >
            Download Boarding Pass
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default BoardingPass;