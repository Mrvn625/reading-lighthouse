
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown } from "lucide-react";

interface DirectionQuestion {
  id: number;
  instruction: string;
  correctAnswer: "left" | "right" | "up" | "down";
  options: Array<"left" | "right" | "up" | "down">;
}

const directionQuestions: DirectionQuestion[] = [
  {
    id: 1,
    instruction: "Which arrow points to the RIGHT?",
    correctAnswer: "right",
    options: ["left", "right", "up", "down"]
  },
  {
    id: 2,
    instruction: "Which arrow points to the LEFT?",
    correctAnswer: "left",
    options: ["left", "right", "up", "down"]
  },
  {
    id: 3,
    instruction: "Which arrow points UP?",
    correctAnswer: "up",
    options: ["left", "right", "up", "down"]
  },
  {
    id: 4,
    instruction: "Which arrow points DOWN?",
    correctAnswer: "down",
    options: ["left", "right", "up", "down"]
  },
  {
    id: 5,
    instruction: "If you're facing north and turn right, which direction are you facing?",
    correctAnswer: "right",
    options: ["left", "right", "up", "down"]
  }
];

interface DirectionSenseTestProps {
  onComplete: (score: number) => void;
}

const DirectionSenseTest: React.FC<DirectionSenseTestProps> = ({ onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleStartTest = () => {
    setShowIntro(false);
  };

  const handleAnswer = (answer: "left" | "right" | "up" | "down") => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < directionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore(newAnswers);
    }
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

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            Question {currentQuestionIndex + 1} of {directionQuestions.length}
          </h2>
          
          <p className="text-lg mb-8 text-center font-medium">
            {currentQuestion.instruction}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswer(option)}
                className="h-32 text-lg flex flex-col items-center justify-center"
                variant="outline"
              >
                {getArrowIcon(option)}
                <span className="mt-2 capitalize">{option}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DirectionSenseTest;
