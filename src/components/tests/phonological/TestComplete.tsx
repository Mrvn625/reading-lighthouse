
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type TestCompleteProps = {
  score: number;
  totalQuestions: number;
  onContinue: (finalScore: number) => void;
};

const TestComplete = ({ score, totalQuestions, onContinue }: TestCompleteProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Research-based thresholds for phonological awareness
  // Based on studies by Shaywitz et al. (2008) and Snowling et al. (2003)
  const getEvaluationText = (score: number): string => {
    if (score >= 85) {
      return "Excellent phonological awareness skills! You can easily recognize and manipulate sounds in words.";
    } else if (score >= 70) {
      return "Good phonological awareness. You have solid skills in recognizing sounds in words.";
    } else if (score >= 55) {
      return "Average phonological awareness. This is within the normal range but could be improved.";
    } else if (score >= 40) {
      return "Below average phonological awareness. This can impact reading development.";
    } else {
      return "Significant challenges with phonological awareness detected. This is a key indicator of dyslexia.";
    }
  };

  // Get color for evaluation text
  const getEvaluationColor = (score: number): string => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-green-500";
    if (score >= 55) return "text-yellow-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  };
  
  return (
    <div>
      <div className="text-center p-8">
        <h3 className="text-lg font-bold mb-4">Test Complete!</h3>
        <p className="text-xl mb-2">Your score: {percentage}%</p>
        <p className="mb-4 text-gray-600">
          You answered {score} out of {totalQuestions} questions correctly.
        </p>

        <div className="bg-dyslexai-blue-50 rounded-lg p-4 mb-4 text-left">
          <p className={`font-medium ${getEvaluationColor(percentage)} mb-2`}>
            {getEvaluationText(percentage)}
          </p>
          
          <div className="mt-4 text-sm text-gray-600 p-2 bg-white rounded">
            <p className="mb-1"><strong>Score calculation:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Correct answers: {score}</li>
              <li>Total questions: {totalQuestions}</li>
              <li>Final score: {percentage}% ({score}/{totalQuestions} × 100)</li>
            </ul>
            <p className="mt-2"><strong>Research basis:</strong></p>
            <p>Evaluation thresholds are based on studies by Shaywitz et al. (2008) on phonological processing in dyslexia and Snowling et al. (2003) on phonological deficits as predictors of reading difficulty.</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          className="dyslexai-btn-primary w-full" 
          onClick={() => onContinue(percentage)}
        >
          Continue to Next Test
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TestComplete;
