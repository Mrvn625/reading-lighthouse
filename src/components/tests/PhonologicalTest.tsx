import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PlayCircle, Volume, Check, X, ArrowRight } from "lucide-react";

type Question = {
  id: number;
  instruction: string;
  word: string;
  options: string[];
  correctAnswer: string;
};

// Sample questions for the phonological awareness test
const sampleQuestions: Question[] = [
  {
    id: 1,
    instruction: "What sound does this word start with?",
    word: "ball",
    options: ["b", "p", "d", "t"],
    correctAnswer: "b"
  },
  {
    id: 2,
    instruction: "What sound does this word end with?",
    word: "dog",
    options: ["g", "k", "d", "t"],
    correctAnswer: "g"
  },
  {
    id: 3,
    instruction: "Which word rhymes with 'cat'?",
    word: "cat",
    options: ["hat", "cow", "dog", "pen"],
    correctAnswer: "hat"
  },
  {
    id: 4,
    instruction: "If you remove the first sound from 'stop', what word do you get?",
    word: "stop",
    options: ["top", "pot", "opt", "sop"],
    correctAnswer: "top"
  },
  {
    id: 5,
    instruction: "What sound is in the middle of the word?",
    word: "bat",
    options: ["a", "b", "t", "e"],
    correctAnswer: "a"
  }
];

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

  const playWord = () => {
    // In a real implementation, this would use the Web Speech API
    // For now, we'll just show a toast message
    toast({
      title: "Playing Sound",
      description: `The word is "${currentQuestion.word}"`,
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
        // Calculate percentage score
        const finalScore = Math.round((score + (correct ? 1 : 0)) / sampleQuestions.length * 100);
        onComplete(finalScore);
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
          <div className="text-center p-8">
            <h3 className="text-lg font-bold mb-4">Instructions</h3>
            <p className="mb-6">
              In this test, you'll hear a word and be asked questions about the sounds in the word.
              Listen carefully and select the correct answer.
            </p>
            <Button onClick={handleStart} className="dyslexai-btn-primary">
              <PlayCircle className="mr-2 h-5 w-5" />
              Start Test
            </Button>
          </div>
        ) : isComplete ? (
          <div className="text-center p-8">
            <h3 className="text-lg font-bold mb-4">Test Complete!</h3>
            <p className="text-xl mb-2">Your score: {Math.round((score / sampleQuestions.length) * 100)}%</p>
            <p className="mb-6 text-gray-600">
              You answered {score} out of {sampleQuestions.length} questions correctly.
            </p>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex justify-between mb-8">
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestionIndex + 1} of {sampleQuestions.length}
              </span>
              <span className="text-sm font-medium text-gray-500">
                Score: {score}
              </span>
            </div>
            
            <div className="bg-dyslexai-blue-50 p-4 rounded-lg mb-6">
              <p className="font-medium mb-2">{currentQuestion.instruction}</p>
              <div className="flex items-center justify-center bg-white p-4 rounded-lg">
                <p className="text-2xl font-bold mr-4">{currentQuestion.word}</p>
                <Button variant="ghost" onClick={playWord} title="Hear the word">
                  <Volume className="h-6 w-6 text-dyslexai-blue-500" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => {
                let buttonStyle = "border border-gray-200 hover:border-dyslexai-blue-300";
                
                if (selectedAnswer === option) {
                  buttonStyle = isCorrect 
                    ? "border-2 border-green-500 bg-green-50" 
                    : "border-2 border-red-500 bg-red-50";
                } else if (selectedAnswer !== null && option === currentQuestion.correctAnswer) {
                  buttonStyle = "border-2 border-green-500 bg-green-50";
                }
                
                return (
                  <Button
                    key={option}
                    variant="outline"
                    className={`p-6 text-lg font-medium ${buttonStyle}`}
                    onClick={() => handleSelectAnswer(option)}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                    {selectedAnswer === option && (
                      isCorrect ? 
                        <Check className="ml-2 h-5 w-5 text-green-600" /> : 
                        <X className="ml-2 h-5 w-5 text-red-600" />
                    )}
                    {selectedAnswer !== null && option === currentQuestion.correctAnswer && selectedAnswer !== option && (
                      <Check className="ml-2 h-5 w-5 text-green-600" />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
      
      {isComplete && (
        <CardFooter>
          <Button className="dyslexai-btn-primary w-full" onClick={() => onComplete(Math.round((score / sampleQuestions.length) * 100))}>
            Continue to Next Test
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PhonologicalTest;
