
import { TestResults } from "./useResultsDataLoader";

interface ChartDataItem {
  name: string;
  score: number;
  threshold: number;
}

export const useChartData = (
  testResults: TestResults,
  handwritingResults: any,
  checklistResults: any
) => {
  const generateChartData = (): ChartDataItem[] => {
    const data = [];
    
    if (testResults.phonological !== undefined) {
      data.push({
        name: "Phonological",
        score: testResults.phonological,
        threshold: 70
      });
    }
    
    if (testResults.workingMemory !== undefined) {
      data.push({
        name: "Working Memory",
        score: testResults.workingMemory,
        threshold: 70
      });
    }
    
    if (testResults.processingSpeed !== undefined) {
      data.push({
        name: "Processing",
        score: testResults.processingSpeed,
        threshold: 70
      });
    }
    
    if (testResults.ran !== undefined) {
      data.push({
        name: "RAN",
        score: testResults.ran,
        threshold: 70
      });
    }
    
    if (handwritingResults?.overallScore !== undefined) {
      data.push({
        name: "Handwriting",
        score: handwritingResults.overallScore,
        threshold: 70
      });
    }
    
    if (testResults.audioDiscrimination !== undefined) {
      data.push({
        name: "Audio",
        score: testResults.audioDiscrimination,
        threshold: 70
      });
    }
    
    if (testResults.directionSense !== undefined) {
      data.push({
        name: "Direction",
        score: testResults.directionSense,
        threshold: 70
      });
    }

    if (checklistResults?.score !== undefined) {
      data.push({
        name: "Checklist",
        score: checklistResults.score,
        threshold: 70
      });
    }
    
    return data;
  };

  return {
    generateChartData
  };
};
