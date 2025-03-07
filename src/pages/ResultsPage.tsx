
import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/ui/page-header";
import Section from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Share2, Download, Printer, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const ResultsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Simulated test results data
  const testResults = {
    handwriting: {
      score: 68,
      letterFormation: 3,
      letterSpacing: 2,
      lineAlignment: 4,
      letterReversals: 3,
      completed: true,
      date: "2023-09-15"
    },
    checklist: {
      score: 72,
      reading: 75,
      writing: 80,
      language: 65,
      cognitive: 68,
      completed: true,
      date: "2023-09-16"
    },
    cognitive: {
      phonological: 65,
      ran: 58,
      workingMemory: 70,
      processingSpeed: 62,
      completed: false,
      date: null
    },
    overall: 70
  };

  return (
    <PageLayout>
      <div className="dyslexai-container">
        <PageHeader
          title="Assessment Results"
          description="A comprehensive overview of your dyslexia assessment results"
          icon={<FileText className="h-10 w-10" />}
        />

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="handwriting">Handwriting</TabsTrigger>
              <TabsTrigger value="checklist">Checklist</TabsTrigger>
              <TabsTrigger value="cognitive">Cognitive Tests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Section>
                <div className="bg-white rounded-xl shadow-md p-6 border border-dyslexai-blue-100 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-dyslexai-blue-700">Overall Assessment</h2>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Overall Dyslexia Indicator Score</span>
                      <span className="font-bold text-lg">{testResults.overall}%</span>
                    </div>
                    <Progress value={testResults.overall} className="h-3" />
                    
                    <div className="mt-4 p-4 bg-dyslexai-blue-50 rounded-lg">
                      <h4 className="font-bold text-dyslexai-blue-700 mb-2">What This Score Means</h4>
                      <p className="text-gray-700">
                        {testResults.overall >= 70
                          ? "Your results indicate several patterns commonly associated with dyslexia. While this is not a diagnosis, it suggests that further professional assessment may be beneficial."
                          : testResults.overall >= 40
                          ? "Your results show some patterns that could be associated with dyslexia. Consider exploring these areas further with additional assessments or with an educational professional."
                          : "Your results show few patterns typically associated with dyslexia. If you're still concerned, consider consulting with an educational professional."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-2">Assessment Summary</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <TestResultCard
                        title="Handwriting Analysis"
                        score={testResults.handwriting.score}
                        completed={testResults.handwriting.completed}
                        date={testResults.handwriting.date}
                        onClick={() => setActiveTab("handwriting")}
                      />
                      
                      <TestResultCard
                        title="Checklist Assessment"
                        score={testResults.checklist.score}
                        completed={testResults.checklist.completed}
                        date={testResults.checklist.date}
                        onClick={() => setActiveTab("checklist")}
                      />
                      
                      <TestResultCard
                        title="Cognitive Tests"
                        score={testResults.cognitive.completed ? testResults.cognitive.score : null}
                        completed={testResults.cognitive.completed}
                        date={testResults.cognitive.date}
                        onClick={() => setActiveTab("cognitive")}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6 border border-dyslexai-blue-100">
                  <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-4">Next Steps</h3>
                  
                  <div className="space-y-6">
                    <NextStepCard
                      title="Complete Remaining Assessments"
                      description="Finish any incomplete tests to get a more comprehensive evaluation"
                      actionText="View Incomplete Tests"
                      actionLink="/cognitive-tests"
                      highlight={!testResults.cognitive.completed}
                    />
                    
                    <NextStepCard
                      title="Consider Professional Evaluation"
                      description="Connect with educational psychologists or specialists for formal diagnosis"
                      actionText="Find Resources"
                      actionLink="/resources"
                    />
                    
                    <NextStepCard
                      title="Explore Support Strategies"
                      description="Discover evidence-based approaches to support learning with dyslexia"
                      actionText="View Strategies"
                      actionLink="/strategies"
                    />
                  </div>
                </div>
              </Section>
            </TabsContent>
            
            <TabsContent value="handwriting">
              <Section title="Handwriting Analysis Results">
                <div className="bg-white rounded-xl shadow-md p-6 border border-dyslexai-blue-100">
                  <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-4">Handwriting Assessment</h3>
                  
                  <div className="space-y-6">
                    <ResultItem
                      title="Letter Formation"
                      score={testResults.handwriting.letterFormation}
                      maxScore={5}
                      description="Some inconsistencies in how letters are formed, particularly with 'b', 'd', and 'p'."
                    />
                    
                    <ResultItem
                      title="Letter Spacing"
                      score={testResults.handwriting.letterSpacing}
                      maxScore={5}
                      description="Irregular spacing between letters and words is evident, which is common in dyslexia."
                    />
                    
                    <ResultItem
                      title="Line Alignment"
                      score={testResults.handwriting.lineAlignment}
                      maxScore={5}
                      description="Writing mostly follows the line guides with minor deviations."
                    />
                    
                    <ResultItem
                      title="Letter Reversals"
                      score={testResults.handwriting.letterReversals}
                      maxScore={5}
                      description="Some instances of letter reversals were detected, particularly with 'b' and 'd'."
                    />
                  </div>
                  
                  <div className="mt-8 p-4 bg-dyslexai-blue-50 rounded-lg">
                    <h4 className="font-bold text-dyslexai-blue-700 mb-2">Analysis Insights</h4>
                    <p className="text-gray-700">
                      Your handwriting shows some patterns that are sometimes associated with dyslexia, particularly in letter formation and spacing. These results suggest it may be worth exploring further assessment options.
                    </p>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" onClick={() => setActiveTab("overview")}>
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Back to Overview
                    </Button>
                  </div>
                </div>
              </Section>
            </TabsContent>
            
            <TabsContent value="checklist">
              <Section title="Checklist Assessment Results">
                <div className="bg-white rounded-xl shadow-md p-6 border border-dyslexai-blue-100">
                  <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-4">Checklist Assessment</h3>
                  
                  <div className="space-y-6">
                    <CategoryResult
                      title="Reading"
                      score={testResults.checklist.reading}
                      description="Your responses indicate moderate difficulties with reading fluency and comprehension."
                    />
                    
                    <CategoryResult
                      title="Writing"
                      score={testResults.checklist.writing}
                      description="Your responses suggest significant challenges with spelling and written expression."
                    />
                    
                    <CategoryResult
                      title="Language Processing"
                      score={testResults.checklist.language}
                      description="Your responses indicate some difficulties with phonological awareness and verbal processing."
                    />
                    
                    <CategoryResult
                      title="Cognitive Skills"
                      score={testResults.checklist.cognitive}
                      description="Your responses suggest moderate challenges with memory, organization, and processing speed."
                    />
                  </div>
                  
                  <div className="mt-8 p-4 bg-dyslexai-blue-50 rounded-lg">
                    <h4 className="font-bold text-dyslexai-blue-700 mb-2">Checklist Insights</h4>
                    <p className="text-gray-700">
                      Your checklist responses show patterns across multiple domains that are often associated with dyslexia. Writing and reading areas show the strongest indicators, which is a common profile for individuals with dyslexia.
                    </p>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" onClick={() => setActiveTab("overview")}>
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Back to Overview
                    </Button>
                  </div>
                </div>
              </Section>
            </TabsContent>
            
            <TabsContent value="cognitive">
              <Section title="Cognitive Tests Results">
                {!testResults.cognitive.completed ? (
                  <div className="bg-white rounded-xl shadow-md p-6 border border-dyslexai-blue-100 text-center">
                    <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-4">Cognitive Tests Not Completed</h3>
                    <p className="mb-6">Complete the cognitive tests to see your results here.</p>
                    <Link to="/cognitive-tests">
                      <Button className="dyslexai-btn-primary">
                        Go to Cognitive Tests
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-md p-6 border border-dyslexai-blue-100">
                    <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-4">Cognitive Assessment</h3>
                    
                    <div className="space-y-6">
                      <CategoryResult
                        title="Phonological Awareness"
                        score={testResults.cognitive.phonological}
                        description="Your performance indicates some difficulties with identifying and manipulating sounds in words."
                      />
                      
                      <CategoryResult
                        title="Rapid Automatized Naming"
                        score={testResults.cognitive.ran}
                        description="Your performance suggests moderate challenges with rapid naming of familiar items."
                      />
                      
                      <CategoryResult
                        title="Working Memory"
                        score={testResults.cognitive.workingMemory}
                        description="Your performance indicates mild difficulties with holding and manipulating information in short-term memory."
                      />
                      
                      <CategoryResult
                        title="Processing Speed"
                        score={testResults.cognitive.processingSpeed}
                        description="Your performance suggests moderate challenges with processing visual-verbal information quickly."
                      />
                    </div>
                    
                    <div className="mt-8 p-4 bg-dyslexai-blue-50 rounded-lg">
                      <h4 className="font-bold text-dyslexai-blue-700 mb-2">Cognitive Test Insights</h4>
                      <p className="text-gray-700">
                        Your cognitive test results show patterns typically associated with dyslexia, particularly in phonological awareness and rapid naming. These core deficits are consistent with the double-deficit hypothesis of dyslexia.
                      </p>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <Button variant="outline" onClick={() => setActiveTab("overview")}>
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back to Overview
                      </Button>
                    </div>
                  </div>
                )}
              </Section>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

type TestResultCardProps = {
  title: string;
  score: number | null;
  completed: boolean;
  date: string | null;
  onClick: () => void;
};

const TestResultCard = ({ title, score, completed, date, onClick }: TestResultCardProps) => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-4">
        <h4 className="font-bold mb-2">{title}</h4>
        
        {completed ? (
          <>
            <div className="flex items-center mb-1">
              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="h-2 rounded-full bg-dyslexai-blue-500"
                  style={{ width: `${score}%` }}
                ></div>
              </div>
              <span className="font-medium text-sm">{score}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Completed on {date}</p>
          </>
        ) : (
          <p className="text-sm text-amber-600 font-medium">Not completed</p>
        )}
      </CardContent>
    </Card>
  );
};

type NextStepCardProps = {
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
  highlight?: boolean;
};

const NextStepCard = ({ title, description, actionText, actionLink, highlight = false }: NextStepCardProps) => {
  return (
    <div className={`p-4 rounded-lg border ${highlight ? 'border-dyslexai-blue-300 bg-dyslexai-blue-50' : 'border-gray-200'}`}>
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <Link to={actionLink}>
        <Button variant="outline" size="sm">
          {actionText}
        </Button>
      </Link>
    </div>
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

type CategoryResultProps = {
  title: string;
  score: number;
  description: string;
};

const CategoryResult = ({ title, score, description }: CategoryResultProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold">{title}</h4>
        <span className="font-medium">{score}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="h-2 rounded-full bg-dyslexai-blue-500"
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default ResultsPage;
