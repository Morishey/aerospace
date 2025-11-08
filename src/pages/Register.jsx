import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  keyframes,
  InputAdornment,
  IconButton,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { Link, useNavigate } from "react-router-dom";

// ✨ Floating animation
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Save user data locally for now (you can replace this with backend call later)
    localStorage.setItem("user", JSON.stringify({ email, password }));
    navigate("/login");
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError("");
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

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
          Create your account to get started.
        </Typography>

        <form onSubmit={handleRegister}>
          {/* Email Field */}
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={email}
            onChange={handleInputChange(setEmail)}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            sx={{ mb: 2 }}
            value={password}
            onChange={handleInputChange(setPassword)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    <span style={{ fontSize: "1.5rem" }}>
                      {showPassword ? "🙈" : "👁️"}
                    </span>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password Field */}
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type={showConfirmPassword ? "text" : "password"}
            sx={{ mb: 2 }}
            value={confirmPassword}
            onChange={handleInputChange(setConfirmPassword)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowConfirmPassword} edge="end">
                    <span style={{ fontSize: "1.5rem" }}>
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </span>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Error Message */}
          {error && (
            <Typography
              sx={{
                color: "error.main",
                fontSize: "0.875rem",
                mb: 2,
                transition: "opacity 0.3s ease",
              }}
            >
              {error}
            </Typography>
          )}

          {/* Register Button */}
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
