
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/ui/page-header";
import Section from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, ArrowRight, PlayCircle, Clock, Lightbulb, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import PhonologicalTest from "@/components/tests/PhonologicalTest";

const CognitiveTests = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{[key: string]: number}>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleStartTest = (testId: string) => {
    setActiveTab("tests");
    setActiveTest(testId);
    
    toast({
      title: "Starting Test",
      description: `Please follow the instructions to complete the ${testId} test`,
    });
  };
  
  const handleTestComplete = (testId: string, score: number) => {
    setTestResults(prev => ({
      ...prev,
      [testId]: score
    }));
    
    setActiveTest(null);
    
    toast({
      title: "Test Completed",
      description: `Your score: ${score}%. Results have been saved.`,
    });
    
    // If all tests are complete, navigate to results
    const requiredTests = ["phonological", "ran", "workingMemory", "processingSpeed"];
    const completedTests = Object.keys(testResults);
    const allTestsComplete = requiredTests.every(test => 
      completedTests.includes(test) || test === testId
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
              <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-dyslexai-blue-700 mb-4">How Cognitive Tests Help</h2>
                    <p>
                      Cognitive assessments measure specific mental processes that are often affected in dyslexia. These interactive tests evaluate skills like phonological awareness, rapid naming, working memory, and processing speed.
                    </p>
                    <p>
                      By measuring performance across different cognitive domains, we can identify patterns that may indicate dyslexia or other learning differences.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                      alt="Person taking cognitive test"
                      className="rounded-lg shadow-md max-h-64 object-cover"
                    />
                  </div>
                </div>
                
                <div className="bg-dyslexai-blue-50 p-6 rounded-lg border border-dyslexai-blue-100 mb-8">
                  <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-4 flex items-center">
                    <Lightbulb className="h-6 w-6 mr-2 text-dyslexai-blue-500" />
                    Before You Begin
                  </h3>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>Find a quiet place without distractions</li>
                    <li>Allow approximately 15-20 minutes to complete all tests</li>
                    <li>Use headphones for tests with audio components</li>
                    <li>Take breaks between tests if needed</li>
                    <li>Answer as quickly and accurately as possible</li>
                  </ul>
                </div>
                
                <Button
                  className="dyslexai-btn-primary mx-auto block"
                  onClick={() => setActiveTab("tests")}
                >
                  View Available Tests
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Section>
            </TabsContent>
            
            <TabsContent value="tests">
              <Section title="Available Cognitive Tests">
                {activeTest === "phonological" ? (
                  <PhonologicalTest
                    onComplete={(score) => handleTestComplete("phonological", score)}
                  />
                ) : activeTest === "ran" ? (
                  <div className="text-center p-12 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Rapid Automatized Naming Test</h3>
                    <p className="mb-4">
                      This test is in demonstration mode. In a complete version, you would be shown a grid of 
                      familiar items (letters, numbers) and asked to name them as quickly as possible.
                    </p>
                    <Button 
                      className="dyslexai-btn-primary"
                      onClick={() => handleTestComplete("ran", Math.floor(Math.random() * 30) + 50)}
                    >
                      Simulate Test Completion
                    </Button>
                  </div>
                ) : activeTest === "workingMemory" ? (
                  <div className="text-center p-12 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Working Memory Test</h3>
                    <p className="mb-4">
                      This test is in demonstration mode. In a complete version, you would be shown sequences of 
                      numbers, letters, or patterns and asked to recall them in the correct order.
                    </p>
                    <Button 
                      className="dyslexai-btn-primary"
                      onClick={() => handleTestComplete("workingMemory", Math.floor(Math.random() * 30) + 50)}
                    >
                      Simulate Test Completion
                    </Button>
                  </div>
                ) : activeTest === "processingSpeed" ? (
                  <div className="text-center p-12 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Processing Speed Test</h3>
                    <p className="mb-4">
                      This test is in demonstration mode. In a complete version, you would be asked to rapidly identify 
                      specific visual stimuli among distractors or make quick decisions about visual information.
                    </p>
                    <Button 
                      className="dyslexai-btn-primary"
                      onClick={() => handleTestComplete("processingSpeed", Math.floor(Math.random() * 30) + 50)}
                    >
                      Simulate Test Completion
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="mb-6">
                      Each test evaluates different cognitive skills related to dyslexia. We recommend completing all tests for the most comprehensive assessment.
                    </p>
                    
                    <div className="space-y-6">
                      <TestCard
                        title="Phonological Awareness Test"
                        description="Evaluate your ability to identify and manipulate sounds in words"
                        duration="5-7 minutes"
                        skills={["Sound identification", "Rhyming ability", "Phoneme manipulation"]}
                        completed={isTestCompleted("phonological")}
                        onStart={() => handleStartTest("phonological")}
                      />
                      
                      <TestCard
                        title="Rapid Automatized Naming (RAN)"
                        description="Measure how quickly you can name familiar visual items"
                        duration="3-5 minutes"
                        skills={["Processing speed", "Retrieval fluency", "Automaticity"]}
                        completed={isTestCompleted("ran")}
                        onStart={() => handleStartTest("ran")}
                      />
                      
                      <TestCard
                        title="Working Memory Assessment"
                        description="Test your ability to hold and manipulate information in short-term memory"
                        duration="5-7 minutes"
                        skills={["Verbal memory", "Sequencing", "Information processing"]}
                        completed={isTestCompleted("workingMemory")}
                        onStart={() => handleStartTest("workingMemory")}
                      />
                      
                      <TestCard
                        title="Processing Speed Evaluation"
                        description="Assess how quickly you can process and respond to visual information"
                        duration="4-6 minutes"
                        skills={["Visual processing", "Decision speed", "Cognitive efficiency"]}
                        completed={isTestCompleted("processingSpeed")}
                        onStart={() => handleStartTest("processingSpeed")}
                      />
                    </div>
                    
                    <div className="mt-10 flex justify-center">
                      <Link to="/results">
                        <Button className="dyslexai-btn-primary">
                          Go to Results Dashboard
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </Section>
            </TabsContent>
            
            <TabsContent value="science">
              <Section title="The Science Behind Our Tests">
                <p>
                  Our cognitive tests are based on established research in cognitive psychology, neuroscience, and educational assessment. Here's how each test relates to dyslexia:
                </p>
                
                <div className="space-y-6 my-8">
                  <ScienceCard
                    title="Phonological Awareness"
                    description="Dyslexia is primarily characterized by deficits in phonological processing—the ability to identify and manipulate speech sounds. Research consistently shows that phonological awareness is one of the strongest predictors of reading ability."
                    research="Based on measures like the Comprehensive Test of Phonological Processing (CTOPP-2) and research by Stanovich, Wagner, and others."
                  />
                  
                  <ScienceCard
                    title="Rapid Automatized Naming (RAN)"
                    description="The speed at which individuals can name familiar items (letters, numbers, colors) is strongly correlated with reading fluency. The double-deficit hypothesis suggests that deficits in both phonological awareness and rapid naming contribute to the most severe reading difficulties."
                    research="Based on the work of Maryanne Wolf, the Rapid Automatized Naming Test, and longitudinal studies of reading development."
                  />
                  
                  <ScienceCard
                    title="Working Memory"
                    description="Working memory—the ability to hold and manipulate information in mind—plays a crucial role in reading. Readers must keep earlier parts of a text in mind while decoding new words and integrating meaning."
                    research="Based on Baddeley's model of working memory and research showing reduced verbal working memory capacity in many individuals with dyslexia."
                  />
                  
                  <ScienceCard
                    title="Processing Speed"
                    description="Many individuals with dyslexia show slower processing of visual-verbal information. This affects reading fluency and automatic word recognition, requiring more conscious effort for reading tasks."
                    research="Based on research using rapid visual processing tasks and studies of neural activation patterns during reading tasks."
                  />
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-3">Neuroimaging Evidence</h3>
                  <p className="mb-4">
                    Brain imaging studies have consistently shown differences in neural activation patterns during reading tasks in individuals with dyslexia:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Reduced activation in the left temporoparietal region during phonological processing</li>
                    <li>Different patterns of connectivity between language areas</li>
                    <li>Compensatory activation in other brain regions</li>
                  </ul>
                  <p className="mt-4">
                    Our tests target the cognitive processes associated with these neural networks to provide a comprehensive assessment of reading-related skills.
                  </p>
                </div>
              </Section>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

type TestCardProps = {
  title: string;
  description: string;
  duration: string;
  skills: string[];
  completed?: boolean;
  onStart: () => void;
};

const TestCard = ({ title, description, duration, skills, completed = false, onStart }: TestCardProps) => {
  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-dyslexai-blue-700 flex items-center">
          {title}
          {completed && (
            <CheckCircle2 className="ml-2 h-5 w-5 text-green-500" />
          )}
        </CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-gray-600 mb-4">
          <Clock className="h-4 w-4 mr-2" />
          <span>{duration}</span>
        </div>
        <div>
          <h4 className="font-medium mb-2">Skills Assessed:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-dyslexai-blue-400 mr-2"></div>
                <span className="text-sm">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full flex items-center justify-center ${
            completed ? "bg-green-500 hover:bg-green-600" : ""
          }`}
          onClick={onStart}
        >
          {completed ? (
            <>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Test Completed - Retake
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-5 w-5" />
              Start Test
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

type ScienceCardProps = {
  title: string;
  description: string;
  research: string;
};

const ScienceCard = ({ title, description, research }: ScienceCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-dyslexai-blue-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{description}</p>
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-600 italic">{research}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CognitiveTests;
