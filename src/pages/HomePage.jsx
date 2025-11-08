import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import FlightCard from "../components/FlightCard";

const carouselImages = [
  "https://images.unsplash.com/photo-1503424886307-b090341d25d1?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1000&q=80",
];

// Sample flights data
const flights = Array.from({ length: 10 }).map((_, i) => ({
  airline: `Airline ${i + 1}`,
  logo: "https://cdn-icons-png.flaticon.com/512/744/744922.png",
  from: "DPS",
  to: "CGK",
  time: "1h 45m",
  price: (100 + i * 20).toFixed(0),
}));

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Auto-change carousel image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll effect for hero fade/shrink starting at 50%
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero-section");
      if (!hero) return;

      const heroHeight = hero.offsetHeight;
      const scrollY = window.scrollY;

      // No animation before 50% scroll
      if (scrollY < heroHeight * 0.5) {
        setScrollProgress(0);
        return;
      }

      // Normalize between 50% and 100% of hero height
      const ratio = Math.min((scrollY - heroHeight * 0.5) / (heroHeight * 0.5), 1);
      setScrollProgress(ratio);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Derived styles
  const heroOpacity = 1 - scrollProgress; // fades out
  const heroScale = 1 - scrollProgress * 0.2; // shrinks smoothly (1 → 0.8)

  return (
    <Box sx={{ overflowX: "hidden", width: "100%" }}>
      {/* Airport Image Carousel */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "15vh", md: "15vh" },
          backgroundImage: `url(${carouselImages[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "20px 20px 20px 20px",
          transition: "background-image 1s ease-in-out",
          mb: 2,
        }}
      />

      {/* Hero Section */}
      <Box
        id="hero-section"
        sx={{
          width: "100%",
          mx: "auto",
          height: { xs: "70vh", md: "70vh" },
          background:
            "linear-gradient(135deg, #0d47a1 0%, #1976d2 40%, #00bcd4 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          mt: 2,
          transform: `scale(${heroScale})`,
          opacity: heroOpacity,
          transition: "transform 0.25s ease-out, opacity 0.25s ease-out",
        }}
      >
        <Container>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2.2rem", md: "3.8rem" },
              textShadow: "2px 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Fly With Ease
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 5,
              textShadow: "1px 1px 5px rgba(0,0,0,0.3)",
              fontSize: { xs: "1rem", md: "1.3rem" },
              opacity: 0.95,
            }}
          >
            Book your flight and track it in real-time
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              component={Link}
              to="/"
              variant="contained"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 3,
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#0d47a1" },
              }}
            >
              Book Now
            </Button>

            <Button
              component={Link}
              to="/track"
              variant="outlined"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 3,
                color: "#fff",
                borderColor: "#fff",
                "&:hover": {
                  borderColor: "#00bcd4",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Track Flight
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Flight Booking Form */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            textAlign: "center",
            color: "#0d47a1",
            fontWeight: 600,
          }}
        >
          Book Your Flight
        </Typography>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            justifyContent: "center",
            mb: 6,
          }}
        >
          <TextField label="From" variant="outlined" fullWidth />
          <TextField label="To" variant="outlined" fullWidth />
          <TextField
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <Button
            variant="contained"
            sx={{
              px: 4,
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#0d47a1" },
            }}
          >
            Search Flights
          </Button>
        </Box>

        {/* Available Flights */}
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            textAlign: "center",
            color: "#0d47a1",
            fontWeight: 600,
          }}
        >
          Available Flights
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {flights.map((flight, index) => (
            <FlightCard key={index} flight={flight} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
