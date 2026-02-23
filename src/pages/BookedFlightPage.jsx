import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Grid,
  Button,
  IconButton,
  Avatar,
  Chip,
  Container,
  alpha,
  Tooltip,
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
import { Link } from "react-router-dom";
import html2canvas from "html2canvas"; 
import { motion } from "framer-motion";

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
      }}
    >
      {icon} {label}
    </Typography>
    <Typography
      variant="body1"
      sx={{ fontWeight: 600, color, fontSize: "1.1rem" }}
    >
      {value}
    </Typography>
  </Box>
);

const BoardingPass = () => {
  const [loaded, setLoaded] = useState(false);
  const passRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = async () => {
    if (!passRef.current) return;
    const element = passRef.current;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#fff",
        scale: 2,
        logging: false,
      });
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "boarding-pass.png";
      link.click();
    } catch (error) {
      console.error("Screenshot failed:", error);
    }
  };

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
        p: { xs: 2, sm: 3 },
        gap: 3,
      }}
    >
      {/* Modern Boarding Pass Card */}
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
            borderRadius: 4,
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

          {/* Main Content */}
          <Box sx={{ p: { xs: 3, sm: 4 } }}>
            {/* Header with Airline Logo and Status */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "#0f2b5e",
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    fontSize: 20,
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  DL
                </Avatar>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#64748b", fontWeight: 500 }}
                  >
                    SkyWest DBA
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#0f2b5e",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    DL 802
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Chip
                  label="Flight Canceled • Contact Support"
                  size="medium"
                  sx={{
                    bgcolor: alpha("#ef4444", 0.1),
                    color: "#ef4444",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    border: "1px solid #ef4444d9",
                    mb: 1,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: "#94a3b8", display: "block" }}
                >
                  First Class • <br />Boarding Group A
                </Typography>
              </Box>
            </Box>

            {/* Pet in cabin Badge - NEW */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Tooltip title="Service animal accompanying passenger">
                <Chip
                  icon={<PetsIcon />}
                  label="PET IN CABIN • Cabin Approved"
                  color="secondary"
                  sx={{
                    bgcolor: alpha("#9c27b0", 0.1),
                    color: "#9c27b0",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    border: "1px solid rgba(156, 39, 176, 0.3)",
                    py: 2,
                    "& .MuiChip-icon": {
                      color: "#9c27b0",
                    },
                  }}
                />
              </Tooltip>
            </Box>

            {/* Flight Route - Modern Design */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                borderRadius: 3,
                p: 3,
                mb: 3,
                border: "1px solid rgba(226, 232, 240, 0.6)",
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={5} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      color: "#0f2b5e",
                      fontSize: { xs: "2rem", sm: "3rem" },
                    }}
                  >
                    BOI
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#475569", fontWeight: 500 }}
                  >
                    Boise
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                    Terminal 4
                  </Typography>
                </Grid>

                <Grid item xs={2} sx={{ textAlign: "center" }}>
                  <Box sx={{ position: "relative" }}>
                    <FlightTakeoffIcon
                      sx={{
                        color: "#0f2b5e",
                        fontSize: 24,
                        transform: "rotate(90deg)",
                        mb: 1,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "#0f2b5e" }}
                    >
                      12h 5m
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        height: 2,
                        background:
                          "linear-gradient(90deg, transparent, #0f2b5e 20%, #0f2b5e 80%, transparent)",
                        my: 1,
                      }}
                    />
                    <FlightLandIcon
                      sx={{
                        color: "#0f2b5e",
                        fontSize: 24,
                        transform: "rotate(90deg)",
                        mt: 1,
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={5} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      color: "#0f2b5e",
                      fontSize: { xs: "2rem", sm: "3rem" },
                    }}
                  >
                    FWA
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#475569", fontWeight: 500 }}
                  >
                    Fort Wayne
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                    Terminal 1
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Time Information Cards */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: alpha("#0891b2", 0.04),
                    borderRadius: 2,
                    border: "1px solid rgba(8, 145, 178, 0.1)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <AccessTimeIcon sx={{ color: "#0891b2", fontSize: 20 }} />
                    <Typography
                      variant="body2"
                      sx={{ color: "#0891b2", fontWeight: 600 }}
                    >
                      DEPARTURE
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#0f2b5e" }}
                  >
                    7:00 AM
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    Gate 8 • Boarding 6:50 AM
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: alpha("#059669", 0.04),
                    borderRadius: 2,
                    border: "1px solid rgba(5, 150, 105, 0.1)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <AccessTimeIcon sx={{ color: "#059669", fontSize: 20 }} />
                    <Typography
                      variant="body2"
                      sx={{ color: "#059669", fontWeight: 600 }}
                    >
                      ARRIVAL
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#0f2b5e" }}
                  >
                    9:05 PM
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    Gate 12 • On time
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Passenger Details Grid with Pet Information */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6}>
                <DetailItem
                  icon={
                    <ConfirmationNumberIcon
                      sx={{ fontSize: 16, color: "#0f2b5e" }}
                    />
                  }
                  label="TICKET NUMBER"
                  value="DL10280088"
                />
                <DetailItem
                  icon={
                    <EventSeatIcon sx={{ fontSize: 16, color: "#0f2b5e" }} />
                  }
                  label="SEAT"
                  value="12F (Window)"
                />
                {/* Pet in cabin Detail - NEW */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                  <PetsIcon sx={{ color: "#9c27b0", fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: "#9c27b0", fontWeight: 600 }}>
                    Service Animal: "Coco" (Cabin)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem
                  icon={<LuggageIcon sx={{ fontSize: 16, color: "#0f2b5e" }} />}
                  label="BAGGAGE"
                  value="2 pieces • Carousel 5"
                />
                <DetailItem
                  icon={
                    <FlightTakeoffIcon
                      sx={{ fontSize: 16, color: "#0f2b5e" }}
                    />
                  }
                  label="FLIGHT DATE"
                  value="February 23, 2026"
                />
                {/* Additional Pet Info */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                  <InfoIcon sx={{ color: "#64748b", fontSize: 16 }} />
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    Pet carrier counts as carry-on
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Passenger Name - Prominent Display */}
            <Box
              sx={{
                bgcolor: "#f8fafc",
                p: 2,
                borderRadius: 2,
                mb: 3,
                border: "1px solid #e2e8f0",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#64748b", display: "block", mb: 0.5 }}
              >
                PASSENGER
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#0f2b5e" }}
              >
                GINA WELLS
              </Typography>
              {/* Pet name under passenger - NEW */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                <PetsIcon sx={{ color: "#9c27b0", fontSize: 14 }} />
                <Typography variant="caption" sx={{ color: "#9c27b0", fontWeight: 500 }}>
                  Traveling with service animal (Pomeranian - "Coco")
                </Typography>
              </Box>
            </Box>

            {/* Barcode Section */}
            <Box
              sx={{
                bgcolor: "#ffffff",
                p: 3,
                borderRadius: 2,
                border: "2px dashed #cbd5e1",
                textAlign: "center",
              }}
            >
              <ModernBarcode />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#0f2b5e" }}
                >
                  BOI → FWA
                </Typography>
                <QrCode2Icon sx={{ color: "#0f2b5e", fontSize: 28 }} />
              </Box>
              <Typography variant="caption" sx={{ color: "#64748b" }}>
                Scan for mobile boarding • Flight DL802 • Feb 23 2026
              </Typography>
            </Box>

            {/* Flight Amenities with Pet Icon */}
            <Box
              sx={{
                mt: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Chip
                icon={<WifiIcon />}
                label="Wi-Fi"
                size="small"
                variant="outlined"
                sx={{ color: "#64748b" }}
              />
              <Chip
                icon={<PowerIcon />}
                label="Power"
                size="small"
                variant="outlined"
                sx={{ color: "#64748b" }}
              />
              <Chip
                label="Snacks"
                size="small"
                variant="outlined"
                sx={{ color: "#64748b" }}
              />
              {/* Pet amenity chip - NEW */}
              <Chip
                icon={<PetsIcon />}
                label="Pet Service"
                size="small"
                sx={{
                  bgcolor: alpha("#9c27b0", 0.1),
                  color: "#9c27b0",
                  borderColor: alpha("#9c27b0", 0.3),
                  "& .MuiChip-icon": {
                    color: "#9c27b0",
                  },
                }}
                variant="outlined"
              />
            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              bgcolor: "#f8fafc",
              borderTop: "1px solid #e2e8f0",
              p: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>
              Please arrive at the gate at least 30 minutes before departure •
              Have your ID ready
            </Typography>
            {/* Pet reminder in footer - NEW */}
            <Typography variant="caption" sx={{ color: "#9c27b0", display: "block", mt: 0.5 }}>
              🐾 Service animal must remain in carrier during flight
            </Typography>
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
              px: 4,
              py: 1.5,
              borderRadius: 3,
              borderColor: "#cbd5e1",
              color: "#475569",
              fontWeight: 600,
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
              px: 4,
              py: 1.5,
              borderRadius: 3,
              bgcolor: "#0f2b5e",
              color: "white",
              fontWeight: 600,
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