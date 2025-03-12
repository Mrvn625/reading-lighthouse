
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/ui/page-header";
import { BrainCircuit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button"; // Added Button import
import PhonologicalTest from "@/components/tests/PhonologicalTest";
import RANTest from "@/components/tests/RANTest";
import WorkingMemoryTest from "@/components/tests/WorkingMemoryTest";
import ProcessingSpeedTest from "@/components/tests/ProcessingSpeedTest";
import AudioDiscriminationTest from "@/components/tests/AudioDiscriminationTest";
import DirectionSenseTest from "@/components/tests/DirectionSenseTest";
import TestOverview from "@/components/tests/TestOverview";
import TestScience from "@/components/tests/TestScience";
import AvailableTests from "@/components/tests/AvailableTests";

const CognitiveTests = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{[key: string]: number}>({});
  const [testDates, setTestDates] = useState<{[key: string]: string}>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Load any saved test results on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem("testResults");
    if (savedResults) {
      setTestResults(JSON.parse(savedResults));
    }
    
    const savedDates = localStorage.getItem("testDates");
    if (savedDates) {
      setTestDates(JSON.parse(savedDates));
    }
    
    // Check if user has completed profile
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast({
        title: "Profile Needed",
        description: "Please complete your profile before taking tests",
      });
      navigate("/profile");
    }
  }, [navigate, toast]);
  
  const handleStartTest = (testId: string) => {
    setActiveTab("tests");
    setActiveTest(testId);
    
    toast({
      title: "Starting Test",
      description: `Please follow the instructions to complete the ${testId} test`,
    });
  };
  
  const handleTestComplete = (testId: string, score: number) => {
    const currentDate = new Date().toISOString();
    
    const updatedResults = {
      ...testResults,
      [testId]: score
    };
    
    const updatedDates = {
      ...testDates,
      [testId]: currentDate
    };
    
    setTestResults(updatedResults);
    setTestDates(updatedDates);
    
    // Save results and dates to localStorage
    localStorage.setItem("testResults", JSON.stringify(updatedResults));
    localStorage.setItem("testDates", JSON.stringify(updatedDates));
    
    setActiveTest(null);
    
    toast({
      title: "Test Completed",
      description: `Your score: ${score}%. Results have been saved.`,
    });
    
    // If 3 or more tests are complete, suggest going to results
    const completedTests = Object.keys(updatedResults).length;
    
    if (completedTests >= 3) {
      setTimeout(() => {
        toast({
          title: `${completedTests} Tests Completed`,
          description: "You can view your results dashboard now or continue with more tests.",
        });
      }, 1500);
    }
  };
  
  const isTestCompleted = (testId: string) => {
    return testId in testResults;
  };

  const handleViewTests = () => {
    setActiveTab("tests");
  };

  return (
    <PageLayout>
      <div className="dyslexai-container">
        <PageHeader
          title="Cognitive Tests"
          description="Interactive assessments for phonological awareness, processing speed, and more"
          icon={<BrainCircuit className="h-10 w-10" />}
        />

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tests">Available Tests</TabsTrigger>
              <TabsTrigger value="science">The Science</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <TestOverview onViewTests={handleViewTests} />
            </TabsContent>
            
            <TabsContent value="tests">
              {activeTest === "phonological" ? (
                <PhonologicalTest
                  onComplete={(score) => handleTestComplete("phonological", score)}
                />
              ) : activeTest === "ran" ? (
                <RANTest
                  onComplete={(score) => handleTestComplete("ran", score)}
                />
              ) : activeTest === "workingMemory" ? (
                <WorkingMemoryTest
                  onComplete={(score) => handleTestComplete("workingMemory", score)}
                />
              ) : activeTest === "processingSpeed" ? (
                <ProcessingSpeedTest
                  onComplete={(score) => handleTestComplete("processingSpeed", score)}
                />
              ) : activeTest === "audioDiscrimination" ? (
                <AudioDiscriminationTest
                  onComplete={(score) => handleTestComplete("audioDiscrimination", score)}
                />
              ) : activeTest === "directionSense" ? (
                <DirectionSenseTest
                  onComplete={(score) => handleTestComplete("directionSense", score)}
                />
              ) : (
                <div className="space-y-6">
                  <div className="bg-dyslexai-blue-50 p-4 rounded-lg mb-4">
                    <h3 className="font-bold text-dyslexai-blue-700 mb-2">Assessment Battery</h3>
                    <p>
                      Complete the following assessments to get a comprehensive evaluation. 
                      Each test takes approximately 3-5 minutes to complete. You can take them 
                      in any order and return to continue later.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TestCard
                      title="Phonological Awareness"
                      description="Tests your ability to recognize and manipulate sounds in words"
                      isCompleted={isTestCompleted("phonological")}
                      onStart={() => handleStartTest("phonological")}
                      score={testResults.phonological}
                      date={testDates.phonological ? new Date(testDates.phonological).toLocaleDateString() : undefined}
                    />
                    
                    <TestCard
                      title="Rapid Automatized Naming"
                      description="Measures how quickly you can name familiar items"
                      isCompleted={isTestCompleted("ran")}
                      onStart={() => handleStartTest("ran")}
                      score={testResults.ran}
                      date={testDates.ran ? new Date(testDates.ran).toLocaleDateString() : undefined}
                    />
                    
                    <TestCard
                      title="Working Memory"
                      description="Assesses your ability to hold and manipulate information"
                      isCompleted={isTestCompleted("workingMemory")}
                      onStart={() => handleStartTest("workingMemory")}
                      score={testResults.workingMemory}
                      date={testDates.workingMemory ? new Date(testDates.workingMemory).toLocaleDateString() : undefined}
                    />
                    
                    <TestCard
                      title="Processing Speed"
                      description="Measures how quickly you can process visual information"
                      isCompleted={isTestCompleted("processingSpeed")}
                      onStart={() => handleStartTest("processingSpeed")}
                      score={testResults.processingSpeed}
                      date={testDates.processingSpeed ? new Date(testDates.processingSpeed).toLocaleDateString() : undefined}
                    />
                    
                    <TestCard
                      title="Audio Discrimination"
                      description="Tests your ability to distinguish between similar sounds"
                      isCompleted={isTestCompleted("audioDiscrimination")}
                      onStart={() => handleStartTest("audioDiscrimination")}
                      score={testResults.audioDiscrimination}
                      date={testDates.audioDiscrimination ? new Date(testDates.audioDiscrimination).toLocaleDateString() : undefined}
                    />
                    
                    <TestCard
                      title="Direction Sense"
                      description="Assesses your ability to process directional concepts"
                      isCompleted={isTestCompleted("directionSense")}
                      onStart={() => handleStartTest("directionSense")}
                      score={testResults.directionSense}
                      date={testDates.directionSense ? new Date(testDates.directionSense).toLocaleDateString() : undefined}
                    />
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="science">
              <TestScience />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

interface TestCardProps {
  title: string;
  description: string;
  isCompleted: boolean;
  onStart: () => void;
  score?: number;
  date?: string;
}

const TestCard = ({ title, description, isCompleted, onStart, score, date }: TestCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {isCompleted ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-600 font-medium">Completed</span>
              <span className="font-bold">{score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${score}%` }}
              ></div>
            </div>
            {date && <p className="text-xs text-gray-500">Completed on {date}</p>}
            <Button 
              className="w-full mt-4"
              onClick={onStart}
            >
              Retake Test
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full dyslexai-btn-primary"
            onClick={onStart}
          >
            Start Test
          </Button>
        )}
      </div>
    </div>
  );
};

export default CognitiveTests;
