
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WhatIsDyslexia from "./pages/WhatIsDyslexia";
import HowTestsWork from "./pages/HowTestsWork";
import ChecklistPage from "./pages/ChecklistPage";
import CognitiveTests from "./pages/CognitiveTests";
import HandwritingAnalysis from "./pages/HandwritingAnalysis";
import ResultsPage from "./pages/ResultsPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/what-is-dyslexia" element={<WhatIsDyslexia />} />
        <Route path="/how-tests-work" element={<HowTestsWork />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/cognitive-tests" element={<CognitiveTests />} />
        <Route path="/handwriting" element={<HandwritingAnalysis />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
