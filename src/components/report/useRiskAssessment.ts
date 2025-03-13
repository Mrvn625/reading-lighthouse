
import { useMemo } from "react";

interface TestResults {
  phonological?: number;
  workingMemory?: number;
  processingSpeed?: number;
  ran?: number;
  handwriting?: number;
  audioDiscrimination?: number;
  directionSense?: number;
}

export const useRiskAssessment = (testResults: TestResults) => {
  const riskLevel = useMemo(() => {
    const scores = Object.values(testResults).filter(score => score !== undefined) as number[];
    if (scores.length === 0) return "Unknown";
    
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    if (avgScore >= 80) return "Low";
    if (avgScore >= 60) return "Mild";
    if (avgScore >= 40) return "Moderate";
    return "High";
  }, [testResults]);

  const riskDescription = useMemo(() => {
    switch (riskLevel) {
      case "Low":
        return "Based on the assessment results, there are few indicators of dyslexia. The test scores show typical performance in most cognitive areas associated with reading and processing.";
      case "Mild":
        return "The assessment results show some indicators that might be associated with dyslexia. While most areas show typical performance, there are specific areas where additional support may be beneficial.";
      case "Moderate":
        return "There are several indicators of potential dyslexia in the assessment results. The pattern of strengths and weaknesses across cognitive areas is consistent with what is often seen in individuals with dyslexia.";
      case "High":
        return "The assessment results show strong indicators of dyslexia. The profile of scores across cognitive areas strongly suggests dyslexia-related processing challenges that may significantly impact reading and learning.";
      default:
        return "Not enough data is available to provide a comprehensive assessment.";
    }
  }, [riskLevel]);

  return { riskLevel, riskDescription };
};
