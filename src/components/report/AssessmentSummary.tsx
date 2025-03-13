
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AssessmentSummaryProps {
  riskLevel: string;
  riskDescription: string;
  testResults: {
    phonological?: number;
    workingMemory?: number;
    processingSpeed?: number;
    ran?: number;
    handwriting?: number;
    audioDiscrimination?: number;
    directionSense?: number;
  };
  checklistDetails?: any;
  handwritingDetails?: any;
}

const AssessmentSummary = ({ 
  riskLevel, 
  riskDescription, 
  testResults, 
  checklistDetails, 
  handwritingDetails 
}: AssessmentSummaryProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle>Assessment Summary</CardTitle>
        <CardDescription>Overall risk level: <span className="font-bold">{riskLevel}</span></CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{riskDescription}</p>
        
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
            {checklistDetails && (
              <li>
                Symptom Checklist: {checklistDetails.score >= 70 
                  ? "Few reported dyslexia symptoms" 
                  : checklistDetails.score >= 50 
                  ? "Some reported dyslexia symptoms" 
                  : "Multiple reported dyslexia symptoms"}
              </li>
            )}
            {handwritingDetails && (
              <li>
                Handwriting Analysis: {handwritingDetails.overallScore >= 70 
                  ? "Few dyslexic patterns in writing" 
                  : handwritingDetails.overallScore >= 50 
                  ? "Some dyslexic patterns in writing" 
                  : "Significant dyslexic patterns in writing"}
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentSummary;
