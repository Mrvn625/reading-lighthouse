
import { FC } from "react";

interface OverallScoreCardProps {
  score: number;
}

const OverallScoreCard: FC<OverallScoreCardProps> = ({ score }) => {
  return (
    <div className="bg-dyslexai-blue-50 rounded-lg p-4 mb-6">
      <h4 className="font-semibold text-dyslexai-blue-700 mb-2">Overall Score</h4>
      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-6 mr-4">
          <div 
            className="bg-dyslexai-blue-500 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium" 
            style={{ width: `${score}%` }}
          >
            {score}%
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mt-2 text-left">
        {score >= 80 ? 
          "Your overall performance shows few indicators associated with dyslexia." :
          score >= 60 ?
          "Your overall performance shows some patterns that may be associated with dyslexia." :
          "Your overall performance shows several patterns commonly associated with dyslexia."
        }
      </p>
    </div>
  );
};

export default OverallScoreCard;
