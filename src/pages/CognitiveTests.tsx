
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/ui/page-header";
import { BrainCircuit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import PhonologicalTest from "@/components/tests/PhonologicalTest";
import RANTest from "@/components/tests/RANTest";
import WorkingMemoryTest from "@/components/tests/WorkingMemoryTest";
import ProcessingSpeedTest from "@/components/tests/ProcessingSpeedTest";
import TestOverview from "@/components/tests/TestOverview";
import TestScience from "@/components/tests/TestScience";
import AvailableTests from "@/components/tests/AvailableTests";

const CognitiveTests = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{[key: string]: number}>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Load any saved test results on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem("testResults");
    if (savedResults) {
      setTestResults(JSON.parse(savedResults));
    }
  }, []);
  
  const handleStartTest = (testId: string) => {
    setActiveTab("tests");
    setActiveTest(testId);
    
    toast({
      title: "Starting Test",
      description: `Please follow the instructions to complete the ${testId} test`,
    });
  };
  
  const handleTestComplete = (testId: string, score: number) => {
    const updatedResults = {
      ...testResults,
      [testId]: score
    };
    
    setTestResults(updatedResults);
    
    // Save results to localStorage
    localStorage.setItem("testResults", JSON.stringify(updatedResults));
    
    setActiveTest(null);
    
    toast({
      title: "Test Completed",
      description: `Your score: ${score}%. Results have been saved.`,
    });
    
    // If all tests are complete, navigate to results
    const requiredTests = ["phonological", "ran", "workingMemory", "processingSpeed"];
    const completedTests = Object.keys(updatedResults);
    const allTestsComplete = requiredTests.every(test => 
      completedTests.includes(test)
    );
    
    if (allTestsComplete) {
      setTimeout(() => {
        toast({
          title: "All Tests Completed",
          description: "Redirecting to your results dashboard",
        });
        navigate("/results");
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
              ) : (
                <AvailableTests 
                  isTestCompleted={isTestCompleted} 
                  onStartTest={handleStartTest} 
                />
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

export default CognitiveTests;
