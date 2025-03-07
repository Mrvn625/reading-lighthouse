
import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/ui/page-header";
import Section from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";
import { FileText, Percent, Calendar, BarChart2, PenTool, BrainCircuit, CheckSquare, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// Mock data for demonstration
const mockUserData = {
  firstName: "Alex",
  lastName: "Morgan",
  age: 12,
  grade: "6th Grade",
  completedAssessments: [
    { type: "Handwriting Analysis", date: new Date(2024, 2, 15), result: 68 },
    { type: "Symptom Checklist", date: new Date(2024, 2, 16), result: 75 },
    { type: "Phonological Awareness", date: new Date(2024, 2, 17), result: 62 },
    { type: "RAN Test", date: new Date(2024, 2, 17), result: 58 },
    { type: "Working Memory", date: new Date(2024, 2, 18), result: 70 },
    { type: "Processing Speed", date: new Date(2024, 2, 18), result: 65 },
  ]
};

// Tests results storage - in a real app, this would come from backend/localStorage
const mockTestResults = {
  handwriting: {
    overallScore: 68,
    letterFormation: { score: 3, description: "Inconsistent letter formation with occasional reversals" },
    letterSpacing: { score: 4, description: "Generally good spacing between letters with minor inconsistencies" },
    lineAlignment: { score: 3, description: "Some difficulty maintaining alignment with the line" },
    letterReversals: { score: 2, description: "Several instances of reversed letters (b/d, p/q)" },
    completed: true,
    date: new Date(2024, 2, 15)
  },
  checklist: {
    total: 75,
    reading: 80,
    writing: 70,
    speaking: 65,
    organization: 85,
    completed: true,
    date: new Date(2024, 2, 16)
  },
  cognitive: {
    phonological: 62,
    ran: 58,
    workingMemory: 70,
    processingSpeed: 65,
    completed: true,
    date: new Date(2024, 2, 18)
  },
  summary: {
    overallRisk: "Moderate",
    strengths: ["Working memory", "Organization skills", "Verbal comprehension"],
    challenges: ["Phonological awareness", "Processing speed", "Letter reversals"],
    recommendations: [
      "Reading interventions focusing on phonological awareness",
      "Regular handwriting practice with specialized materials",
      "Accommodations such as extended time for reading tasks",
      "Consider formal assessment by educational psychologist",
    ]
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ResultsPage = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const { toast } = useToast();

  // In a real app, we would fetch this data from an API or local storage
  const userData = mockUserData;
  const testResults = mockTestResults;

  const handleDownloadReport = () => {
    // In a real app, this would generate a PDF
    toast({
      title: "Report Downloaded",
      description: "Your assessment report has been downloaded as a PDF",
    });
  };

  const calculateCognitiveAverage = () => {
    const { phonological, ran, workingMemory, processingSpeed } = testResults.cognitive;
    return Math.round((phonological + ran + workingMemory + processingSpeed) / 4);
  };

  // Data for charts
  const pieData = [
    { name: "Handwriting", value: testResults.handwriting.overallScore },
    { name: "Checklist", value: testResults.checklist.total },
    { name: "Cognitive", value: calculateCognitiveAverage() }
  ];

  const barData = [
    { name: "Phonological", score: testResults.cognitive.phonological },
    { name: "RAN", score: testResults.cognitive.ran },
    { name: "Working Memory", score: testResults.cognitive.workingMemory },
    { name: "Processing Speed", score: testResults.cognitive.processingSpeed }
  ];

  return (
    <PageLayout>
      <div className="dyslexai-container">
        <PageHeader
          title="Assessment Results"
          description="Comprehensive overview of your dyslexia assessment results"
          icon={<Percent className="h-10 w-10" />}
        />

        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-dyslexai-blue-700">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-gray-600">
                  {userData.age} years old | {userData.grade}
                </p>
              </div>
              <Button onClick={handleDownloadReport} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Full Report
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 mb-2">
              {userData.completedAssessments.map((assessment, index) => (
                <div key={index} className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-dyslexai-blue-50 text-dyslexai-blue-600">
                  {assessment.type}
                  <span className="text-xs text-gray-500">
                    ({assessment.date.toLocaleDateString()})
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="summary" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Summary
              </TabsTrigger>
              <TabsTrigger value="handwriting" className="flex items-center gap-2">
                <PenTool className="h-4 w-4" />
                Handwriting
              </TabsTrigger>
              <TabsTrigger value="checklist" className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Checklist
              </TabsTrigger>
              <TabsTrigger value="cognitive" className="flex items-center gap-2">
                <BrainCircuit className="h-4 w-4" />
                Cognitive Tests
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <Section title="Assessment Summary">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-dyslexai-blue-700">Overall Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-dyslexai-blue-700">Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Overall Risk Level:</span>
                          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">
                            {testResults.summary.overallRisk}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Based on combined results from all assessments, there are indicators of moderate dyslexia risk.
                          We recommend further evaluation by an educational specialist.
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Strengths:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {testResults.summary.strengths.map((strength, index) => (
                            <li key={index} className="text-gray-700">{strength}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Challenges:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {testResults.summary.challenges.map((challenge, index) => (
                            <li key={index} className="text-gray-700">{challenge}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-dyslexai-blue-700">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {testResults.summary.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-dyslexai-blue-100 text-dyslexai-blue-700 rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{recommendation}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Section>
            </TabsContent>

            <TabsContent value="handwriting">
              <Section title="Handwriting Analysis Results">
                <div className="bg-white rounded-xl shadow-md p-6 border border-dyslexai-blue-100">
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-2">Handwriting Assessment</h3>
                      <p className="text-gray-600">
                        Completed on {testResults.handwriting.date.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <div className="bg-dyslexai-blue-500 text-white rounded-full h-16 w-16 flex items-center justify-center mr-4">
                        <span className="text-xl font-bold">{testResults.handwriting.overallScore}%</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Overall Score</span>
                        <div className="font-medium">
                          {testResults.handwriting.overallScore >= 75 ? 
                            "Low Risk" :
                            testResults.handwriting.overallScore >= 50 ?
                            "Moderate Risk" :
                            "High Risk"
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <ResultItem
                      title="Letter Formation"
                      score={testResults.handwriting.letterFormation.score}
                      maxScore={5}
                      description={testResults.handwriting.letterFormation.description}
                    />
                    
                    <ResultItem
                      title="Letter Spacing"
                      score={testResults.handwriting.letterSpacing.score}
                      maxScore={5}
                      description={testResults.handwriting.letterSpacing.description}
                    />
                    
                    <ResultItem
                      title="Line Alignment"
                      score={testResults.handwriting.lineAlignment.score}
                      maxScore={5}
                      description={testResults.handwriting.lineAlignment.description}
                    />
                    
                    <ResultItem
                      title="Letter Reversals"
                      score={testResults.handwriting.letterReversals.score}
                      maxScore={5}
                      description={testResults.handwriting.letterReversals.description}
                    />
                  </div>
                  
                  <div className="mt-8 p-4 bg-dyslexai-blue-50 rounded-lg">
                    <h4 className="font-bold text-dyslexai-blue-700 mb-2">Analysis</h4>
                    <p className="text-gray-700">
                      {testResults.handwriting.overallScore >= 75 ? 
                        "Your handwriting shows few patterns associated with dyslexia. If you're still concerned, continue with our other assessments to gather more information." :
                        testResults.handwriting.overallScore >= 50 ?
                        "Your handwriting shows some patterns that are sometimes associated with dyslexia, particularly in letter formation and spacing. These results suggest it may be worth exploring further assessment options." :
                        "Your handwriting shows several patterns strongly associated with dyslexia, including letter reversals and inconsistent spacing. We recommend completing our other assessments and considering professional evaluation."
                      }
                    </p>
                  </div>
                </div>
              </Section>
            </TabsContent>

            <TabsContent value="checklist">
              <Section title="Symptom Checklist Results">
                <div className="bg-white rounded-xl shadow-md p-6 border border-dyslexai-blue-100">
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-2">Symptom Checklist Assessment</h3>
                      <p className="text-gray-600">
                        Completed on {testResults.checklist.date.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <div className="bg-dyslexai-blue-500 text-white rounded-full h-16 w-16 flex items-center justify-center mr-4">
                        <span className="text-xl font-bold">{testResults.checklist.total}%</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Overall Score</span>
                        <div className="font-medium">
                          {testResults.checklist.total >= 75 ? 
                            "Low Risk" :
                            testResults.checklist.total >= 50 ?
                            "Moderate Risk" :
                            "High Risk"
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="font-medium mb-4">Category Breakdown</h4>
                    <div className="space-y-4">
                      <ChecklistCategory name="Reading Skills" score={testResults.checklist.reading} />
                      <ChecklistCategory name="Writing Skills" score={testResults.checklist.writing} />
                      <ChecklistCategory name="Speaking Skills" score={testResults.checklist.speaking} />
                      <ChecklistCategory name="Organization Skills" score={testResults.checklist.organization} />
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-dyslexai-blue-50 rounded-lg">
                    <h4 className="font-bold text-dyslexai-blue-700 mb-2">Analysis</h4>
                    <p className="text-gray-700">
                      Based on your checklist responses, you show moderate indicators of dyslexia particularly in the 
                      areas of reading and writing. Your organization skills are a relative strength. These results, 
                      combined with other assessments, can help determine if further professional evaluation is recommended.
                    </p>
                  </div>
                </div>
              </Section>
            </TabsContent>

            <TabsContent value="cognitive">
              <Section title="Cognitive Tests Results">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-dyslexai-blue-700">Cognitive Skills Profile</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-72">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                              <XAxis dataKey="name" />
                              <YAxis domain={[0, 100]} />
                              <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                              <Legend />
                              <Bar dataKey="score" fill="#1E70F5" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-dyslexai-blue-700">Test Completion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <TestResult
                          name="Phonological Awareness"
                          score={testResults.cognitive.phonological}
                          interpretation={testResults.cognitive.phonological < 65 ? "Concern" : "Typical"}
                        />
                        <Separator />
                        <TestResult
                          name="Rapid Naming (RAN)"
                          score={testResults.cognitive.ran}
                          interpretation={testResults.cognitive.ran < 65 ? "Concern" : "Typical"}
                        />
                        <Separator />
                        <TestResult
                          name="Working Memory"
                          score={testResults.cognitive.workingMemory}
                          interpretation={testResults.cognitive.workingMemory < 65 ? "Concern" : "Typical"}
                        />
                        <Separator />
                        <TestResult
                          name="Processing Speed"
                          score={testResults.cognitive.processingSpeed}
                          interpretation={testResults.cognitive.processingSpeed < 65 ? "Concern" : "Typical"}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-dyslexai-blue-700">Cognitive Assessment Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Your cognitive assessment results show strengths in working memory and relative weaknesses in 
                      phonological awareness and rapid automatized naming (RAN), which are key cognitive skills 
                      associated with reading development.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2 text-dyslexai-blue-700">Phonological Awareness ({testResults.cognitive.phonological}%)</h4>
                        <p className="text-sm text-gray-600">
                          Your score indicates some difficulty with identifying and manipulating sounds in words, 
                          which is a common challenge for individuals with dyslexia. Specific exercises targeting 
                          phonemic awareness may be beneficial.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 text-dyslexai-blue-700">Rapid Naming ({testResults.cognitive.ran}%)</h4>
                        <p className="text-sm text-gray-600">
                          Your score suggests challenges with quickly naming familiar visual items, which correlates 
                          with reading fluency. This is consistent with the "double-deficit hypothesis" often seen 
                          in dyslexia.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 text-dyslexai-blue-700">Working Memory ({testResults.cognitive.workingMemory}%)</h4>
                        <p className="text-sm text-gray-600">
                          Your working memory score is relatively strong, indicating good ability to hold and manipulate 
                          information. This is a cognitive strength that can be leveraged in learning strategies.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 text-dyslexai-blue-700">Processing Speed ({testResults.cognitive.processingSpeed}%)</h4>
                        <p className="text-sm text-gray-600">
                          Your processing speed shows moderate efficiency. While not in the concerning range, some 
                          accommodations like extended time might be beneficial for complex reading tasks.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Section>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

type ResultItemProps = {
  title: string;
  score: number;
  maxScore: number;
  description: string;
};

const ResultItem = ({ title, score, maxScore, description }: ResultItemProps) => {
  const dots = [];
  for (let i = 1; i <= maxScore; i++) {
    dots.push(
      <div
        key={i}
        className={`w-4 h-4 rounded-full ${
          i <= score ? "bg-dyslexai-blue-500" : "bg-gray-200"
        }`}
      ></div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold">{title}</h4>
        <div className="flex space-x-1">{dots}</div>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

type ChecklistCategoryProps = {
  name: string;
  score: number;
};

const ChecklistCategory = ({ name, score }: ChecklistCategoryProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{name}</span>
        <span>{score}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-dyslexai-blue-500 h-2.5 rounded-full" 
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

type TestResultProps = {
  name: string;
  score: number;
  interpretation: "Typical" | "Concern";
};

const TestResult = ({ name, score, interpretation }: TestResultProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">{name}</span>
        <span className={`px-2 py-0.5 rounded text-xs font-medium 
          ${interpretation === "Typical" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
          {interpretation}
        </span>
      </div>
      <div className="flex items-center">
        <span className="mr-2 font-medium">{score}%</span>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${interpretation === "Typical" ? "bg-green-500" : "bg-amber-500"}`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
