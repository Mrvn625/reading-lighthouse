
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Printer } from "lucide-react";
import html2pdf from "html2pdf.js";
import { useToast } from "@/components/ui/use-toast";

interface ReportProps {
  userData: {
    name: string;
    age?: number;
    date: string;
    email?: string;
    school?: string;
    grade?: string;
    testDate?: string;
  };
  testResults: {
    phonological?: number;
    workingMemory?: number;
    processingSpeed?: number;
    ran?: number;
    handwriting?: number;
    audioDiscrimination?: number;
    directionSense?: number;
  };
  recommendations: string[];
}

const DyslexiaReport = ({ userData, testResults, recommendations }: ReportProps) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const getDyslexiaRiskLevel = () => {
    const scores = Object.values(testResults).filter(score => score !== undefined) as number[];
    if (scores.length === 0) return "Unknown";
    
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    if (avgScore >= 80) return "Low";
    if (avgScore >= 60) return "Mild";
    if (avgScore >= 40) return "Moderate";
    return "High";
  };

  const handleDownloadPdf = () => {
    if (!reportRef.current) return;
    
    toast({
      title: "Generating PDF",
      description: "Your report is being generated...",
    });

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `dyslexia-report-${userData.name.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(reportRef.current).save().then(() => {
      toast({
        title: "PDF Downloaded",
        description: "Your report has been downloaded successfully",
      });
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const getRiskDescription = () => {
    const riskLevel = getDyslexiaRiskLevel();
    
    switch (riskLevel) {
      case "Low":
        return "Based on the assessment results, there are few indicators of dyslexia. The test scores show typical performance in most cognitive areas associated with reading and processing.";
      case "Mild":
        return "The assessment results show some indicators that might be associated with dyslexia. While most areas show typical performance, there are specific areas where additional support may be beneficial.";
      case "Moderate":
        return "There are several indicators of potential dyslexia in the assessment results. The pattern of strengths and weaknesses across cognitive areas is consistent with what is often seen in individuals with dyslexia.";
      case "High":
        return "The assessment results show strong indicators of dyslexia. The profile of scores across cognitive areas strongly suggests dyslexia-related processing challenges that may significantly impact reading and learning.";
      default:
        return "Not enough data is available to provide a comprehensive assessment.";
    }
  };

  return (
    <div>
      <div className="print:hidden flex justify-end space-x-2 mb-4">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button onClick={handleDownloadPdf}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
      
      <div ref={reportRef} className="p-6 max-w-4xl mx-auto bg-white print:p-0">
        <div className="text-center mb-6 border-b pb-4 print:pb-2">
          <h1 className="text-2xl font-bold text-dyslexai-blue-700">DyslexAI Assessment Report</h1>
          <p className="text-gray-500">Confidential Dyslexia Screening Result</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Name: <span className="font-medium">{userData.name}</span></p>
            {userData.age && <p className="text-gray-600">Age: <span className="font-medium">{userData.age} years</span></p>}
            {userData.school && <p className="text-gray-600">School: <span className="font-medium">{userData.school}</span></p>}
            {userData.grade && <p className="text-gray-600">Grade: <span className="font-medium">{userData.grade}</span></p>}
          </div>
          <div className="text-right">
            <p className="text-gray-600">Assessment Date: <span className="font-medium">{userData.testDate || userData.date}</span></p>
            <p className="text-gray-600">Report Created: <span className="font-medium">{userData.date}</span></p>
            <p className="text-gray-600">Report ID: <span className="font-medium">{Math.random().toString(36).substring(2, 10).toUpperCase()}</span></p>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle>Assessment Summary</CardTitle>
            <CardDescription>Overall risk level: <span className="font-bold">{getDyslexiaRiskLevel()}</span></CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{getRiskDescription()}</p>
            
            <div className="bg-dyslexai-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-dyslexai-blue-700 mb-2">Key Findings</h3>
              <ul className="list-disc pl-5 space-y-1">
                {testResults.phonological !== undefined && (
                  <li>
                    Phonological Awareness: {testResults.phonological >= 70 
                      ? "Strong abilities" 
                      : testResults.phonological >= 50 
                      ? "Some challenges" 
                      : "Significant difficulties"}
                  </li>
                )}
                {testResults.workingMemory !== undefined && (
                  <li>
                    Working Memory: {testResults.workingMemory >= 70 
                      ? "Strong capacity" 
                      : testResults.workingMemory >= 50 
                      ? "Some limitations" 
                      : "Significant difficulties"}
                  </li>
                )}
                {testResults.processingSpeed !== undefined && (
                  <li>
                    Processing Speed: {testResults.processingSpeed >= 70 
                      ? "Fast and efficient" 
                      : testResults.processingSpeed >= 50 
                      ? "Somewhat slower" 
                      : "Significantly slower"}
                  </li>
                )}
                {testResults.ran !== undefined && (
                  <li>
                    Rapid Naming: {testResults.ran >= 70 
                      ? "Strong naming speed" 
                      : testResults.ran >= 50 
                      ? "Some difficulties" 
                      : "Significant challenges"}
                  </li>
                )}
                {testResults.audioDiscrimination !== undefined && (
                  <li>
                    Audio Discrimination: {testResults.audioDiscrimination >= 70 
                      ? "Strong auditory processing" 
                      : testResults.audioDiscrimination >= 50 
                      ? "Some auditory challenges" 
                      : "Significant auditory processing difficulties"}
                  </li>
                )}
                {testResults.directionSense !== undefined && (
                  <li>
                    Direction Sense: {testResults.directionSense >= 70 
                      ? "Strong directional awareness" 
                      : testResults.directionSense >= 50 
                      ? "Some directional confusion" 
                      : "Significant directional difficulties"}
                  </li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle>Test Results</CardTitle>
            <CardDescription>Detailed scores from all completed assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.phonological !== undefined && (
                <div>
                  <h3 className="font-medium">Phonological Awareness</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div 
                      className="bg-dyslexai-blue-500 h-4 rounded-full" 
                      style={{ width: `${testResults.phonological}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>0%</span>
                    <span>{testResults.phonological}%</span>
                    <span>100%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {testResults.phonological >= 70 
                      ? "Strong phonological awareness skills"
                      : testResults.phonological >= 50
                      ? "Some challenges with phonological awareness"
                      : "Significant difficulties with phonological awareness, a key indicator of dyslexia"}
                  </p>
                </div>
              )}
              
              {testResults.workingMemory !== undefined && (
                <div>
                  <h3 className="font-medium">Working Memory</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div 
                      className="bg-dyslexai-blue-500 h-4 rounded-full" 
                      style={{ width: `${testResults.workingMemory}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>0%</span>
                    <span>{testResults.workingMemory}%</span>
                    <span>100%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {testResults.workingMemory >= 70 
                      ? "Strong working memory capacity"
                      : testResults.workingMemory >= 50
                      ? "Some challenges with working memory"
                      : "Significant difficulties with working memory, commonly seen in dyslexia"}
                  </p>
                </div>
              )}
              
              {testResults.processingSpeed !== undefined && (
                <div>
                  <h3 className="font-medium">Processing Speed</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div 
                      className="bg-dyslexai-blue-500 h-4 rounded-full" 
                      style={{ width: `${testResults.processingSpeed}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>0%</span>
                    <span>{testResults.processingSpeed}%</span>
                    <span>100%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {testResults.processingSpeed >= 70 
                      ? "Fast and efficient processing speed"
                      : testResults.processingSpeed >= 50
                      ? "Somewhat slower processing speed"
                      : "Significantly slower processing speed, often associated with dyslexia"}
                  </p>
                </div>
              )}
              
              {testResults.ran !== undefined && (
                <div>
                  <h3 className="font-medium">Rapid Automatized Naming (RAN)</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div 
                      className="bg-dyslexai-blue-500 h-4 rounded-full" 
                      style={{ width: `${testResults.ran}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>0%</span>
                    <span>{testResults.ran}%</span>
                    <span>100%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {testResults.ran >= 70 
                      ? "Strong naming speed and automaticity"
                      : testResults.ran >= 50
                      ? "Some challenges with naming speed"
                      : "Significant difficulties with naming speed, a common dyslexia marker"}
                  </p>
                </div>
              )}
              
              {testResults.handwriting !== undefined && (
                <div>
                  <h3 className="font-medium">Handwriting Analysis</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div 
                      className="bg-dyslexai-blue-500 h-4 rounded-full" 
                      style={{ width: `${testResults.handwriting}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>0%</span>
                    <span>{testResults.handwriting}%</span>
                    <span>100%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {testResults.handwriting >= 70 
                      ? "Few dyslexia indicators in handwriting"
                      : testResults.handwriting >= 50
                      ? "Some dyslexia-related patterns in handwriting"
                      : "Significant dyslexia-related patterns in handwriting"}
                  </p>
                </div>
              )}
              
              {testResults.audioDiscrimination !== undefined && (
                <div>
                  <h3 className="font-medium">Audio Discrimination</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div 
                      className="bg-dyslexai-blue-500 h-4 rounded-full" 
                      style={{ width: `${testResults.audioDiscrimination}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>0%</span>
                    <span>{testResults.audioDiscrimination}%</span>
                    <span>100%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {testResults.audioDiscrimination >= 70 
                      ? "Strong auditory discrimination abilities"
                      : testResults.audioDiscrimination >= 50
                      ? "Some challenges with auditory discrimination"
                      : "Significant difficulties with auditory discrimination, often seen in dyslexia"}
                  </p>
                </div>
              )}
              
              {testResults.directionSense !== undefined && (
                <div>
                  <h3 className="font-medium">Direction Sense</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div 
                      className="bg-dyslexai-blue-500 h-4 rounded-full" 
                      style={{ width: `${testResults.directionSense}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>0%</span>
                    <span>{testResults.directionSense}%</span>
                    <span>100%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {testResults.directionSense >= 70 
                      ? "Strong directional awareness"
                      : testResults.directionSense >= 50
                      ? "Some challenges with directional awareness"
                      : "Significant difficulties with directional awareness, often associated with dyslexia"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Next steps and suggested resources</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="text-gray-700">{recommendation}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <div className="text-sm text-gray-500 mt-10 border-t pt-4 print:mt-4 print:pt-2">
          <p>This report is generated by DyslexAI as a preliminary screening tool and is not a formal diagnosis. For a comprehensive evaluation, please consult with a qualified educational psychologist or specialist.</p>
          <p className="mt-1">© {new Date().getFullYear()} DyslexAI - All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default DyslexiaReport;
