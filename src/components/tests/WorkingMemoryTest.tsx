import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Brain, Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type WorkingMemoryTestProps = {
  onComplete: (score: number) => void;
};

type TestStatus = "intro" | "memorize" | "recall" | "feedback" | "completed";

interface SequenceItem {
  value: string;
  isCorrect?: boolean;
}

const WorkingMemoryTest = ({ onComplete }: WorkingMemoryTestProps) => {
  const [status, setStatus] = useState<TestStatus>("intro");
  const [level, setLevel] = useState(3); // Start with sequence of 3
  const [currentSequence, setCurrentSequence] = useState<SequenceItem[]>([]);
  const [userSequence, setUserSequence] = useState<SequenceItem[]>([]);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);
  const [memorizeTimeLeft, setMemorizeTimeLeft] = useState(0);
  const { toast } = useToast();

  // Letters used for the test (excluding similar looking ones)
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'W', 'Y'];

  // Generate a random sequence of given length
  const generateSequence = (length: number) => {
    const sequence: SequenceItem[] = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      sequence.push({ value: letters[randomIndex] });
    }
    return sequence;
  };

  // Start the test
  const handleStart = () => {
    setStatus("memorize");
    setScore(0);
    setTotalAttempts(0);
    setCorrectAttempts(0);
    setLevel(3);
    showNextSequence(3);
  };

  // Display the next sequence to memorize
  const showNextSequence = (sequenceLength: number) => {
    const newSequence = generateSequence(sequenceLength);
    setCurrentSequence(newSequence);
    setUserSequence([]);
    setStatus("memorize");
    setMemorizeTimeLeft(sequenceLength * 1000); // 1 second per item
    
    toast({
      title: "Memorize the sequence",
      description: `Remember the order of ${sequenceLength} letters`,
    });
  };

  // Handle the memorization timer
  useEffect(() => {
    if (status === "memorize" && memorizeTimeLeft > 0) {
      const timer = setTimeout(() => {
        setMemorizeTimeLeft(prev => prev - 100);
      }, 100);
      
      return () => clearTimeout(timer);
    } else if (status === "memorize" && memorizeTimeLeft <= 0) {
      setStatus("recall");
    }
  }, [status, memorizeTimeLeft]);

  // Handle letter selection during recall phase
  const handleLetterClick = (letter: string) => {
    if (status !== "recall") return;
    
    const newUserSequence = [...userSequence, { value: letter }];
    setUserSequence(newUserSequence);
    
    // If user has entered the complete sequence, check it
    if (newUserSequence.length === currentSequence.length) {
      checkSequence(newUserSequence);
    }
  };

  // Check if the user's sequence matches the target sequence
  const checkSequence = (userSeq: SequenceItem[]) => {
    let correct = true;
    const markedSequence = userSeq.map((item, index) => {
      const isItemCorrect = item.value === currentSequence[index].value;
      if (!isItemCorrect) correct = false;
      return { ...item, isCorrect: isItemCorrect };
    });
    
    setUserSequence(markedSequence);
    setTotalAttempts(prev => prev + 1);
    
    if (correct) {
      setCorrectAttempts(prev => prev + 1);
    }
    
    setStatus("feedback");
    
    setTimeout(() => {
      if (totalAttempts >= 9) {
        // End test after 10 trials
        finishTest();
      } else if (correct && level < 9) {
        // Increase difficulty if correct and not at max level
        const newLevel = level + 1;
        setLevel(newLevel);
        showNextSequence(newLevel);
      } else if (!correct && level > 3) {
        // Decrease difficulty if incorrect and not at min level
        const newLevel = level - 1;
        setLevel(newLevel);
        showNextSequence(newLevel);
      } else {
        // Keep same level
        showNextSequence(level);
      }
    }, 1500);
  };

  // Calculate final score and complete the test
  const finishTest = () => {
    // Calculate score based on performance
    // Formula: base score from highest level reached + bonus from correct ratio
    const levelScore = Math.max(0, ((level - 2) / 7) * 70); // Level 3 = 10%, Level 10 = 80%
    const accuracyScore = (correctAttempts / totalAttempts) * 30; // up to 30% from accuracy
    
    const finalScore = Math.round(levelScore + accuracyScore);
    setScore(finalScore);
    setStatus("completed");
    
    toast({
      title: "Test Completed!",
      description: `Your working memory score: ${finalScore}%`,
    });
  };

  // Format the working memory level as a description
  const getWorkingMemoryDescription = (score: number) => {
    if (score >= 90) return "Exceptional";
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Above Average";
    if (score >= 60) return "Average";
    if (score >= 50) return "Below Average";
    if (score >= 40) return "Struggles with working memory";
    return "Significant difficulty with working memory";
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-dyslexai-blue-700">Working Memory Assessment</CardTitle>
        <CardDescription>
          Test your ability to hold and manipulate information in short-term memory
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {status === "intro" && (
          <div className="text-center p-8">
            <h3 className="text-lg font-bold mb-4">Instructions</h3>
            <p className="mb-6">
              In this test, you'll be shown a sequence of letters that you need to memorize. 
              The letters will disappear after a short time, and then you'll need to recall them in the correct order.
            </p>
            <p className="mb-6">
              The test will adjust to your performance - getting more difficult if you're successful and easier if you make mistakes.
            </p>
            <Button onClick={handleStart} className="dyslexai-btn-primary">
              <Brain className="mr-2 h-5 w-5" />
              Start Test
            </Button>
          </div>
        )}
        
        {status === "memorize" && (
          <div className="p-8 text-center">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Memorize these letters in order:</p>
              <div className="flex justify-center gap-3 mb-4">
                {currentSequence.map((item, index) => (
                  <div 
                    key={index} 
                    className="w-12 h-12 flex items-center justify-center text-2xl font-bold border-2 border-dyslexai-blue-300 rounded-md bg-white"
                  >
                    {item.value}
                  </div>
                ))}
              </div>
            </div>
            
            <Progress 
              value={(memorizeTimeLeft / (level * 1000)) * 100} 
              className="w-full max-w-md mx-auto h-2"
            />
          </div>
        )}
        
        {status === "recall" && (
          <div className="p-8">
            <p className="text-center text-sm text-gray-500 mb-4">Recall the sequence in order:</p>
            
            <div className="flex justify-center gap-3 mb-6">
              {Array.from({ length: currentSequence.length }).map((_, index) => (
                <div 
                  key={index} 
                  className={`w-12 h-12 flex items-center justify-center text-2xl font-bold border-2 ${
                    index < userSequence.length 
                      ? 'border-dyslexai-blue-500 bg-dyslexai-blue-50' 
                      : 'border-gray-300 bg-gray-50'
                  } rounded-md`}
                >
                  {index < userSequence.length ? userSequence[index].value : ""}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
              {letters.map((letter) => {
                const isDisabled = userSequence.some(item => item.value === letter);
                
                return (
                  <Button
                    key={letter}
                    variant="outline"
                    className={`h-12 text-lg font-semibold ${
                      isDisabled ? 'opacity-50' : 'hover:bg-dyslexai-blue-50'
                    }`}
                    disabled={isDisabled}
                    onClick={() => handleLetterClick(letter)}
                  >
                    {letter}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
        
        {status === "feedback" && (
          <div className="p-8">
            <p className="text-center text-sm text-gray-500 mb-4">Your recall:</p>
            
            <div className="flex justify-center gap-3 mb-6">
              {userSequence.map((item, index) => (
                <div 
                  key={index} 
                  className={`w-12 h-12 flex items-center justify-center text-xl font-bold border-2 ${
                    item.isCorrect 
                      ? 'border-green-500 bg-green-50 text-green-700' 
                      : 'border-red-500 bg-red-50 text-red-700'
                  } rounded-md relative`}
                >
                  {item.value}
                  {item.isCorrect ? (
                    <Check className="absolute -top-2 -right-2 h-5 w-5 text-green-600 bg-white rounded-full" />
                  ) : (
                    <X className="absolute -top-2 -right-2 h-5 w-5 text-red-600 bg-white rounded-full" />
                  )}
                </div>
              ))}
            </div>
            
            <p className="text-center text-sm text-gray-500 mb-2">Correct sequence:</p>
            <div className="flex justify-center gap-3 mb-6">
              {currentSequence.map((item, index) => (
                <div 
                  key={index} 
                  className="w-12 h-12 flex items-center justify-center text-xl font-bold border-2 border-gray-300 bg-white rounded-md"
                >
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {status === "completed" && (
          <div className="text-center p-8">
            <h3 className="text-lg font-bold mb-4">Test Complete!</h3>
            
            <div className="max-w-md mx-auto mb-6">
              <div className="bg-dyslexai-blue-50 rounded-lg p-4 mb-4">
                <p className="text-xl mb-2">Your score: <span className="font-bold">{score}%</span></p>
                <p className="text-lg mb-2">Highest level reached: <span className="font-bold">{level}</span></p>
                <p className="text-lg mb-4">Accuracy: <span className="font-bold">{Math.round((correctAttempts / totalAttempts) * 100)}%</span></p>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Working memory evaluation:</p>
                  <p className="font-medium">{getWorkingMemoryDescription(score)}</p>
                  
                  <p className="mt-4 text-sm text-gray-600">
                    {score < 50 ? 
                      "Lower working memory scores are often associated with dyslexia and can affect reading comprehension and learning." : 
                      "Your working memory appears to be functioning well, which is important for reading comprehension and learning new information."}
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              className="dyslexai-btn-primary w-full max-w-md" 
              onClick={() => onComplete(score)}
            >
              Continue to Next Test
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkingMemoryTest;
