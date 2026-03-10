import React, { useEffect, useState, useRef } from "react";
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
        fontSize: { xs: "0.65rem", sm: "0.7rem" },
      }}
    >
      {icon} {label}
    </Typography>
    <Typography
      variant="body1"
      sx={{ fontWeight: 600, color, fontSize: { xs: "0.95rem", sm: "1.1rem" } }}
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
                  DL
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
                    Delta Air Lines
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
                    DL802 DL2443 DL3917
                    <Chip
                      label="ONE WAY"
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
                    ¹ DL3917 operated by SkyWest DBA Delta Connection
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Chip
                  label="READY FOR BOARDING"
                  size="small"
                  sx={{
                    bgcolor: alpha("#059669", 0.1),
                    color: "#059669",
                    fontWeight: 700,
                    fontSize: { xs: "0.55rem", sm: "0.7rem" },
                    border: "1px solid rgba(5, 150, 105, 0.3)",
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
                  Delta First • <br />
                  Boarding Group A
                </Typography>
              </Box>
            </Box>

            {/* Pet in cabin badge */}
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
                  icon={<PetsIcon sx={{ fontSize: { xs: 14, sm: 18 } }} />}
                  label="PET IN CABIN • Cabin Approved"
                  color="secondary"
                  sx={{
                    bgcolor: alpha("#9c27b0", 0.1),
                    color: "#9c27b0",
                    fontWeight: 700,
                    fontSize: { xs: "0.65rem", sm: "0.8rem" },
                    border: "1px solid rgba(156, 39, 176, 0.3)",
                    py: { xs: 1, sm: 2 },
                    height: { xs: 28, sm: 32 },
                    "& .MuiChip-icon": {
                      color: "#9c27b0",
                    },
                  }}
                />
              </Tooltip>
            </Box>

            {/* Flight Route with Stops - PDX → JFK → DTW → FWA */}
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
                <TimelineIcon sx={{ fontSize: { xs: 16, sm: 18 } }} /> ONE WAY •
                2 STOPS
              </Typography>

              {/* Main route row */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {/* PDX */}
                <Box sx={{ textAlign: "center", minWidth: 0, flex: 1 }}>
                  <Tooltip title="Portland, OR" arrow>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "#0f2b5e",
                        fontSize: { xs: "1rem", sm: "1.5rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      PDX
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
                    Portland, OR
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

                {/* JFK */}
                <Box sx={{ textAlign: "center", minWidth: 0, flex: 1 }}>
                  <Tooltip title="New York, NY" arrow>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "#0f2b5e",
                        fontSize: { xs: "1rem", sm: "1.5rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      JFK
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
                    NY
                  </Typography>
                  <Chip
                    label="5h 19m"
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

                {/* DTW */}
                <Box sx={{ textAlign: "center", minWidth: 0, flex: 1 }}>
                  <Tooltip title="Detroit,MI" arrow>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "#0f2b5e",
                        fontSize: { xs: "1rem", sm: "1.5rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      DTW
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
                    MI
                  </Typography>
                  <Chip
                    label="3h 10m"
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

                {/* FWA (Final) */}
                <Box sx={{ textAlign: "center", minWidth: 0, flex: 1 }}>
                  <Tooltip title="Fort Wayne, IN" arrow>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "#0f2b5e",
                        fontSize: { xs: "1rem", sm: "1.5rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      FWA
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
                    Fort Wayne, IN
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
                    7:58PM • PDX
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
                    15h 59m
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
                    10:59 AM • FWA
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
                    7:58 PM
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      fontSize: { xs: "0.55rem", sm: "0.7rem" },
                    }}
                  >
                    Portland (PDX) • Gate 4
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
                    10:59 PM
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      fontSize: { xs: "0.55rem", sm: "0.7rem" },
                    }}
                  >
                    Fort Wayne (FWA) • Gate 2
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
                  value="DL80287608"
                />
                <DetailItem
                  icon={
                    <EventSeatIcon
                      sx={{ fontSize: { xs: 14, sm: 16 }, color: "#0f2b5e" }}
                    />
                  }
                  label="SEAT"
                  value="3C (Window) • All flights"
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  <PetsIcon
                    sx={{ color: "#9c27b0", fontSize: { xs: 16, sm: 18 } }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#9c27b0",
                      fontWeight: 600,
                      fontSize: { xs: "0.65rem", sm: "0.7rem" },
                    }}
                  >
                    Service Animal: "Coco" (In-cabin)
                  </Typography>
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
                  value="2 pieces + Pet carrier"
                />
                <DetailItem
                  icon={
                    <FlightTakeoffIcon
                      sx={{ fontSize: { xs: 14, sm: 16 }, color: "#0f2b5e" }}
                    />
                  }
                  label="FLIGHT DATE"
                  value="March 10, 2026"
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  <InfoIcon
                    sx={{ color: "#64748b", fontSize: { xs: 14, sm: 16 } }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      fontSize: { xs: "0.65rem", sm: "0.7rem" },
                    }}
                  >
                    Pet carrier counts as carry-on
                  </Typography>
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
                GINA WELLS
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 0.5,
                }}
              >
                <PetsIcon
                  sx={{ color: "#9c27b0", fontSize: { xs: 12, sm: 14 } }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: "#9c27b0",
                    fontWeight: 500,
                    fontSize: { xs: "0.6rem", sm: "0.7rem" },
                  }}
                >
                  Traveling with service animal (Pomeranian - "Coco")
                </Typography>
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
                    $1,562
                  </Typography>
                </Box>
                <Chip
                  label="Delta First"
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
                  PDX → JFK → DTW → FWA
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
                Scan for mobile boarding • One way • March 10 2026
              </Typography>
            </Box>

            {/* Amenities */}
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
              <Chip
                icon={<PetsIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                label="Pet Service"
                size="small"
                sx={{
                  bgcolor: alpha("#9c27b0", 0.1),
                  color: "#9c27b0",
                  borderColor: alpha("#9c27b0", 0.3),
                  fontSize: { xs: "0.65rem", sm: "0.7rem" },
                  height: { xs: 24, sm: 28 },
                  "& .MuiChip-icon": { color: "#9c27b0" },
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
            <Typography
              variant="caption"
              sx={{
                color: "#9c27b0",
                display: "block",
                mt: 0.5,
                fontSize: { xs: "0.55rem", sm: "0.7rem" },
              }}
            >
              🐾 Service animal must remain in carrier during flight • 2-stop
              journey
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
