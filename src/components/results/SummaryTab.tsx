
import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import OverallScoreCard from "./OverallScoreCard";
import TestResultsList from "./TestResultsList";
import RecommendationsList from "./RecommendationsList";

interface SummaryTabProps {
  testResults: {[key: string]: number};
  testDates: {[key: string]: string};
  handwritingResults: any;
  checklistResults: any;
  calculateAverageScore: () => number;
  getRecommendations: () => string[];
  onViewFullReport: () => void;
}

const SummaryTab: FC<SummaryTabProps> = ({ 
  testResults, 
  testDates, 
  handwritingResults, 
  checklistResults,
  calculateAverageScore,
  getRecommendations,
  onViewFullReport
}: SummaryTabProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-2">Your Results</h3>
          <p className="text-gray-600 mb-4 text-left">
            Here's a summary of your performance across all completed assessments.
          </p>
          
          <OverallScoreCard score={calculateAverageScore()} />
          
          <TestResultsList 
            testResults={testResults}
            testDates={testDates}
            handwritingResults={handwritingResults}
            checklistResults={checklistResults}
          />
        </div>
        
        <RecommendationsList 
          recommendations={getRecommendations()} 
          onViewFullReport={onViewFullReport} 
        />
      </CardContent>
    </Card>
  );
};

export default SummaryTab;
