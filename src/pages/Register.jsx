import React, { useState, useEffect } from "react";
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
  alpha,
  Container,
  Fade,
  Zoom,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

// Professional animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.3); }
  70% { box-shadow: 0 0 0 10px rgba(25, 118, 210, 0); }
  100% { box-shadow: 0 0 0 0 rgba(25, 118, 210, 0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideIn = keyframes`
  from { transform: translateX(30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && showCountdown) {
      // Countdown finished - redirect to login
      setShowCountdown(false);
      setLoading(false);
      navigate("/login");
    }
    return () => clearTimeout(timer);
  }, [countdown, showCountdown, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    setError("");
    setShowCountdown(true);
    setCountdown(10); // 10 second countdown

    // Save user data locally
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError("");
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@aerospace.com?subject=Account%20Creation%20Support";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#f8fafc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -50,
          width: { xs: 200, sm: 300 },
          height: { xs: 200, sm: 300 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(25,118,210,0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          left: -50,
          width: { xs: 250, sm: 400 },
          height: { xs: 250, sm: 400 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(25,118,210,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 1,
        }}
      />

      {/* Left Side — Premium Image Panel (Desktop only) */}
      {isDesktop && (
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              flex: 1.2,
              position: "relative",
              background:
                "linear-gradient(135deg, #0a2a5a 0%, #1e4a8b 50%, #2e6bb5 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 6,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Animated floating particles */}
            {[...Array(8)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  width: Math.random() * 200 + 50,
                  height: Math.random() * 200 + 50,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${alpha("#fff", 0.1)} 0%, transparent 70%)`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `${float} ${Math.random() * 10 + 10}s infinite ease-in-out`,
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* Content */}
            <Zoom in={true} timeout={800} style={{ transitionDelay: "200ms" }}>
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  maxWidth: 500,
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1.5,
                    mb: 4,
                  }}
                >
                  <FlightTakeoffIcon
                    sx={{
                      fontSize: 60,
                      color: "#FFD700",
                      filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))",
                      animation: `${float} 4s ease-in-out infinite`,
                    }}
                  />
                  <Typography
                    variant="h2"
                    sx={{
                      color: "white",
                      fontWeight: 800,
                      letterSpacing: 1,
                      textShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      fontSize: "3rem",
                    }}
                  >
                    AeroSpace
                  </Typography>
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    mb: 3,
                    fontSize: "2rem",
                    textShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  Join Our Community!
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: alpha("#fff", 0.8),
                    mb: 4,
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                  }}
                >
                  Create your account to access exclusive flight deals, track your journeys, and experience premium aerospace services.
                </Typography>

                {/* Stats */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 4,
                    mt: 4,
                  }}
                >
                  {[
                    { value: "500+", label: "Flights Daily" },
                    { value: "24/7", label: "Support" },
                    { value: "99.9%", label: "Uptime" },
                  ].map((stat, index) => (
                    <Box key={index} sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h5"
                        sx={{ color: "#FFD700", fontWeight: 800, mb: 0.5 }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: alpha("#fff", 0.7) }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Zoom>
          </Box>
        </Fade>
      )}

      {/* Right Side — Register Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Fade in={true} timeout={800}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: 4,
                width: "100%",
                maxWidth: { xs: "100%", sm: 450, md: 480 },
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(25,118,210,0.1)",
                position: "relative",
                overflow: "hidden",
                mx: "auto",
                my: "auto",
              }}
            >
              {/* Decorative header line */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background:
                    "linear-gradient(90deg, #0a2a5a, #2e6bb5, #4a90e2)",
                }}
              />

              {/* Logo */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 3,
                }}
              >
                <FlightTakeoffIcon
                  sx={{
                    fontSize: { xs: 36, sm: 40 },
                    color: "#0a2a5a",
                    animation: `${float} 3s ease-in-out infinite`,
                  }}
                />
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  sx={{
                    color: "#0a2a5a",
                    fontWeight: 800,
                    letterSpacing: 0.5,
                  }}
                >
                  AeroSpace
                </Typography>
              </Box>

              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{
                  fontWeight: 700,
                  color: "#1e293b",
                  mb: 1,
                  textAlign: "center",
                }}
              >
                Create Account
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#64748b",
                  mb: { xs: 3, sm: 4 },
                  textAlign: "center",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                Fill in your details to get started
              </Typography>

              <form onSubmit={handleRegister}>
                {/* Name Field */}
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  value={name}
                  onChange={handleInputChange(setName)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  error={!!error && !name}
                  disabled={showCountdown}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    mb: { xs: 2, sm: 2.5 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#f8fafc",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#ffffff",
                      },
                      "&.Mui-focused": {
                        bgcolor: "#ffffff",
                        boxShadow: "0 0 0 4px rgba(25,118,210,0.1)",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon
                          sx={{
                            fontSize: { xs: 18, sm: 20 },
                            color:
                              focusedField === "name" ? "#1976d2" : "#94a3b8",
                            transition: "color 0.2s ease",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Email Field */}
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  error={!!error && !email}
                  disabled={showCountdown}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    mb: { xs: 2, sm: 2.5 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#f8fafc",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#ffffff",
                      },
                      "&.Mui-focused": {
                        bgcolor: "#ffffff",
                        boxShadow: "0 0 0 4px rgba(25,118,210,0.1)",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon
                          sx={{
                            fontSize: { xs: 18, sm: 20 },
                            color:
                              focusedField === "email" ? "#1976d2" : "#94a3b8",
                            transition: "color 0.2s ease",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Password Field */}
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={password}
                  onChange={handleInputChange(setPassword)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  error={!!error && !password}
                  disabled={showCountdown}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    mb: { xs: 2, sm: 2.5 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#f8fafc",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#ffffff",
                      },
                      "&.Mui-focused": {
                        bgcolor: "#ffffff",
                        boxShadow: "0 0 0 4px rgba(25,118,210,0.1)",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon
                          sx={{
                            fontSize: { xs: 18, sm: 20 },
                            color:
                              focusedField === "password"
                                ? "#1976d2"
                                : "#94a3b8",
                            transition: "color 0.2s ease",
                          }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          size={isMobile ? "small" : "medium"}
                          sx={{
                            color: "#64748b",
                            "&:hover": { color: "#1976d2" },
                          }}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon
                              fontSize={isMobile ? "small" : "medium"}
                            />
                          ) : (
                            <VisibilityIcon
                              fontSize={isMobile ? "small" : "medium"}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Confirm Password Field */}
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  value={confirmPassword}
                  onChange={handleInputChange(setConfirmPassword)}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                  error={!!error && !confirmPassword}
                  disabled={showCountdown}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    mb: { xs: 2, sm: 2.5 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#f8fafc",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#ffffff",
                      },
                      "&.Mui-focused": {
                        bgcolor: "#ffffff",
                        boxShadow: "0 0 0 4px rgba(25,118,210,0.1)",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon
                          sx={{
                            fontSize: { xs: 18, sm: 20 },
                            color:
                              focusedField === "confirmPassword"
                                ? "#1976d2"
                                : "#94a3b8",
                            transition: "color 0.2s ease",
                          }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          edge="end"
                          size={isMobile ? "small" : "medium"}
                          sx={{
                            color: "#64748b",
                            "&:hover": { color: "#1976d2" },
                          }}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffIcon
                              fontSize={isMobile ? "small" : "medium"}
                            />
                          ) : (
                            <VisibilityIcon
                              fontSize={isMobile ? "small" : "medium"}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Countdown Timer Display */}
                {showCountdown && (
                  <Fade in={true}>
                    <Box
                      sx={{
                        mb: { xs: 2, sm: 3 },
                        p: { xs: 2, sm: 2.5 },
                        background: "linear-gradient(135deg, #0a2a5a 0%, #1e4a8b 100%)",
                        borderRadius: 3,
                        color: "white",
                        textAlign: "center",
                        animation: `${pulse} 2s infinite`,
                        boxShadow: "0 8px 20px rgba(10, 42, 90, 0.3)",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <AccessTimeIcon sx={{ color: "#FFD700", fontSize: { xs: 24, sm: 28 } }} />
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 800,
                            color: "#FFD700",
                            fontSize: { xs: "2rem", sm: "2.5rem" },
                            lineHeight: 1,
                          }}
                        >
                          {countdown}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: alpha("#fff", 0.8),
                            alignSelf: "flex-end",
                            mb: 0.5,
                          }}
                        >
                          seconds
                        </Typography>
                      </Box>
                      
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          mb: 1.5,
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                        }}
                      >
                        Account created successfully!
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        sx={{
                          color: alpha("#fff", 0.8),
                          mb: 1.5,
                          fontSize: { xs: "0.8rem", sm: "0.875rem" },
                        }}
                      >
                        Redirecting to login in {countdown} seconds...
                      </Typography>

                      {/* Contact Support Button */}
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<SupportAgentIcon />}
                        onClick={handleContactSupport}
                        sx={{
                          borderColor: alpha("#fff", 0.3),
                          color: "white",
                          fontWeight: 600,
                          py: 1,
                          borderRadius: 2,
                          "&:hover": {
                            borderColor: "#FFD700",
                            bgcolor: alpha("#FFD700", 0.1),
                          },
                        }}
                      >
                        Contact Support
                      </Button>
                    </Box>
                  </Fade>
                )}

                {/* Error Message */}
                {error && !showCountdown && (
                  <Fade in={true}>
                    <Typography
                      sx={{
                        color: "error.main",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        mb: { xs: 1.5, sm: 2 },
                        p: { xs: 1, sm: 1.5 },
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        borderRadius: 2,
                        border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                        textAlign: "center",
                      }}
                    >
                      {error}
                    </Typography>
                  </Fade>
                )}

                {/* Register Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading || showCountdown}
                  size={isMobile ? "large" : "large"}
                  sx={{
                    py: { xs: 1.2, sm: 1.5, md: 1.8 },
                    fontWeight: 700,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    borderRadius: 2,
                    background:
                      "linear-gradient(45deg, #0a2a5a 0%, #1e4a8b 50%, #2e6bb5 100%)",
                    textTransform: "none",
                    boxShadow: "0 8px 20px rgba(10, 42, 90, 0.3)",
                    position: "relative",
                    overflow: "hidden",
                    opacity: showCountdown ? 0.5 : 1,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transition: "left 0.5s ease",
                    },
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #0f2b5e 0%, #1e4a8b 70%, #2e6bb5 100%)",
                      transform: showCountdown ? "none" : "translateY(-2px)",
                      boxShadow: showCountdown 
                        ? "0 8px 20px rgba(10, 42, 90, 0.3)" 
                        : "0 12px 28px rgba(10, 42, 90, 0.4)",
                      "&::before": {
                        left: showCountdown ? "-100%" : "100%",
                      },
                    },
                    "&:disabled": {
                      background: "#94a3b8",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      size={isMobile ? 20 : 24}
                      sx={{ color: "white" }}
                    />
                  ) : (
                    "Create Account"
                  )}
                </Button>

                {/* Login Link */}
                <Box sx={{ mt: { xs: 2, sm: 3 }, textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748b",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    Already have an account?{" "}
                    <MuiLink
                      component={Link}
                      to="/login"
                      sx={{
                        color: "#1976d2",
                        fontWeight: 600,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Sign In
                    </MuiLink>
                  </Typography>
                </Box>
              </form>
            </Paper>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
}