
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import WhatIsDyslexia from "./pages/WhatIsDyslexia";
import HowTestsWork from "./pages/HowTestsWork";
import ChecklistPage from "./pages/ChecklistPage";
import CognitiveTests from "./pages/CognitiveTests";
import HandwritingAnalysis from "./pages/HandwritingAnalysis";
import ResultsPage from "./pages/ResultsPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import "./App.css";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    setHasProfile(!!userData);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!hasProfile) {
    return <Navigate to="/profile" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/what-is-dyslexia" element={<WhatIsDyslexia />} />
        <Route path="/how-tests-work" element={<HowTestsWork />} />
        <Route path="/checklist" element={
          <ProtectedRoute>
            <ChecklistPage />
          </ProtectedRoute>
        } />
        <Route path="/cognitive-tests" element={
          <ProtectedRoute>
            <CognitiveTests />
          </ProtectedRoute>
        } />
        <Route path="/handwriting" element={
          <ProtectedRoute>
            <HandwritingAnalysis />
          </ProtectedRoute>
        } />
        <Route path="/handwriting-analysis" element={
          <ProtectedRoute>
            <HandwritingAnalysis />
          </ProtectedRoute>
        } />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
