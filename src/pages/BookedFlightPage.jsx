import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DownloadIcon from "@mui/icons-material/Download";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";

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
        scale: 2, // Higher resolution
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
        bgcolor: "#e9f0fb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        gap: 3,
      }}
    >
      {/* Boarding Pass */}
      <Paper
        ref={passRef}
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
          bgcolor: "#fff",
          fontFamily: "'Inter', sans-serif",
          display: "flex",
          flexDirection: "column",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.9s cubic-bezier(0.25, 0.8, 0.25, 1)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: "#0a4fa3",
            color: "white",
            textAlign: "center",
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <FlightTakeoffIcon />
          <Typography variant="subtitle1" fontWeight={600}>
            BOARDING PASS
          </Typography>
        </Box>

        {/* Airline & Route */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 2,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#0a4fa3" }}>
              Jomo Kenyatta International Airport (JKIA){" "}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              GA 089 • Economy
            </Typography>
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Typography variant="body2" color="text.secondary">
              Date: <strong>Nov 09 2025</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Boarding: <strong>01:30 PM</strong>
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Flight Route */}
        <Grid
          container
          spacing={0}
          sx={{
            py: 2,
            px: 3,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={4}>
            <Typography variant="h5" fontWeight={700}>
              JKIA
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Kenya
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography
              variant="body2"
              color="#0a4fa3"
              fontWeight={600}
              sx={{ mb: 0.5 }}
            >
              16h 30m
            </Typography>
            <Typography variant="h5" component="div">
              ✈️
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h5" fontWeight={700}>
              IBIA
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Austin
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        {/* Time Info */}
        <Grid
          container
          spacing={0}
          sx={{
            py: 1.5,
            px: 3,
            textAlign: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Departure
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              10:00 AM
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Arrival
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              05:30 PM
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        {/* Passenger Info */}
        <Box sx={{ px: 3, py: 2 }}>
          <Grid container spacing={1.5}>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Passenger Name
              </Typography>
              <Typography fontWeight={600}>Alexander Perisic</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption" color="text.secondary">
                Terminal
              </Typography>
              <Typography fontWeight={600}>1</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption" color="text.secondary">
                Gate
              </Typography>
              <Typography fontWeight={600}>A1</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Seat
              </Typography>
              <Typography fontWeight={600}>B24</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Ticket No.
              </Typography>
              <Typography fontWeight={600}>GA1028394</Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Barcode Footer */}
        <Box sx={{ textAlign: "center", py: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Please present this boarding pass at the gate
          </Typography>
          <Box
            sx={{
              mt: 1.5,
              height: 70,
              width: "80%",
              mx: "auto",
              bgcolor: "#000",
              borderRadius: 1,
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: "block" }}
          >
            GA • JKIA → IATA • Nov 09 2025
          </Typography>
        </Box>
      </Paper>

      {/* Button Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.2s",
        }}
      >
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            px: 5,
            py: 1.5,
            fontWeight: 600,
            borderRadius: 3,
            bgcolor: "#0a4fa3",
            color: "#fff",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            "&:hover": {
              bgcolor: "#083b7a",
              boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
            },
          }}
        >
          Exit / Back to Home
        </Button>

        <IconButton
          onClick={handleDownload}
          sx={{
            bgcolor: "#0a4fa3",
            color: "#fff",
            p: 1.2,
            borderRadius: 2,
            "&:hover": { bgcolor: "#083b7a" },
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <DownloadIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default BoardingPass;
