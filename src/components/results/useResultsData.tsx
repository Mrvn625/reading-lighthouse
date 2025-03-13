
import { useResultsDataLoader, UserData, TestResults, TestDates } from "./hooks/useResultsDataLoader";
import { useResultsCalculations } from "./hooks/useResultsCalculations";
import { useChartData } from "./hooks/useChartData";
import { useDateHelpers } from "./hooks/useDateHelpers";

export type { UserData, TestResults, TestDates };

export const useResultsData = () => {
  const { 
    testResults, 
    userData, 
    testDates, 
    checklistResults, 
    handwritingResults 
  } = useResultsDataLoader();
  
  const { calculateAverageScore, getRecommendations } = useResultsCalculations(testResults);
  const { generateChartData } = useChartData(testResults, handwritingResults, checklistResults);
  const { getMostRecentTestDate } = useDateHelpers(testDates);

  return {
    testResults,
    userData,
    testDates,
    checklistResults,
    handwritingResults,
    calculateAverageScore,
    getRecommendations,
    generateChartData,
    getMostRecentTestDate
  };
};
