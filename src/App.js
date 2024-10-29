import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import TravelItineraryPage from "./pages/TravelItineraryPage/TravelItineraryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/itinerary" element={<TravelItineraryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
