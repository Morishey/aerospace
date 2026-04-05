import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"; // ✅ Correct import for React (not Next.js)
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TrackFlightPage from "./pages/TrackFlightPage";
import BookedFlightPage from "./pages/BookedFlightPage";
import BoardingPass from "./pages/BookedFlightPage"; // Note: same component as BookedFlightPage
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Hide Navbar on login & register pages
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Auth routes - redirect if already logged in */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register />}
        />

        {/* Protected routes - require login */}
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/track"
          element={isLoggedIn ? <TrackFlightPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/booked"
          element={isLoggedIn ? <BookedFlightPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/boarding-pass"
          element={isLoggedIn ? <BoardingPass /> : <Navigate to="/login" />}
        />

        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Vercel Analytics - automatically tracks page views in production */}
      <Analytics />
    </>
  );
}

export default App;