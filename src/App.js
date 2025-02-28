import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Dashboard from "./Dashboard";
import SavingsPlan from "./SavingsPlan";
import PreApprovedLoan from "./PreApprovedLoan";
import MerchantSpending from "./MerchantSpending";
import PayTransfer from "./PayTransfer";
import Profile from "./Profile";
import OurTeam from "./OurTeam";
import PaymentResult from "./PaymentResult";
import SettingsPage from "./SettingsPage";
import ChatbotPage from "./ChatbotPage";
import ManageCards from "./ManageCards";
import Feedback from "./Feedback";
import LocationSpending from "./LocationSpending";

import Loader from "./Loader"; // Importing the Loader component

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [displayedLocation, setDisplayedLocation] = useState(location);

  useEffect(() => {
    // Show loader when route changes
    setIsLoading(true);

    // Simulate loading time (1 second)
    const timer = setTimeout(() => {
      setDisplayedLocation(location);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      {/* Loader component - will be visible when isLoading is true */}
      <Loader isLoading={isLoading} />

      {/* Only render routes when loading is done */}
      {!isLoading && (
        <>
          <Routes location={displayedLocation}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/savings-plan" element={<SavingsPlan />} />
            <Route path="/payment-results" element={<PaymentResult />} />
            <Route path="/preapproved-loan" element={<PreApprovedLoan />} />
            <Route path="/location-spending" element={<LocationSpending />} />
            <Route path="/merchant-spending" element={<MerchantSpending />} />
            <Route path="/pay" element={<PayTransfer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<ChatbotPage />} />
            <Route path="/manage-cards" element={<ManageCards />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>

          {/* Feedback button */}
          <button onClick={() => navigate('/feedback')} className="feedback-button">
            Give Feedback
          </button>
        </>
      )}
    </div>
  );
}

export default App;
