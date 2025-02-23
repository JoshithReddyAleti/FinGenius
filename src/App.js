// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Dashboard from "./Dashboard";
import SavingsPlan from "./SavingsPlan";
// Removed LocationSpending import
import PreApprovedLoan from "./PreApprovedLoan";
import MerchantSpending from "./MerchantSpending";
import PayTransfer from "./PayTransfer";
import Profile from "./Profile";
import OurTeam from "./OurTeam";

import SettingsPage from "./settingsPage";
import ChatbotPage from "./ChatbotPage";
import ManageCards from "./ManageCards";

import Loader from "./Loader";

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  // Define displayedLocation state so it can be used later.
  const [displayedLocation, setDisplayedLocation] = useState(location);

  useEffect(() => {
    // Show loader as soon as the route changes
    setIsLoading(true);

    // Simulate an async load or data fetching time (1 second)
    const timer = setTimeout(() => {
      setDisplayedLocation(location);
      setIsLoading(false);
    }, 1000);

    // Clear the timer on cleanup to avoid memory leaks
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      {/* The 3D loader overlay (shows/hides based on isLoading) */}
      <Loader isLoading={isLoading} />
      {/* Only render routes when loading is done */}
      {!isLoading && (
        <Routes location={displayedLocation}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/savings-plan" element={<SavingsPlan />} />
          {/* Removed LocationSpending route */}
          <Route path="/preapproved-loan" element={<PreApprovedLoan />} />
          <Route path="/merchant-spending" element={<MerchantSpending />} />
          <Route path="/pay" element={<PayTransfer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<ChatbotPage />} />
          <Route path="/manage-cards" element={<ManageCards />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
