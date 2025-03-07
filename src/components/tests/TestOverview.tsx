
import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { ArrowRight, Lightbulb } from "lucide-react";

type TestOverviewProps = {
  onViewTests: () => void;
};

const TestOverview = ({ onViewTests }: TestOverviewProps) => {
  return (
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
        onClick={onViewTests}
      >
        View Available Tests
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Section>
  );
};

export default TestOverview;
