
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import QuestionCard from "./phonological/QuestionCard";
import TestIntro from "./phonological/TestIntro";
import TestComplete from "./phonological/TestComplete";
import { sampleQuestions } from "./phonological/questionData";

type PhonologicalTestProps = {
  onComplete: (score: number) => void;
};

const PhonologicalTest = ({ onComplete }: PhonologicalTestProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const currentQuestion = sampleQuestions[currentQuestionIndex];

  const handleStart = () => {
    setIsStarted(true);
    toast({
      title: "Test Started",
      description: "Listen carefully and select the correct answer",
    });
  };
  
  const handleSelectAnswer = (answer: string) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after selection
    
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    // Automatically move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < sampleQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setIsComplete(true);
      }
    }, 1500);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-dyslexai-blue-700">Phonological Awareness Test</CardTitle>
        <CardDescription>
          Test your ability to identify and manipulate sounds in words
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!isStarted ? (
          <TestIntro onStart={handleStart} />
        ) : isComplete ? (
          <TestComplete 
            score={score} 
            totalQuestions={sampleQuestions.length} 
            onContinue={onComplete}
          />
        ) : (
          <>
            <div className="flex justify-between mb-8">
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestionIndex + 1} of {sampleQuestions.length}
              </span>
              <span className="text-sm font-medium text-gray-500">
                Score: {score}
              </span>
            </div>
            
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              isCorrect={isCorrect}
              onSelectAnswer={handleSelectAnswer}
            />
          </>
        )}
      </CardContent>
      
      {isComplete && (
        <CardFooter>
          <TestComplete 
            score={score} 
            totalQuestions={sampleQuestions.length} 
            onContinue={onComplete}
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default PhonologicalTest;
