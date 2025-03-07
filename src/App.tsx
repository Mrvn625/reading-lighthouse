
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WhatIsDyslexia from "./pages/WhatIsDyslexia";
import HowTestsWork from "./pages/HowTestsWork";
import HandwritingAnalysis from "./pages/HandwritingAnalysis";
import ChecklistPage from "./pages/ChecklistPage";
import CognitiveTests from "./pages/CognitiveTests";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/what-is-dyslexia" element={<WhatIsDyslexia />} />
          <Route path="/how-tests-work" element={<HowTestsWork />} />
          <Route path="/handwriting-analysis" element={<HandwritingAnalysis />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/cognitive-tests" element={<CognitiveTests />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
