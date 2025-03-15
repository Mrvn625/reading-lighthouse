
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Brain, FileText, Info, Book, ArrowRight } from "lucide-react";

const HomePage = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dyslexai-blue-800 mb-4">
            Dyslexia Screening App
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A comprehensive tool to help identify potential dyslexia indicators through multiple assessment methods
          </p>
          
          <div className="mb-12">
            <Link to="/profile">
              <Button className="dyslexai-btn-primary text-lg py-6 px-8">
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <FeatureCard 
              icon={<Brain className="h-10 w-10 text-purple-500" />}
              title="Cognitive Tests" 
              description="Interactive assessments that measure phonological awareness, working memory, processing speed, and more"
              link="/how-tests-work"
              linkText="Learn How Tests Work"
            />
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-dyslexai-blue-500" />}
              title="Handwriting Analysis" 
              description="Upload a handwriting sample to analyze patterns that may be associated with dyslexia"
              link="/handwriting"
              linkText="Try Handwriting Analysis"
            />
            <FeatureCard 
              icon={<Book className="h-10 w-10 text-green-500" />}
              title="Personalized Report" 
              description="Get a detailed report with recommendations based on your results across all assessments"
              link="/what-is-dyslexia"
              linkText="About Dyslexia"
            />
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 text-left">
            <div className="flex items-start">
              <Info className="h-6 w-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Important Note</h3>
                <p className="text-gray-700 mb-2">
                  This app is designed as a screening tool only and is not a substitute for a professional evaluation or diagnosis. The results should be used as a starting point for understanding potential learning differences.
                </p>
                <p className="text-gray-700">
                  If you have concerns about dyslexia or other learning differences, we recommend consulting with an educational psychologist, learning specialist, or other qualified professional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const FeatureCard = ({ icon, title, description, link, linkText }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex flex-col">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <Link to={link} className="text-dyslexai-blue-600 hover:text-dyslexai-blue-700 font-medium flex items-center justify-center">
        {linkText}
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};

export default HomePage;
