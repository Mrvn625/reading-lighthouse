
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Timer, RotateCcw, XCircle, CheckCircle, Zap, HelpCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ProcessingSpeedTestProps = {
  onComplete: (score: number) => void;
};

type TestStatus = "intro" | "running" | "completed";
type SymbolType = "target" | "distractor";

interface Symbol {
  id: number;
  type: SymbolType;
  value: string;
  position: { top: string; left: string };
}

// Research-based thresholds for processing speed
// Based on studies by Willcutt et al. (2005) and Shanahan et al. (2006)
const SCORE_EXCELLENT = 85;  // 95th percentile
const SCORE_GOOD = 70;       // 75th percentile
const SCORE_AVERAGE = 55;    // 50th percentile
const SCORE_BELOW_AVERAGE = 40; // 25th percentile
// Below 40 is considered potential difficulty (below 10th percentile)

const ProcessingSpeedTest = ({ onComplete }: ProcessingSpeedTestProps) => {
  const [status, setStatus] = useState<TestStatus>("intro");
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [timer, setTimer] = useState(60); // 60-second test
  const [startTime, setStartTime] = useState(0);
  const [score, setScore] = useState(0);
  const [correctResponses, setCorrectResponses] = useState(0);
  const [incorrectResponses, setIncorrectResponses] = useState(0);
  const [missedTargets, setMissedTargets] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [totalTargets, setTotalTargets] = useState(0);
  const [roundTargets, setRoundTargets] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const symbolsRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  // Target and distractor symbols
  // Using b/d and p/q pairs that are commonly confused in dyslexia
  // Based on research by Dehaene (2009) on letter reversals in dyslexia
  const targetSymbols = ['b', 'd'];
  const distractorSymbols = ['p', 'q', 'g', 'j', 'u', 'n', 'h', 'm'];

  // Start the test
  const handleStart = () => {
    setStatus("running");
    setStartTime(Date.now());
    setCorrectResponses(0);
    setIncorrectResponses(0);
    setMissedTargets(0);
    setCurrentRound(0);
    setTotalTargets(0);
    setTimer(60);
    generateNewRound();
    
    toast({
      title: "Test Started",
      description: "Click on 'b' and 'd' as quickly as you can!",
    });
  };

  // Handle the timer
  useEffect(() => {
    if (status === "running" && timer > 0) {
      timerRef.current = setTimeout(() => {
        setTimer(prev => prev - 0.1);
      }, 100);
      
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    } else if (status === "running" && timer <= 0) {
      completeTest();
    }
  }, [status, timer]);

  // Generate a new round of symbols
  const generateNewRound = () => {
    if (!symbolsRef.current) return;
    
    const containerWidth = symbolsRef.current.offsetWidth;
    const containerHeight = symbolsRef.current.offsetHeight;
    
    // Create 12-15 symbols per round, with 3-5 targets (25-33%)
    const numSymbols = Math.floor(Math.random() * 4) + 12; // 12-15 symbols
    const numTargets = Math.floor(Math.random() * 3) + 3; // 3-5 targets
    const numDistractors = numSymbols - numTargets;
    
    setRoundTargets(numTargets);
    setTotalTargets(prev => prev + numTargets);
    
    const newSymbols: Symbol[] = [];
    
    // Add target symbols
    for (let i = 0; i < numTargets; i++) {
      const targetValue = targetSymbols[Math.floor(Math.random() * targetSymbols.length)];
      
      newSymbols.push({
        id: i,
        type: "target",
        value: targetValue,
        position: {
          top: `${Math.random() * 80 + 5}%`,
          left: `${Math.random() * 80 + 5}%`
        }
      });
    }
    
    // Add distractor symbols
    for (let i = 0; i < numDistractors; i++) {
      const distractorValue = distractorSymbols[Math.floor(Math.random() * distractorSymbols.length)];
      
      newSymbols.push({
        id: numTargets + i,
        type: "distractor",
        value: distractorValue,
        position: {
          top: `${Math.random() * 80 + 5}%`,
          left: `${Math.random() * 80 + 5}%`
        }
      });
    }
    
    // Shuffle the symbols array for random positioning
    const shuffledSymbols = newSymbols.sort(() => Math.random() - 0.5);
    
    setSymbols(shuffledSymbols);
    setCurrentRound(prev => prev + 1);
  };

  // Handle clicking on a symbol
  const handleSymbolClick = (symbol: Symbol) => {
    if (status !== "running") return;
    
    if (symbol.type === "target") {
      setCorrectResponses(prev => prev + 1);
      toast({
        title: "Correct!",
        description: `You found a target symbol: '${symbol.value}'`,
        duration: 1000,
      });
    } else {
      setIncorrectResponses(prev => prev + 1);
      toast({
        title: "Incorrect",
        description: `'${symbol.value}' is not a target symbol`,
        duration: 1000,
        variant: "destructive",
      });
    }
    
    // Remove the clicked symbol from the array
    setSymbols(prev => prev.filter(s => s.id !== symbol.id));
    
    // If all symbols are clicked or if we've been in this round for more than 10 seconds, generate a new round
    if (symbols.length <= 1) {
      // Count unclicked targets as misses
      const missedTargetsInRound = symbols.filter(s => s.type === "target").length;
      setMissedTargets(prev => prev + missedTargetsInRound);
      
      generateNewRound();
    }
  };

  // Complete the test and calculate the score
  const completeTest = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Count remaining targets as misses
    const finalMissedTargets = missedTargets + symbols.filter(s => s.type === "target").length;
    setMissedTargets(finalMissedTargets);
    
    // Calculate score based on performance
    // Formula based on research by Willcutt et al. (2005) on processing speed in dyslexia
    const totalResponses = correctResponses + incorrectResponses;
    
    // Calculate accuracy (max 60% of score)
    let accuracy = 0;
    if (totalResponses > 0) {
      accuracy = (correctResponses / totalResponses) * 60;
    }
    
    // Calculate completion rate (max 40% of score)
    let completionRate = 0;
    if (totalTargets > 0) {
      completionRate = (correctResponses / totalTargets) * 40;
    }
    
    const finalScore = Math.round(accuracy + completionRate);
    setScore(finalScore);
    setStatus("completed");
    
    // Save result to localStorage
    const testResults = localStorage.getItem("testResults") 
      ? JSON.parse(localStorage.getItem("testResults") || '{}') 
      : {};
    
    testResults["processingSpeed"] = finalScore;
    localStorage.setItem("testResults", JSON.stringify(testResults));
    
    // Save test date
    const testDates = localStorage.getItem("testDates") 
      ? JSON.parse(localStorage.getItem("testDates") || '{}') 
      : {};
    
    testDates["processingSpeed"] = new Date().toISOString();
    localStorage.setItem("testDates", JSON.stringify(testDates));
    
    toast({
      title: "Test Completed!",
      description: `Your processing speed score: ${finalScore}%`,
    });
  };
  
  // Function to get evaluation text based on score
  const getEvaluationText = (score: number): string => {
    if (score >= SCORE_EXCELLENT) {
      return "Excellent processing speed! You quickly and accurately identified target symbols.";
    } else if (score >= SCORE_GOOD) {
      return "Good processing speed. You process visual information efficiently.";
    } else if (score >= SCORE_AVERAGE) {
      return "Average processing speed. You're within the normal range for visual processing.";
    } else if (score >= SCORE_BELOW_AVERAGE) {
      return "Below average processing speed. You may benefit from exercises to improve visual processing.";
    } else {
      return "Processing speed difficulties detected. This is commonly associated with dyslexia.";
    }
  };

  // Get color for evaluation text
  const getEvaluationColor = (score: number): string => {
    if (score >= SCORE_EXCELLENT) return "text-green-600";
    if (score >= SCORE_GOOD) return "text-green-500";
    if (score >= SCORE_AVERAGE) return "text-yellow-500";
    if (score >= SCORE_BELOW_AVERAGE) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-dyslexai-blue-700">
          Processing Speed Evaluation
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>This test measures how quickly you can process and respond to visual information. Processing speed is often slower in individuals with dyslexia and can affect reading fluency.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>
          Assess how quickly you can process and respond to visual information
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {status === "intro" && (
          <div className="text-center p-8">
            <h3 className="text-lg font-bold mb-4">Instructions</h3>
            <p className="mb-4">
              In this test, you'll see various letters appear on the screen.
            </p>
            <div className="bg-dyslexai-blue-50 p-4 rounded-lg mb-4">
              <p className="mb-2 font-medium">
                Your task is to click ONLY on the letters <span className="text-dyslexai-blue-600 text-xl">b</span> and <span className="text-dyslexai-blue-600 text-xl">d</span> as quickly as possible.
              </p>
              <p className="text-sm text-gray-600">
                Ignore all other letters. The test will last for 60 seconds.
              </p>
            </div>
            <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                <div className="text-left">
                  <p className="font-medium text-yellow-700 mb-1">Tip:</p>
                  <p className="text-sm text-yellow-700">
                    This test uses letters that are commonly confused by people with dyslexia. Try to respond as quickly and accurately as possible.
                  </p>
                </div>
              </div>
            </div>
            <Button onClick={handleStart} className="dyslexai-btn-primary">
              <Zap className="mr-2 h-5 w-5" />
              Start Test
            </Button>
          </div>
        )}
        
        {status === "running" && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Timer className="mr-2 h-5 w-5 text-dyslexai-blue-500" />
                <span className="font-semibold">{Math.ceil(timer)}s</span>
                <Progress 
                  value={(timer / 60) * 100} 
                  className="w-24 ml-3 h-2"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="text-sm">
                  <CheckCircle className="inline-block mr-1 h-4 w-4 text-green-500" />
                  <span>{correctResponses}</span>
                </div>
                <div className="text-sm">
                  <XCircle className="inline-block mr-1 h-4 w-4 text-red-500" />
                  <span>{incorrectResponses}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleStart}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-2 rounded-lg border border-dyslexai-blue-100 mb-3">
              <p className="text-sm text-center">
                <span className="font-medium">Round {currentRound}</span> • 
                <span className="ml-1">Find all {roundTargets} targets: </span>
                <span className="font-bold text-dyslexai-blue-600">b</span> and 
                <span className="font-bold text-dyslexai-blue-600"> d</span>
              </p>
            </div>
            
            <div 
              ref={symbolsRef}
              className="relative bg-gray-50 border border-gray-200 rounded-lg h-[400px] mb-4 overflow-hidden"
            >
              <div className="absolute top-2 left-2 bg-white/80 rounded px-2 py-1 text-sm font-medium">
                Click on: <span className="text-dyslexai-blue-600 font-bold">b</span> and <span className="text-dyslexai-blue-600 font-bold">d</span>
              </div>
              
              {symbols.map((symbol) => (
                <div
                  key={symbol.id}
                  className="absolute cursor-pointer transition-transform hover:scale-110"
                  style={{ 
                    top: symbol.position.top, 
                    left: symbol.position.left 
                  }}
                  onClick={() => handleSymbolClick(symbol)}
                >
                  <div className="w-12 h-12 bg-white shadow-md rounded-full flex items-center justify-center text-2xl font-bold">
                    {symbol.value}
                  </div>
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
                
                <div className="flex justify-around my-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Correct</p>
                    <p className="text-xl font-bold text-green-600">{correctResponses}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Incorrect</p>
                    <p className="text-xl font-bold text-red-600">{incorrectResponses}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Missed</p>
                    <p className="text-xl font-bold text-orange-600">{missedTargets}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Processing speed evaluation:</p>
                  
                  <p className={`font-medium ${getEvaluationColor(score)}`}>
                    {getEvaluationText(score)}
                  </p>
                  
                  <p className="mt-3 text-sm text-gray-600">
                    {score < SCORE_AVERAGE ? 
                      "Slower processing speed can affect reading fluency and make it harder to recognize words quickly." : 
                      "Good processing speed supports reading fluency and efficient word recognition."}
                  </p>
                  
                  <div className="mt-4 text-sm text-gray-600 p-2 bg-white rounded">
                    <p className="mb-1"><strong>Research basis:</strong></p>
                    <p>This test uses thresholds from Willcutt et al. (2005) on processing speed deficits in dyslexia. The target symbols (b/d) were chosen based on Dehaene's research (2009) on common letter reversals in dyslexia.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              className="dyslexai-btn-primary w-full max-w-md" 
              onClick={() => onComplete(score)}
            >
              Continue to Results
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProcessingSpeedTest;
