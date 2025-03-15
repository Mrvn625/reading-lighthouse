
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import UserProfilePage from "@/pages/UserProfilePage";
import WhatIsDyslexia from "@/pages/WhatIsDyslexia";
import HowTestsWork from "@/pages/HowTestsWork";
import HandwritingAnalysis from "@/pages/HandwritingAnalysis";
import ChecklistPage from "@/pages/ChecklistPage";
import CognitiveTests from "@/pages/CognitiveTests";
import ResultsPage from "@/pages/ResultsPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/what-is-dyslexia" element={<WhatIsDyslexia />} />
      <Route path="/how-tests-work" element={<HowTestsWork />} />
      <Route path="/handwriting" element={<HandwritingAnalysis />} />
      <Route path="/checklist" element={<ChecklistPage />} />
      <Route path="/cognitive-tests" element={<CognitiveTests />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/handwriting-analysis" element={<Navigate to="/handwriting" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
