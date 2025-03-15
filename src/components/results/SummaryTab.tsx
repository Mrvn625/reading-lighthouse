
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import ResultBar from "./ResultBar";

interface SummaryTabProps {
  testResults: {[key: string]: number};
  testDates: {[key: string]: string};
  handwritingResults: any;
  checklistResults: any;
  calculateAverageScore: () => number;
  getRecommendations: () => string[];
}

const SummaryTab = ({ 
  testResults, 
  testDates, 
  handwritingResults, 
  checklistResults,
  calculateAverageScore,
  getRecommendations
}: SummaryTabProps) => {
  const { toast } = useToast();

  // Format the checklist age group for display
  const formatAgeGroup = (ageGroup?: string) => {
    if (!ageGroup) return "Unknown";
    
    switch(ageGroup) {
      case "preschool": return "Preschool (Ages 3-5)";
      case "school_age": return "School Age (Ages 6-17)";
      case "adult": return "Adult (Ages 18+)";
      default: return ageGroup;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-2">Your Results</h3>
          <p className="text-gray-600 mb-4 text-left">
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
            
            <p className="text-sm text-gray-600 mt-2 text-left">
              {calculateAverageScore() >= 80 ? 
                "Your overall performance shows few indicators associated with dyslexia." :
                calculateAverageScore() >= 60 ?
                "Your overall performance shows some patterns that may be associated with dyslexia." :
                "Your overall performance shows several patterns commonly associated with dyslexia."
              }
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Test results */}
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
            
            {handwritingResults && (
              <ResultBar 
                title="Handwriting Analysis" 
                score={handwritingResults.overallScore}
                description={handwritingResults.overallScore >= 70 
                  ? "Text analysis shows few dyslexia indicators" 
                  : "Text analysis shows dyslexia-related patterns"}
                date={handwritingResults.date}
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

            {checklistResults && (
              <div className="p-4 bg-dyslexai-blue-50 rounded-lg">
                <ResultBar 
                  title={`Symptom Checklist (${formatAgeGroup(checklistResults.ageGroup)})`}
                  score={checklistResults.score}
                  description={checklistResults.score >= 70 
                    ? "Multiple reported dyslexia symptoms" 
                    : checklistResults.score >= 40
                    ? "Some reported dyslexia symptoms"
                    : "Few reported dyslexia symptoms"}
                  date={checklistResults.date}
                />
                
                {checklistResults.categoryScores && (
                  <div className="mt-4 pl-4 border-l-2 border-dyslexai-blue-200">
                    <h5 className="text-sm font-medium text-dyslexai-blue-700 mb-2">Category Breakdown:</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      {Object.entries(checklistResults.categoryScores)
                        .filter(([key]) => key !== "overall")
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">
                              {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:
                            </span>
                            <span className="text-xs font-medium">
                              {typeof value === 'number' ? `${value}%` : String(value)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-2">Next Steps</h3>
          <p className="text-gray-600 mb-4 text-left">Based on your results, here are some recommended next steps:</p>
          
          <ul className="list-disc pl-5 space-y-2 text-left">
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
  );
};

export default SummaryTab;
