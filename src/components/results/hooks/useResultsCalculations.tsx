
import { TestResults } from "./useResultsDataLoader";

export const useResultsCalculations = (testResults: TestResults) => {
  const calculateAverageScore = () => {
    const scores = Object.values(testResults);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const getRecommendations = () => {
    const avgScore = calculateAverageScore();
    
    const baseRecommendations = [
      "Continue to practice reading regularly with materials at an appropriate level.",
      "Use assistive technologies like text-to-speech when needed for longer reading assignments.",
      "Break complex tasks into smaller, manageable steps."
    ];
    
    if (avgScore < 60) {
      return [
        "Consider a comprehensive evaluation with an educational psychologist specializing in dyslexia.",
        "Explore structured literacy programs that use multisensory approaches (Orton-Gillingham, Wilson, etc.).",
        "Discuss potential accommodations with teachers/schools.",
        ...baseRecommendations
      ];
    } else if (avgScore < 75) {
      return [
        "Consider a follow-up screening with a learning specialist to further assess potential challenges.",
        "Focus on strengthening phonological awareness through specific exercises.",
        "Practice memory-building activities to support learning.",
        ...baseRecommendations
      ];
    } else {
      return [
        "Continue monitoring reading progress through regular practice.",
        "Maintain a diverse reading diet to build vocabulary and comprehension.",
        "Consider strengths-based approaches to learning.",
        ...baseRecommendations
      ];
    }
  };

  return {
    calculateAverageScore,
    getRecommendations
  };
};
