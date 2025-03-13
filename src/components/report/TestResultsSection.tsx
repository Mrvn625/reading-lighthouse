
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TestResultsSectionProps {
  testResults: {
    phonological?: number;
    workingMemory?: number;
    processingSpeed?: number;
    ran?: number;
    handwriting?: number;
    audioDiscrimination?: number;
    directionSense?: number;
  };
}

const TestResultsSection = ({ testResults }: TestResultsSectionProps) => {
  return (
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
  );
};

export default TestResultsSection;
