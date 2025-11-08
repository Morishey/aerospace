import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  keyframes,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { Link, useNavigate } from "react-router-dom";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 420,
          textAlign: "center",
        }}
      >
        {/* ✈️ Animated Logo Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mb: 3,
            animation: `${float} 3s ease-in-out infinite`,
          }}
        >
          <FlightTakeoffIcon
            sx={{
              fontSize: 40,
              color: "primary.main",
              filter: "drop-shadow(0 2px 4px rgba(25,118,210,0.4))",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              color: "primary.main",
              fontWeight: 800,
              letterSpacing: 0.5,
              textShadow: "0 2px 4px rgba(25,118,210,0.3)",
            }}
          >
            AeroSpace
          </Typography>
        </Box>

        <Typography sx={{ color: "text.secondary", mb: 3 }}>
          Create your account to start booking flights!
        </Typography>

        <form onSubmit={handleRegister}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.4,
              fontWeight: 700,
              fontSize: "1rem",
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "#1565c0" },
            }}
          >
            Register
          </Button>
        </form>

        <Typography sx={{ mt: 3, color: "text.secondary" }}>
          Already have an account?{" "}
          <MuiLink
            component={Link}
            to="/login"
            sx={{
              color: "secondary.main",
              fontWeight: 600,
              "&:hover": { color: "primary.main" },
            }}
          >
            Login
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
}
