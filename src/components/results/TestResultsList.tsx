
import { FC } from "react";
import ResultBar from "./ResultBar";

interface TestResultsListProps {
  testResults: {[key: string]: number};
  testDates: {[key: string]: string};
  handwritingResults: any;
  checklistResults: any;
}

const TestResultsList: FC<TestResultsListProps> = ({
  testResults,
  testDates,
  handwritingResults,
  checklistResults
}) => {
  return (
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
      
      {handwritingResults && (
        <ResultBar 
          title="Handwriting Analysis" 
          score={handwritingResults.overallScore}
          description={handwritingResults.overallScore >= 70 
            ? "Few dyslexia indicators in handwriting" 
            : "Shows dyslexia-related patterns in handwriting"}
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
        <ResultBar 
          title="Symptom Checklist" 
          score={checklistResults.score}
          description={checklistResults.score >= 70 
            ? "Few reported dyslexia symptoms" 
            : "Multiple reported dyslexia symptoms"}
          date={checklistResults.date}
        />
      )}
    </div>
  );
};

export default TestResultsList;
