
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Clock, ArrowRight } from "lucide-react";

type RANTestProps = {
  onComplete: (score: number) => void;
};

type TestStatus = "intro" | "countdown" | "running" | "completed";

const ITEMS_PER_ROW = 5;
const ROWS = 4;
const TOTAL_ITEMS = ITEMS_PER_ROW * ROWS;

// Test items - we use letters for this implementation
const items = [
  "a", "b", "c", "d", "o", 
  "p", "q", "r", "s", "t", 
  "e", "f", "g", "h", "i", 
  "j", "k", "l", "m", "n"
];

// Benchmark times in seconds
const EXCELLENT_TIME = 20;
const GOOD_TIME = 30;
const AVERAGE_TIME = 40;
const BELOW_AVERAGE_TIME = 50;
// Above 50 seconds is considered potential difficulty

const RANTest = ({ onComplete }: RANTestProps) => {
  const [status, setStatus] = useState<TestStatus>("intro");
  const [countdown, setCountdown] = useState(3);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [namedCount, setNamedCount] = useState(0);
  const [score, setScore] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const { toast } = useToast();
  
  // Handle countdown before starting the test
  useEffect(() => {
    if (status === "countdown" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (status === "countdown" && countdown === 0) {
      startTest();
    }
  }, [status, countdown]);
  
  // Handle the timer while the test is running
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - (elapsedTime * 1000);
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setElapsedTime(elapsed);
      }, 100);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const startCountdown = () => {
    setStatus("countdown");
    setCountdown(3);
    toast({
      title: "Get Ready!",
      description: "Name each letter as quickly as you can.",
    });
  };
  
  const startTest = () => {
    setStatus("running");
    setIsRunning(true);
    setElapsedTime(0);
    setNamedCount(0);
    startTimeRef.current = Date.now();
  };
  
  const pauseTest = () => {
    setIsRunning(false);
  };
  
  const resumeTest = () => {
    setIsRunning(true);
  };
  
  const resetTest = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setNamedCount(0);
    setStatus("intro");
  };
  
  const handleItemNamed = () => {
    const newNamedCount = namedCount + 1;
    setNamedCount(newNamedCount);
    
    if (newNamedCount >= TOTAL_ITEMS) {
      completeTest();
    }
  };
  
  const completeTest = () => {
    setIsRunning(false);
    setStatus("completed");
    
    // Calculate score based on time taken
    // The faster the better, with a maximum score of 100
    let calculatedScore = 0;
    
    if (elapsedTime <= EXCELLENT_TIME) {
      calculatedScore = 95 + (EXCELLENT_TIME - elapsedTime) / EXCELLENT_TIME * 5;
    } else if (elapsedTime <= GOOD_TIME) {
      calculatedScore = 85 + (GOOD_TIME - elapsedTime) / (GOOD_TIME - EXCELLENT_TIME) * 10;
    } else if (elapsedTime <= AVERAGE_TIME) {
      calculatedScore = 70 + (AVERAGE_TIME - elapsedTime) / (AVERAGE_TIME - GOOD_TIME) * 15;
    } else if (elapsedTime <= BELOW_AVERAGE_TIME) {
      calculatedScore = 50 + (BELOW_AVERAGE_TIME - elapsedTime) / (BELOW_AVERAGE_TIME - AVERAGE_TIME) * 20;
    } else {
      calculatedScore = Math.max(30, 50 - (elapsedTime - BELOW_AVERAGE_TIME) / 5);
    }
    
    // Ensure score is between 0 and 100 and rounded to nearest integer
    const finalScore = Math.min(100, Math.max(0, Math.round(calculatedScore)));
    setScore(finalScore);
    
    toast({
      title: "Test Completed!",
      description: `You completed the test in ${elapsedTime.toFixed(2)} seconds!`,
    });
  };
  
  const handleFinish = () => {
    onComplete(score);
  };
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const hundredths = Math.floor((timeInSeconds % 1) * 100);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-dyslexai-blue-700">Rapid Automatized Naming (RAN) Test</CardTitle>
        <CardDescription>
          Measure how quickly you can name familiar visual items
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {status === "intro" && (
          <div className="text-center p-8">
            <h3 className="text-lg font-bold mb-4">Instructions</h3>
            <p className="mb-6">
              In this test, you'll be shown a grid of letters. Name each letter out loud as quickly as possible, going from left to right, row by row.
            </p>
            <p className="mb-6">
              Click the "Start" button when you're ready, and then click each letter as you say it out loud. Try to go as quickly as you can while still being accurate.
            </p>
            <Button onClick={startCountdown} className="dyslexai-btn-primary">
              <Play className="mr-2 h-5 w-5" />
              Start Test
            </Button>
          </div>
        )}
        
        {status === "countdown" && (
          <div className="text-center p-16">
            <div className="text-6xl font-bold text-dyslexai-blue-600 mb-4">
              {countdown}
            </div>
            <p>Get ready to start naming...</p>
          </div>
        )}
        
        {status === "running" && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center text-lg font-semibold">
                <Clock className="mr-2 h-5 w-5 text-dyslexai-blue-500" />
                {formatTime(elapsedTime)}
              </div>
              
              <div className="flex gap-2">
                {isRunning ? (
                  <Button variant="outline" onClick={pauseTest}>
                    <Pause className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button variant="outline" onClick={resumeTest}>
                    <Play className="h-5 w-5" />
                  </Button>
                )}
                <Button variant="outline" onClick={resetTest}>
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="mb-4">
              <Progress value={(namedCount / TOTAL_ITEMS) * 100} />
              <div className="text-right text-sm mt-1">
                {namedCount} of {TOTAL_ITEMS} named
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-3 mt-6">
              {items.map((item, index) => {
                const isNamed = index < namedCount;
                
                return (
                  <Button
                    key={index}
                    variant={isNamed ? "ghost" : "outline"}
                    className={`h-16 text-2xl font-bold ${
                      isNamed 
                        ? "bg-gray-100 text-gray-400" 
                        : "bg-white hover:bg-dyslexai-blue-50"
                    }`}
                    disabled={!isRunning || isNamed || index !== namedCount}
                    onClick={handleItemNamed}
                  >
                    {item}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
        
        {status === "completed" && (
          <div className="text-center p-8">
            <h3 className="text-lg font-bold mb-4">Test Complete!</h3>
            
            <div className="max-w-md mx-auto mb-6">
              <div className="bg-dyslexai-blue-50 rounded-lg p-4 mb-4">
                <p className="text-lg">Your time: <span className="font-bold">{formatTime(elapsedTime)}</span></p>
                <p className="text-xl mb-2">Your score: <span className="font-bold">{score}%</span></p>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Performance evaluation:</p>
                  {elapsedTime <= EXCELLENT_TIME && (
                    <p className="text-green-600 font-medium">Excellent! Your naming speed is very fast.</p>
                  )}
                  {elapsedTime > EXCELLENT_TIME && elapsedTime <= GOOD_TIME && (
                    <p className="text-green-500 font-medium">Good! Your naming speed is above average.</p>
                  )}
                  {elapsedTime > GOOD_TIME && elapsedTime <= AVERAGE_TIME && (
                    <p className="text-yellow-500 font-medium">Average. Your naming speed is within normal range.</p>
                  )}
                  {elapsedTime > AVERAGE_TIME && elapsedTime <= BELOW_AVERAGE_TIME && (
                    <p className="text-orange-500 font-medium">Below average. You may benefit from exercises to improve naming speed.</p>
                  )}
                  {elapsedTime > BELOW_AVERAGE_TIME && (
                    <p className="text-red-500 font-medium">Your naming speed indicates potential difficulty. This is often seen in individuals with dyslexia.</p>
                  )}
                </div>
              </div>
            </div>
            
            <Button 
              className="dyslexai-btn-primary w-full max-w-md" 
              onClick={handleFinish}
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

export default RANTest;
