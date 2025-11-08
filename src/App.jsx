import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TrackFlightPage from "./pages/TrackFlightPage";
import BookedFlightPage from "./pages/BookedFlightPage";
import BoardingPass from "./pages/BookedFlightPage";
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
        {/* Auth routes */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register />}
        />

        {/* Protected routes */}
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

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
