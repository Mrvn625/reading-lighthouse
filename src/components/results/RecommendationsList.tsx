
import { FC } from "react";
import { Button } from "@/components/ui/button";

interface RecommendationsListProps {
  recommendations: string[];
  onViewFullReport: () => void;
}

const RecommendationsList: FC<RecommendationsListProps> = ({
  recommendations,
  onViewFullReport
}) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-2">Next Steps</h3>
      <p className="text-gray-600 mb-4 text-left">Based on your results, here are some recommended next steps:</p>
      
      <ul className="list-disc pl-5 space-y-2 text-left">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="text-gray-700">{recommendation}</li>
        ))}
      </ul>
      
      <div className="mt-6 flex justify-center">
        <Button className="dyslexai-btn-primary" onClick={onViewFullReport}>
          View Full Report
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsList;
