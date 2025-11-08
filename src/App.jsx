import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TrackFlightPage from "./pages/TrackFlightPage";
import BookedFlightPage from "./pages/BookedFlightPage";
import BoardingPass from "./pages/BookedFlightPage"; 

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/track" element={<TrackFlightPage />} />
        <Route path="/booked" element={<BookedFlightPage />} />
        <Route path="/boarding-pass" element={<BoardingPass />} />
      </Routes>
    </>
  );
}

export default App;
