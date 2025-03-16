
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DirectionQuestion {
  id: number;
  instruction: string;
  correctAnswer: "left" | "right" | "up" | "down";
  options: Array<"left" | "right" | "up" | "down">;
  explanation?: string;
}

// Updated questions to be more meaningful and test directional understanding
const directionQuestions: DirectionQuestion[] = [
  {
    id: 1,
    instruction: "When writing English, in which direction do you move your pen?",
    correctAnswer: "right",
    options: ["left", "right", "up", "down"],
    explanation: "English writing moves from left to right."
  },
  {
    id: 2,
    instruction: "If you're standing facing a clock, which direction would you turn to go from 12 to 3?",
    correctAnswer: "right",
    options: ["left", "right", "up", "down"],
    explanation: "On a clock face, moving from 12 to 3 is a right/clockwise movement."
  },
  {
    id: 3,
    instruction: "When reading Hebrew or Arabic text, which way do your eyes move?",
    correctAnswer: "left",
    options: ["left", "right", "up", "down"],
    explanation: "Hebrew and Arabic are read from right to left, so your eyes move leftward."
  },
  {
    id: 4,
    instruction: "If you're facing north and want to head west, which way would you turn?",
    correctAnswer: "left",
    options: ["left", "right", "up", "down"],
    explanation: "When facing north, west is to your left side."
  },
  {
    id: 5,
    instruction: "If you're facing north and turn right, which direction are you facing?",
    correctAnswer: "right",
    options: ["left", "right", "up", "down"],
    explanation: "When facing north, turning right would have you facing east (to the right on most maps)."
  },
  {
    id: 6,
    instruction: "If you're reading a book in English, in which direction do your eyes move?",
    correctAnswer: "right",
    options: ["left", "right", "up", "down"],
    explanation: "When reading English text, your eyes move from left to right across each line."
  },
  {
    id: 7,
    instruction: "If you want to go back to the previous page in a book, which way do you turn the pages?",
    correctAnswer: "left",
    options: ["left", "right", "up", "down"],
    explanation: "To go back to a previous page, you turn the pages to the left."
  }
];

interface DirectionSenseTestProps {
  onComplete: (score: number) => void;
}

const DirectionSenseTest: React.FC<DirectionSenseTestProps> = ({ onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleStartTest = () => {
    setShowIntro(false);
  };

  const handleAnswer = (answer: "left" | "right" | "up" | "down") => {
    setSelectedAnswer(answer);
    const currentQuestion = directionQuestions[currentQuestionIndex];
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Wait for feedback, then move to the next question
    setTimeout(() => {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
      
      if (currentQuestionIndex < directionQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        calculateScore(newAnswers);
      }
    }, 1500);
  };

  const calculateScore = (finalAnswers: string[]) => {
    let correctCount = 0;
    
    directionQuestions.forEach((question, index) => {
      if (finalAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / directionQuestions.length) * 100);
    onComplete(score);
  };

  const getArrowIcon = (direction: "left" | "right" | "up" | "down") => {
    switch (direction) {
      case "left":
        return <ArrowLeft className="h-8 w-8" />;
      case "right":
        return <ArrowRight className="h-8 w-8" />;
      case "up":
        return <ArrowUp className="h-8 w-8" />;
      case "down":
        return <ArrowDown className="h-8 w-8" />;
    }
  };

  if (showIntro) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Direction Sense Test</h2>
          
          <div className="mb-6">
            <p className="mb-4">
              This test assesses your ability to recognize and process directional concepts, a skill that can be challenging for individuals with dyslexia.
            </p>
            
            <div className="bg-dyslexai-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-dyslexai-blue-700 mb-2">Instructions:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>You will be presented with questions about directions and spatial concepts.</li>
                <li>Select the arrow or direction that best answers each question.</li>
                <li>Try to answer quickly but accurately.</li>
                <li>There are {directionQuestions.length} questions in total.</li>
              </ol>
            </div>
            
            <div className="bg-dyslexai-blue-50 p-4 rounded-lg">
              <p className="text-dyslexai-blue-700">
                People with dyslexia often struggle with directional concepts like left/right, which can affect reading and writing. This test helps identify such challenges.
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleStartTest} 
            className="w-full dyslexai-btn-primary"
          >
            Start Test
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = directionQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / directionQuestions.length) * 100;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Question {currentQuestionIndex + 1} of {directionQuestions.length}
            </h2>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% complete
            </span>
          </div>
          
          <Progress value={progress} className="mb-4" />
          
          <p className="text-lg mb-8 text-center font-medium">
            {currentQuestion.instruction}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => {
              // Determine button style based on selection and feedback state
              let buttonVariant: "outline" | "default" | "secondary" = "outline";
              let buttonClass = "h-32 text-lg flex flex-col items-center justify-center";
              
              if (showFeedback && selectedAnswer === option) {
                buttonClass += isCorrect ? " border-green-500 bg-green-50" : " border-red-500 bg-red-50";
              }
              
              return (
                <Button
                  key={option}
                  onClick={() => !showFeedback && handleAnswer(option)}
                  className={buttonClass}
                  variant={buttonVariant}
                  disabled={showFeedback}
                >
                  {getArrowIcon(option)}
                  <span className="mt-2 capitalize">{option}</span>
                  
                  {/* Show feedback indicators */}
                  {showFeedback && selectedAnswer === option && (
                    <span className="absolute top-2 right-2">
                      {isCorrect ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500" />
                      )}
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
          
          {/* Feedback explanation */}
          {showFeedback && (
            <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? 'Correct! ' : 'Incorrect. '}
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DirectionSenseTest;
