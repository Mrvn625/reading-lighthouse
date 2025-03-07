
import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TestCard from "./TestCard";

type AvailableTestsProps = {
  isTestCompleted: (testId: string) => boolean;
  onStartTest: (testId: string) => void;
};

const AvailableTests = ({ isTestCompleted, onStartTest }: AvailableTestsProps) => {
  return (
    <Section title="Available Cognitive Tests">
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
          onStart={() => onStartTest("phonological")}
        />
        
        <TestCard
          title="Rapid Automatized Naming (RAN)"
          description="Measure how quickly you can name familiar visual items"
          duration="3-5 minutes"
          skills={["Processing speed", "Retrieval fluency", "Automaticity"]}
          completed={isTestCompleted("ran")}
          onStart={() => onStartTest("ran")}
        />
        
        <TestCard
          title="Working Memory Assessment"
          description="Test your ability to hold and manipulate information in short-term memory"
          duration="5-7 minutes"
          skills={["Verbal memory", "Sequencing", "Information processing"]}
          completed={isTestCompleted("workingMemory")}
          onStart={() => onStartTest("workingMemory")}
        />
        
        <TestCard
          title="Processing Speed Evaluation"
          description="Assess how quickly you can process and respond to visual information"
          duration="4-6 minutes"
          skills={["Visual processing", "Decision speed", "Cognitive efficiency"]}
          completed={isTestCompleted("processingSpeed")}
          onStart={() => onStartTest("processingSpeed")}
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
    </Section>
  );
};

export default AvailableTests;
