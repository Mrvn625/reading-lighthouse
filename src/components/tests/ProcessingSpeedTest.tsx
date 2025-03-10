
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Timer, RotateCcw, XCircle, CheckCircle, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const symbolsRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  // Target and distractor symbols
  const targetSymbols = ['b', 'd'];
  const distractorSymbols = ['p', 'q', 'g', 'j'];

  // Start the test
  const handleStart = () => {
    setStatus("running");
    setStartTime(Date.now());
    setCorrectResponses(0);
    setIncorrectResponses(0);
    setMissedTargets(0);
    setCurrentRound(0);
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
    
    // Create 12 symbols per round, with 3-4 targets (25-33%)
    const numTargets = Math.floor(Math.random() * 2) + 3; // 3-4 targets
    const numDistractors = 12 - numTargets; // 8-9 distractors
    
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
    
    setSymbols(newSymbols);
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
    if (symbols.length <= 1 || currentRound > 0 && (Date.now() - startTime) / 1000 > currentRound * 10) {
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
    // Formula considers correct responses, incorrect responses, and missed targets
    const totalTargets = correctResponses + finalMissedTargets;
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
    
    toast({
      title: "Test Completed!",
      description: `Your processing speed score: ${finalScore}%`,
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-dyslexai-blue-700">Processing Speed Evaluation</CardTitle>
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
            <p className="mb-4 font-medium">
              Your task is to click ONLY on the letters <span className="text-dyslexai-blue-600">b</span> and <span className="text-dyslexai-blue-600">d</span> as quickly as possible.
            </p>
            <p className="mb-6">
              Ignore all other letters. The test will last for 60 seconds.
            </p>
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
                  
                  {score >= 85 && (
                    <p className="font-medium text-green-600">Excellent processing speed! You quickly and accurately identified target symbols.</p>
                  )}
                  {score >= 70 && score < 85 && (
                    <p className="font-medium text-green-500">Good processing speed. You process visual information efficiently.</p>
                  )}
                  {score >= 55 && score < 70 && (
                    <p className="font-medium text-yellow-500">Average processing speed. You're within the normal range for visual processing.</p>
                  )}
                  {score >= 40 && score < 55 && (
                    <p className="font-medium text-orange-500">Below average processing speed. You may benefit from exercises to improve visual processing.</p>
                  )}
                  {score < 40 && (
                    <p className="font-medium text-red-500">Processing speed difficulties detected. This is commonly associated with dyslexia.</p>
                  )}
                  
                  <p className="mt-4 text-sm text-gray-600">
                    {score < 55 ? 
                      "Slower processing speed can affect reading fluency and make it harder to recognize words quickly." : 
                      "Good processing speed supports reading fluency and efficient word recognition."}
                  </p>
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
