
import { Button } from "@/components/ui/button";
import { Volume, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Question = {
  id: number;
  instruction: string;
  word: string;
  options: string[];
  correctAnswer: string;
};

type QuestionCardProps = {
  question: Question;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  onSelectAnswer: (answer: string) => void;
};

const QuestionCard = ({ 
  question, 
  selectedAnswer, 
  isCorrect, 
  onSelectAnswer 
}: QuestionCardProps) => {
  const { toast } = useToast();
  
  const playWord = () => {
    // In a real implementation, this would use the Web Speech API
    // For now, we'll just show a toast message
    toast({
      title: "Playing Sound",
      description: `The word is "${question.word}"`,
    });
  };

  return (
    <div className="p-4">
      <div className="bg-dyslexai-blue-50 p-4 rounded-lg mb-6">
        <p className="font-medium mb-2">{question.instruction}</p>
        <div className="flex items-center justify-center bg-white p-4 rounded-lg">
          <p className="text-2xl font-bold mr-4">{question.word}</p>
          <Button variant="ghost" onClick={playWord} title="Hear the word">
            <Volume className="h-6 w-6 text-dyslexai-blue-500" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option) => {
          let buttonStyle = "border border-gray-200 hover:border-dyslexai-blue-300";
          
          if (selectedAnswer === option) {
            buttonStyle = isCorrect 
              ? "border-2 border-green-500 bg-green-50" 
              : "border-2 border-red-500 bg-red-50";
          } else if (selectedAnswer !== null && option === question.correctAnswer) {
            buttonStyle = "border-2 border-green-500 bg-green-50";
          }
          
          return (
            <Button
              key={option}
              variant="outline"
              className={`p-6 text-lg font-medium ${buttonStyle}`}
              onClick={() => onSelectAnswer(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
              {selectedAnswer === option && (
                isCorrect ? 
                  <Check className="ml-2 h-5 w-5 text-green-600" /> : 
                  <X className="ml-2 h-5 w-5 text-red-600" />
              )}
              {selectedAnswer !== null && option === question.correctAnswer && selectedAnswer !== option && (
                <Check className="ml-2 h-5 w-5 text-green-600" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
