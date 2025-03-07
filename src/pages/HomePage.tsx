
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BrainCircuit, CheckSquare, ArrowRight, FileText, PenTool, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <PageLayout>
      <div className="dyslexai-container">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-dyslexai-blue-800 mb-4">
              Understand Dyslexia Better
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Learn about dyslexia and assess potential signs with our interactive tests and educational resources
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/what-is-dyslexia">
                <Button className="dyslexai-btn-primary">
                  Learn About Dyslexia
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/how-tests-work">
                <Button className="dyslexai-btn-outline">
                  How Our Tests Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="Dyslexia Assessment"
              className="rounded-lg shadow-lg max-w-full h-auto max-h-80 object-cover"
            />
          </div>
        </div>

        {/* Features Section */}
        <Section title="What We Offer">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-dyslexai-blue-500" />}
              title="Educational Content"
              description="Learn about dyslexia, its signs, and impact on learning and daily life."
            />
            <FeatureCard
              icon={<BrainCircuit className="h-8 w-8 text-dyslexai-green-500" />}
              title="Interactive Tests"
              description="Take our science-based assessments to identify potential signs of dyslexia."
            />
            <FeatureCard
              icon={<CheckSquare className="h-8 w-8 text-dyslexai-blue-500" />}
              title="Personalized Results"
              description="Get insights based on your assessment performance and next steps."
            />
          </div>
        </Section>

        {/* Tests Overview Section */}
        <Section title="Our Assessment Tools">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestCard
              title="Checklist Analysis"
              icon={<CheckSquare className="h-6 w-6 text-dyslexai-blue-500" />}
              description="Answer questions about behavioral and learning patterns associated with dyslexia."
              link="/checklist"
            />
            <TestCard
              title="Handwriting Analysis"
              icon={<PenTool className="h-6 w-6 text-dyslexai-green-500" />}
              description="Upload or create a handwriting sample for pattern analysis."
              link="/handwriting-analysis"
            />
            <TestCard
              title="Cognitive Tests"
              icon={<BrainCircuit className="h-6 w-6 text-dyslexai-blue-500" />}
              description="Interactive assessments for phonological awareness, processing speed, and more."
              link="/cognitive-tests"
            />
            <TestCard
              title="What is Dyslexia"
              icon={<BookOpen className="h-6 w-6 text-dyslexai-green-500" />}
              description="Learn about dyslexia, its causes, and how it affects learning and daily life."
              link="/what-is-dyslexia"
            />
            <TestCard
              title="How Tests Work"
              icon={<FileText className="h-6 w-6 text-dyslexai-blue-500" />}
              description="Understand the science behind our assessment tools and testing methodology."
              link="/how-tests-work"
            />
            <TestCard
              title="Results Interpretation"
              icon={<Percent className="h-6 w-6 text-dyslexai-green-500" />}
              description="View your personalized assessment results and recommendations."
              link="/results"
            />
          </div>
        </Section>

        {/* CTA Section */}
        <Section>
          <div className="bg-gradient-to-r from-dyslexai-blue-100 to-dyslexai-green-100 rounded-xl p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-dyslexai-blue-800 mb-4">
              Ready to Start Your Assessment?
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Begin with our educational content to understand what dyslexia is, or jump directly to our assessment tools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/what-is-dyslexia">
                <Button className="dyslexai-btn-primary">
                  Learn First
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/checklist">
                <Button className="dyslexai-btn-secondary">
                  Start Assessment
                  <CheckSquare className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </PageLayout>
  );
};

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="dyslexai-card hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

type TestCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
};

const TestCard = ({ icon, title, description, link }: TestCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm text-gray-600">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link to={link} className="w-full">
          <Button variant="outline" className="w-full">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HomePage;
