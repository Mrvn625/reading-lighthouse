
import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, FileText, PieChart } from "lucide-react";
import DyslexiaReport from "@/components/report/DyslexiaReport";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, Legend } from 'recharts';

const ResultsPage = () => {
  const [testResults, setTestResults] = useState<{[key: string]: number}>({});
  const [userData, setUserData] = useState<{
    name: string, 
    age?: string, 
    email?: string,
    school?: string,
    grade?: string,
    isLoggedIn: boolean
  }>({
    name: "Guest User",
    isLoggedIn: false
  });
  const [testDates, setTestDates] = useState<{[key: string]: string}>({});
  const { toast } = useToast();
  
  useEffect(() => {
    // Load test results from localStorage
    const savedResults = localStorage.getItem("testResults");
    if (savedResults) {
      setTestResults(JSON.parse(savedResults));
    }
    
    // Load test dates from localStorage
    const savedDates = localStorage.getItem("testDates");
    if (savedDates) {
      setTestDates(JSON.parse(savedDates));
    }
    
    // Load user data if available
    const savedUserData = localStorage.getItem("user");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);
  
  const getRecommendations = () => {
    const avgScore = calculateAverageScore();
    
    const baseRecommendations = [
      "Continue to practice reading regularly with materials at an appropriate level.",
      "Use assistive technologies like text-to-speech when needed for longer reading assignments.",
      "Break complex tasks into smaller, manageable steps."
    ];
    
    if (avgScore < 60) {
      return [
        "Consider a comprehensive evaluation with an educational psychologist specializing in dyslexia.",
        "Explore structured literacy programs that use multisensory approaches.",
        "Discuss potential accommodations with teachers/schools.",
        ...baseRecommendations
      ];
    } else if (avgScore < 75) {
      return [
        "Consider a follow-up screening with a learning specialist to further assess potential challenges.",
        "Focus on strengthening phonological awareness through specific exercises.",
        "Practice memory-building activities to support learning.",
        ...baseRecommendations
      ];
    } else {
      return [
        "Continue monitoring reading progress through regular practice.",
        "Maintain a diverse reading diet to build vocabulary and comprehension.",
        "Consider strengths-based approaches to learning.",
        ...baseRecommendations
      ];
    }
  };
  
  const calculateAverageScore = () => {
    const scores = Object.values(testResults);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const generateChartData = () => {
    const data = [];
    
    if (testResults.phonological !== undefined) {
      data.push({
        name: "Phonological",
        score: testResults.phonological,
        threshold: 70
      });
    }
    
    if (testResults.workingMemory !== undefined) {
      data.push({
        name: "Working Memory",
        score: testResults.workingMemory,
        threshold: 70
      });
    }
    
    if (testResults.processingSpeed !== undefined) {
      data.push({
        name: "Processing",
        score: testResults.processingSpeed,
        threshold: 70
      });
    }
    
    if (testResults.ran !== undefined) {
      data.push({
        name: "RAN",
        score: testResults.ran,
        threshold: 70
      });
    }
    
    if (testResults.handwriting !== undefined) {
      data.push({
        name: "Handwriting",
        score: testResults.handwriting,
        threshold: 70
      });
    }
    
    if (testResults.audioDiscrimination !== undefined) {
      data.push({
        name: "Audio",
        score: testResults.audioDiscrimination,
        threshold: 70
      });
    }
    
    if (testResults.directionSense !== undefined) {
      data.push({
        name: "Direction",
        score: testResults.directionSense,
        threshold: 70
      });
    }
    
    return data;
  };

  // Calculate the most recent test date
  const getMostRecentTestDate = () => {
    if (Object.keys(testDates).length === 0) {
      return new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    // Convert date strings to Date objects
    const dates = Object.values(testDates).map(dateStr => new Date(dateStr));
    // Find the most recent date
    const mostRecent = new Date(Math.max(...dates.map(date => date.getTime())));
    
    return mostRecent.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <PageLayout>
      <div className="dyslexai-container">
        <PageHeader
          title="Assessment Results"
          description="Your personalized dyslexia screening results and recommendations"
          icon={<BarChart className="h-10 w-10" />}
        />
        
        <div className="max-w-4xl mx-auto">
          {Object.keys(testResults).length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-4">No Test Results Available</h3>
                <p className="mb-6">You haven't completed any assessments yet. Complete at least one test to see your results.</p>
                <Link to="/cognitive-tests">
                  <Button className="dyslexai-btn-primary">Take Tests Now</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-8">
                <TabsTrigger value="summary">
                  <BarChart className="mr-2 h-4 w-4" />
                  Results Summary
                </TabsTrigger>
                <TabsTrigger value="charts">
                  <LineChart className="mr-2 h-4 w-4" />
                  Charts & Analysis
                </TabsTrigger>
                <TabsTrigger value="report">
                  <FileText className="mr-2 h-4 w-4" />
                  Full Report
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary">
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-2">Your Results</h3>
                      <p className="text-gray-600 mb-4">
                        Here's a summary of your performance across all completed assessments.
                      </p>
                      
                      <div className="bg-dyslexai-blue-50 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold text-dyslexai-blue-700 mb-2">Overall Score</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-6 mr-4">
                            <div 
                              className="bg-dyslexai-blue-500 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium" 
                              style={{ width: `${calculateAverageScore()}%` }}
                            >
                              {calculateAverageScore()}%
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-2">
                          {calculateAverageScore() >= 80 ? 
                            "Your overall performance shows few indicators associated with dyslexia." :
                            calculateAverageScore() >= 60 ?
                            "Your overall performance shows some patterns that may be associated with dyslexia." :
                            "Your overall performance shows several patterns commonly associated with dyslexia."
                          }
                        </p>
                      </div>
                      
                      <div className="space-y-6">
                        {testResults.phonological !== undefined && (
                          <ResultBar 
                            title="Phonological Awareness" 
                            score={testResults.phonological}
                            description={testResults.phonological >= 70 
                              ? "Strong phonological skills" 
                              : "Shows challenges with phonological processing"}
                            date={testDates.phonological}
                          />
                        )}
                        
                        {testResults.workingMemory !== undefined && (
                          <ResultBar 
                            title="Working Memory" 
                            score={testResults.workingMemory}
                            description={testResults.workingMemory >= 70 
                              ? "Good working memory capacity" 
                              : "Shows challenges with working memory"}
                            date={testDates.workingMemory}
                          />
                        )}
                        
                        {testResults.processingSpeed !== undefined && (
                          <ResultBar 
                            title="Processing Speed" 
                            score={testResults.processingSpeed}
                            description={testResults.processingSpeed >= 70 
                              ? "Fast processing speed" 
                              : "Shows slower processing speed"}
                            date={testDates.processingSpeed}
                          />
                        )}
                        
                        {testResults.ran !== undefined && (
                          <ResultBar 
                            title="Rapid Naming (RAN)" 
                            score={testResults.ran}
                            description={testResults.ran >= 70 
                              ? "Quick naming speed" 
                              : "Shows challenges with naming speed"}
                            date={testDates.ran}
                          />
                        )}
                        
                        {testResults.handwriting !== undefined && (
                          <ResultBar 
                            title="Handwriting Analysis" 
                            score={testResults.handwriting}
                            description={testResults.handwriting >= 70 
                              ? "Few dyslexia indicators in handwriting" 
                              : "Shows dyslexia-related patterns in handwriting"}
                            date={testDates.handwriting}
                          />
                        )}
                        
                        {testResults.audioDiscrimination !== undefined && (
                          <ResultBar 
                            title="Audio Discrimination" 
                            score={testResults.audioDiscrimination}
                            description={testResults.audioDiscrimination >= 70 
                              ? "Strong auditory processing" 
                              : "Shows challenges with auditory processing"}
                            date={testDates.audioDiscrimination}
                          />
                        )}
                        
                        {testResults.directionSense !== undefined && (
                          <ResultBar 
                            title="Direction Sense" 
                            score={testResults.directionSense}
                            description={testResults.directionSense >= 70 
                              ? "Strong directional awareness" 
                              : "Shows directional confusion"}
                            date={testDates.directionSense}
                          />
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-2">Next Steps</h3>
                      <p className="text-gray-600 mb-4">Based on your results, here are some recommended next steps:</p>
                      
                      <ul className="list-disc pl-5 space-y-2">
                        {getRecommendations().map((recommendation, index) => (
                          <li key={index} className="text-gray-700">{recommendation}</li>
                        ))}
                      </ul>
                      
                      <div className="mt-6 flex justify-center">
                        <Button className="dyslexai-btn-primary" onClick={() => toast({
                          title: "Resources Available",
                          description: "Check your full report for detailed recommendations",
                        })}>
                          View Full Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="charts">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-4">Performance Analysis</h3>
                    
                    <div className="mb-8">
                      <h4 className="font-semibold text-dyslexai-blue-700 mb-2">Cognitive Profile</h4>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={generateChartData()}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="score" fill="#3b82f6" name="Your Score" />
                            <Bar dataKey="threshold" fill="#94a3b8" name="Threshold" />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        This chart compares your performance across different cognitive areas assessed. Scores above the threshold indicate stronger performance in those areas.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-dyslexai-blue-700 mb-2">Strengths and Challenges</h4>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart
                            data={generateChartData()}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="score" 
                              stroke="#3b82f6" 
                              activeDot={{ r: 8 }} 
                              name="Your Score"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="threshold" 
                              stroke="#ef4444" 
                              strokeDasharray="5 5" 
                              name="Threshold"
                            />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        This line chart highlights the pattern of your strengths and challenges across cognitive domains related to dyslexia.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="report">
                <DyslexiaReport 
                  userData={{
                    name: userData.name,
                    age: userData.age ? parseInt(userData.age) : undefined,
                    school: userData.school,
                    grade: userData.grade,
                    email: userData.email,
                    testDate: getMostRecentTestDate(),
                    date: new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })
                  }}
                  testResults={testResults}
                  recommendations={getRecommendations()}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

interface ResultBarProps {
  title: string;
  score: number;
  description: string;
  date?: string;
}

const ResultBar = ({ title, score, description, date }: ResultBarProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div>
          <h4 className="font-medium">{title}</h4>
          {date && <span className="text-xs text-gray-500">Completed: {new Date(date).toLocaleDateString()}</span>}
        </div>
        <span className="font-bold">{score}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div 
          className="bg-dyslexai-blue-500 h-4 rounded-full" 
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
};

export default ResultsPage;
