
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/ui/section";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <PageLayout>
      <div className="bg-gradient-to-r from-dyslexai-blue-50 to-dyslexai-green-50 py-12 px-4 rounded-xl mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-dyslexai-blue-800 mb-6">DyslexAI</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Understanding, assessing, and supporting individuals with dyslexia through interactive technology
          </p>
        </div>
      </div>
      
      <Section>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-dyslexai-blue-700">Welcome to DyslexAI</h2>
          <p className="mb-8 text-lg">
            DyslexAI is a comprehensive platform designed to help assess and understand dyslexia 
            through interactive tests and educational content.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <div className="bg-white p-6 rounded-xl shadow-md border border-dyslexai-blue-100 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-dyslexai-blue-600">Learn About Dyslexia</h3>
              <p className="mb-4">Understand what dyslexia is, its signs, and how it affects learning.</p>
              <Link to="/what-is-dyslexia">
                <Button className="w-full bg-dyslexai-blue-500 hover:bg-dyslexai-blue-600">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-dyslexai-blue-100 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-dyslexai-blue-600">Take Assessment</h3>
              <p className="mb-4">Complete our comprehensive assessment to identify potential dyslexia traits.</p>
              <Link to="/how-tests-work">
                <Button className="w-full bg-dyslexai-green-500 hover:bg-dyslexai-green-600">
                  Start Assessment
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/handwriting-analysis">
              <Button variant="outline" className="border-dyslexai-blue-300 text-dyslexai-blue-700">
                Handwriting Analysis
              </Button>
            </Link>
            <Link to="/checklist">
              <Button variant="outline" className="border-dyslexai-blue-300 text-dyslexai-blue-700">
                Symptom Checklist
              </Button>
            </Link>
            <Link to="/cognitive-tests">
              <Button variant="outline" className="border-dyslexai-blue-300 text-dyslexai-blue-700">
                Cognitive Tests
              </Button>
            </Link>
            <Link to="/results">
              <Button variant="outline" className="border-dyslexai-blue-300 text-dyslexai-blue-700">
                View Results
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
