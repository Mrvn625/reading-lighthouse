
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type TestCompleteProps = {
  score: number;
  totalQuestions: number;
  onContinue: (finalScore: number) => void;
};

const TestComplete = ({ score, totalQuestions, onContinue }: TestCompleteProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <div>
      <div className="text-center p-8">
        <h3 className="text-lg font-bold mb-4">Test Complete!</h3>
        <p className="text-xl mb-2">Your score: {percentage}%</p>
        <p className="mb-6 text-gray-600">
          You answered {score} out of {totalQuestions} questions correctly.
        </p>
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
