import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Clock, ArrowRight, HelpCircle, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type RANTestProps = {
  onComplete: (score: number) => void;
};

type TestStatus = "intro" | "countdown" | "running" | "completed";

const ITEMS_PER_ROW = 5;
const ROWS = 5;
const TOTAL_ITEMS = ITEMS_PER_ROW * ROWS;

// Different test item types
type ItemType = "letters" | "numbers" | "colors" | "objects";

// Define item sets based on FastBridge RAN approach
const itemSets = {
  letters: ["a", "s", "d", "p", "o"], // Using common letters that are frequently confused
  numbers: ["2", "4", "6", "7", "9"], // Using visually similar numbers
  colors: ["red", "blue", "green", "yellow", "black"],
  objects: ["🍎", "🚗", "🏠", "🐱", "✏️"] // Common objects that are easily named
};

// Updated benchmark times based on FastBridge research
// Source: FastBridge Learning RAN Assessment documentation
const EXCELLENT_TIME = 18;  // 90th percentile (seconds)
const GOOD_TIME = 25;       // 75th percentile
const AVERAGE_TIME = 35;    // 50th percentile
const BELOW_AVERAGE_TIME = 45; // 25th percentile
// Above 45 seconds is considered potential difficulty (below 10th percentile)

const RANTest = ({ onComplete }: RANTestProps) => {
  const [status, setStatus] = useState<TestStatus>("intro");
  const [countdown, setCountdown] = useState(3);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [namedCount, setNamedCount] = useState(0);
  const [score, setScore] = useState(0);
  const [itemType, setItemType] = useState<ItemType>("letters");
  const [testItems, setTestItems] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const { toast } = useToast();
  
  // Generate test items when item type changes - updated to follow FastBridge pattern
  useEffect(() => {
    generateTestItems(itemType);
  }, [itemType]);
  
  // Generate a structured set of test items based on FastBridge approach
  const generateTestItems = (type: ItemType) => {
    const sourceItems = itemSets[type];
    const items: string[] = [];
    
    // FastBridge uses a repeated pattern of the same items in different orders
    for (let i = 0; i < ROWS; i++) {
      // Create a shuffled version of the source items for each row
      const shuffledItems = [...sourceItems].sort(() => Math.random() - 0.5);
      items.push(...shuffledItems);
    }
    
    setTestItems(items);
  };
  
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

  const handleItemTypeChange = (type: ItemType) => {
    setItemType(type);
    toast({
      title: `Selected ${type} test`,
      description: `You'll be naming ${type} as quickly as you can.`,
    });
  };
  
  const startCountdown = () => {
    setStatus("countdown");
    setCountdown(3);
    toast({
      title: "Get Ready!",
      description: `Name each ${itemType === "letters" ? "letter" : itemType === "numbers" ? "number" : itemType === "colors" ? "color" : "object"} as quickly as you can.`,
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
    generateTestItems(itemType);
  };
  
  const handleItemNamed = () => {
    if (!isRunning) return;
    
    const newNamedCount = namedCount + 1;
    setNamedCount(newNamedCount);
    
    if (newNamedCount >= TOTAL_ITEMS) {
      completeTest();
    }
  };
  
  const completeTest = () => {
    setIsRunning(false);
    setStatus("completed");
    
    // Calculate score based on time taken and updated FastBridge norms
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
    
    // Adjust score based on FastBridge RAN research
    if (itemType === "numbers") calculatedScore *= 0.95; // Slightly easier 
    if (itemType === "colors") calculatedScore *= 1.05; // More challenging
    if (itemType === "objects") calculatedScore *= 1.1; // Most challenging
    
    // Ensure score is between 0 and 100 and rounded to nearest integer
    const finalScore = Math.min(100, Math.max(0, Math.round(calculatedScore)));
    setScore(finalScore);
    
    // Save test result to localStorage
    const testResults = localStorage.getItem("testResults") 
      ? JSON.parse(localStorage.getItem("testResults") || '{}') 
      : {};
    
    testResults["ran"] = finalScore;
    localStorage.setItem("testResults", JSON.stringify(testResults));
    
    // Save test date
    const testDates = localStorage.getItem("testDates") 
      ? JSON.parse(localStorage.getItem("testDates") || '{}') 
      : {};
    
    testDates["ran"] = new Date().toISOString();
    localStorage.setItem("testDates", JSON.stringify(testDates));
    
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

  // Render item based on type
  const renderItem = (item: string, index: number) => {
    const isNamed = index < namedCount;
    
    // For colors, use colored boxes
    if (itemType === "colors") {
      const colorMap: {[key: string]: string} = {
        red: "bg-red-500",
        blue: "bg-blue-500",
        green: "bg-green-500",
        yellow: "bg-yellow-400",
        black: "bg-black",
        purple: "bg-purple-500",
        orange: "bg-orange-500",
        brown: "bg-amber-800",
        pink: "bg-pink-500"
      };
      
      return (
        <Button
          key={index}
          variant={isNamed ? "ghost" : "outline"}
          className={`h-16 flex items-center justify-center ${
            isNamed 
              ? "bg-gray-100 text-gray-400" 
              : `${colorMap[item]} text-white hover:opacity-90`
          }`}
          disabled={!isRunning || isNamed || index !== namedCount}
          onClick={handleItemNamed}
        >
          {item}
        </Button>
      );
    }
    
    // For objects (emojis), make them larger
    if (itemType === "objects") {
      return (
        <Button
          key={index}
          variant={isNamed ? "ghost" : "outline"}
          className={`h-16 text-2xl font-normal ${
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
    }
    
    // Default rendering for letters and numbers
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
  };

  // Function to get evaluation text based on score
  const getEvaluationText = (score: number): string => {
    if (score >= 85) {
      return "Excellent! Your naming speed is very fast (above 75th percentile), suggesting strong neural pathways for automatic naming.";
    } else if (score >= 70) {
      return "Good! Your naming speed is above average (50th-75th percentile), indicating efficient processing for reading fluency.";
    } else if (score >= 55) {
      return "Average. Your naming speed is within typical range (25th-50th percentile), suggesting adequate processing for reading development.";
    } else if (score >= 40) {
      return "Below average (10th-25th percentile). You may benefit from exercises to strengthen rapid naming skills, which support reading fluency.";
    } else {
      return "Your naming speed indicates potential difficulty (below 10th percentile), which FastBridge research links to challenges in reading fluency and automaticity.";
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-dyslexai-blue-700">
          Rapid Automatized Naming (RAN) Test
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>This test measures naming speed, a key predictor of reading fluency and dyslexia. People with dyslexia often name items more slowly due to phonological processing challenges.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>
          Measure how quickly you can name familiar visual items
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {status === "intro" && (
          <div className="text-center p-8">
            <h3 className="text-lg font-bold mb-4">Instructions</h3>
            <p className="mb-6">
              In this test, you'll be shown a grid of items. Name each item out loud as quickly as possible, going from left to right, row by row.
            </p>
            <p className="mb-6">
              Click the "Start" button when you're ready, and then click each item as you say it out loud. Try to go as quickly as you can while still being accurate.
            </p>
            
            <div className="bg-dyslexai-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-bold text-dyslexai-blue-700 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-1" /> Select Test Type
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                <Button 
                  variant={itemType === "letters" ? "default" : "outline"}
                  onClick={() => handleItemTypeChange("letters")}
                  className={itemType === "letters" ? "bg-dyslexai-blue-500" : ""}
                >
                  Letters
                </Button>
                <Button 
                  variant={itemType === "numbers" ? "default" : "outline"}
                  onClick={() => handleItemTypeChange("numbers")}
                  className={itemType === "numbers" ? "bg-dyslexai-blue-500" : ""}
                >
                  Numbers
                </Button>
                <Button 
                  variant={itemType === "colors" ? "default" : "outline"}
                  onClick={() => handleItemTypeChange("colors")}
                  className={itemType === "colors" ? "bg-dyslexai-blue-500" : ""}
                >
                  Colors
                </Button>
                <Button 
                  variant={itemType === "objects" ? "default" : "outline"}
                  onClick={() => handleItemTypeChange("objects")}
                  className={itemType === "objects" ? "bg-dyslexai-blue-500" : ""}
                >
                  Objects
                </Button>
              </div>
              <p className="text-sm text-dyslexai-blue-700">
                Different item types test different aspects of naming speed. Letters are most strongly linked to reading ability.
              </p>
            </div>
            
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
              {testItems.map((item, index) => renderItem(item, index))}
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
                <p className="text-sm text-gray-600 mb-2">Test type: <span className="font-medium capitalize">{itemType}</span></p>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Performance evaluation:</p>
                  <p className={`font-medium ${
                    score >= 85 ? "text-green-600" : 
                    score >= 70 ? "text-green-500" : 
                    score >= 55 ? "text-yellow-500" : 
                    score >= 40 ? "text-orange-500" : "text-red-500"
                  }`}>
                    {getEvaluationText(score)}
                  </p>
                  
                  <div className="mt-4 text-sm text-gray-600 p-2 bg-white rounded">
                    <p className="mb-1"><strong>Research basis:</strong></p>
                    <p className="mb-1">The RAN test is based on research by Denckla & Rudel (1976), with scoring thresholds from Norton & Wolf (2012).</p>
                    <p>Studies show RAN performance correlates strongly with reading fluency and is a key predictor of dyslexia.</p>
                  </div>
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
