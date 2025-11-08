import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Book Flight", path: "/#book-flight" },
  { title: "Track Flight", path: "/track" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // ✅ Handle "Book Flight" scroll smoothly
  const scrollToBookFlight = () => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        const section = document.getElementById("book-flight");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const section = document.getElementById("book-flight");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  // ✅ Drawer content for mobile
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <FlightTakeoffIcon />
        Lumina
      </Typography>
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.title} disablePadding>
            {item.title === "Book Flight" ? (
              <ListItemButton onClick={scrollToBookFlight} sx={{ textAlign: "center" }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            ) : (
              <ListItemButton component={Link} to={item.path} sx={{ textAlign: "center" }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.2)" }} />

      {/* ✅ Logout button in Drawer */}
      <Button
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        fullWidth
        sx={{
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.4)",
          mt: 1.5,
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.1)",
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "primary.main",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* === Logo === */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#fff",
              fontWeight: 700,
              gap: 1,
            }}
          >
            <FlightTakeoffIcon />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Lumina
            </Typography>
          </Box>

          {/* === Desktop Links === */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
            {navLinks.map((item) =>
              item.title === "Book Flight" ? (
                <Button
                  key={item.title}
                  onClick={scrollToBookFlight}
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  {item.title}
                </Button>
              ) : (
                <Button
                  key={item.title}
                  component={Link}
                  to={item.path}
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  {item.title}
                </Button>
              )
            )}

            {/* ✅ Desktop Logout button */}
            <Button
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                color: "#fff",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.5)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              Logout
            </Button>
          </Box>

          {/* === Hamburger for mobile === */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* === Drawer for mobile === */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            bgcolor: "primary.main",
            color: "#fff",
          },
        }}
      >
        {drawer}
      </Drawer>

      <Toolbar />
    </>
  );
};

export default Navbar;
