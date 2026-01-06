import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { FlightCard, flights } from "../components/FlightCard";

// ✅ Import your local image
import womanImage from "../assets/images/lady.PNG";

const carouselImages = [
  "https://images.unsplash.com/photo-1503424886307-b090341d25d1?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&w=1000&q=80",
  "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1000&q=80",
];

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero-section");
      if (!hero) return;
      const heroHeight = hero.offsetHeight;
      const scrollY = window.scrollY;
      if (scrollY < heroHeight * 0.5) {
        setScrollProgress(0);
        return;
      }
      const ratio = Math.min((scrollY - heroHeight * 0.5) / (heroHeight * 0.5), 1);
      setScrollProgress(ratio);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroOpacity = 1 - scrollProgress;
  const heroScale = 1 - scrollProgress * 0.2;

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking-form");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          borderRadius: "20px",
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
          background: "linear-gradient(135deg, #0d47a1 0%, #1976d2 40%, #00bcd4 100%)",
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
        {/* ✅ Corporate Woman Image (now on the LEFT) */}
        <Box
          component="img"
          src={womanImage}
          alt="Corporate Woman"
          sx={{
            position: "absolute",
            left: { xs: "2%", md: "15%" },
            bottom: 0,
            height: { xs: "85%", md: "80%" },
            opacity: 0.9,
            zIndex: 1,
            objectFit: "contain",
            pointerEvents: "none",
            transform: { xs: "none", md: "scaleX(1)" }, // optional flip for side posture
          }}
        />

        {/* Hero Text */}
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2.2rem", md: "3.8rem" },
              textShadow: "2px 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Fly With Ease <br />Aerospace
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
              variant="contained"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 3,
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#0d47a1" },
              }}
              onClick={scrollToBooking}
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

      {/* Book Your Flight Section */}
      <Container id="booking-form" sx={{ py: 6 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            textAlign: "center",
            color: "#0d47a1",
            fontWeight: 700,
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
            alignItems: "center",
            mb: 6,
            bgcolor: "#f5f5f5",
            p: { xs: 2, md: 3 },
            borderRadius: 2,
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <TextField
            label="From"
            variant="outlined"
            size="small"
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="To"
            variant="outlined"
            size="small"
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Departure Date"
            type="date"
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />
          <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1.5,
              bgcolor: "#1976d2",
              color: "#fff",
              fontWeight: 600,
              "&:hover": { bgcolor: "#0d47a1" },
            }}
          >
            Search
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
