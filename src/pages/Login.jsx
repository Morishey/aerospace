import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  CircularProgress,
  IconButton,
  InputAdornment,
  keyframes,
  useMediaQuery,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

// ✨ Floating animation for logo
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "cloudofroses202@aerospace.com" && password === "MountainCard2000") {
      setLoading(true);
      setError("");
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        setLoading(false);
        navigate("/dashboard");
      }, 2000);
    } else {
      setError("Invalid credentials, try again...");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: isDesktop ? "row" : "column",
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      {/* ✨ Left Side — Image with Curved Divider */}
      {isDesktop && (
        <Box
          sx={{
            flex: 1,
            position: "relative",
            backgroundImage: "url('../assets/images/Lady.PNG')", // 👈 replace with your image
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Curved SVG Divider */}
          <Box
            component="svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 600"
            preserveAspectRatio="none"
            sx={{
              position: "absolute",
              top: 0,
              right: -1,
              height: "100%",
              width: 120,
            }}
          >
            <path
              d="M200,0 C100,150 100,450 200,600 L0,600 L0,0 Z"
              fill={theme.palette.background.default}
            />
          </Box>
        </Box>
      )}

      {/* ✨ Right Side — Login Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, md: 6 },
          py: 5,
          position: "relative",
          zIndex: 2,
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
            position: "relative",
          }}
        >
          {/* ✈️ Animated Logo */}
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
            Welcome back! Please log in to your account.
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{ fontSize: 20 }}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography sx={{ color: "error.main", fontSize: "0.875rem", mb: 2 }}>
                {error}
              </Typography>
            )}

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
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
            </Button>
          </form>

          <Typography sx={{ mt: 3, color: "text.secondary" }}>
            Don’t have an account?{" "}
            <MuiLink
              component={Link}
              to="/register"
              sx={{
                color: "secondary.main",
                fontWeight: 600,
                "&:hover": { color: "primary.main" },
              }}
            >
              Register
            </MuiLink>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
