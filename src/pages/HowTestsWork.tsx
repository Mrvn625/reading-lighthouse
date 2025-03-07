
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/ui/page-header";
import Section from "@/components/ui/section";
import { FileText, CheckSquare, BrainCircuit, PenTool, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const HowTestsWork = () => {
  return (
    <PageLayout>
      <div className="dyslexai-container">
        <PageHeader
          title="How Our Tests Work"
          description="Understanding the methodology and science behind our assessment tools"
          icon={<FileText className="h-10 w-10" />}
        />

        <div className="max-w-4xl mx-auto">
          <Section title="Our Approach to Assessment">
            <p>
              DyslexAI provides evidence-based assessment tools designed to help identify potential signs of dyslexia. Our tests are based on established research in the fields of educational psychology, neuroscience, and literacy development.
            </p>
            <p>
              It's important to note that while our assessments can provide valuable insights, they should not replace a formal evaluation by qualified professionals. Our goal is to provide accessible screening tools and educational resources.
            </p>

            <div className="bg-dyslexai-blue-50 p-6 rounded-lg my-8 border border-dyslexai-blue-100">
              <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-3">What Our Tests Can Do:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Identify potential signs and patterns associated with dyslexia</li>
                <li>Provide educational information about dyslexia</li>
                <li>Offer a starting point for further exploration</li>
                <li>Help track changes in certain skills over time</li>
              </ul>
              
              <h3 className="text-xl font-bold text-dyslexai-blue-700 mt-6 mb-3">What Our Tests Cannot Do:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide a formal diagnosis of dyslexia</li>
                <li>Replace professional assessment by qualified specialists</li>
                <li>Account for all possible factors that might affect performance</li>
                <li>Provide a comprehensive evaluation of all literacy skills</li>
              </ul>
            </div>
          </Section>

          <Section title="Our Assessment Tools">
            <p>
              DyslexAI offers several different assessment tools, each designed to evaluate different aspects of language processing and literacy skills. Here's an overview of each test and how it works:
            </p>

            <div className="space-y-6 my-8">
              <TestExplanationCard
                icon={<CheckSquare className="h-10 w-10 text-dyslexai-blue-500" />}
                title="Checklist Assessment"
                description="A comprehensive questionnaire covering behavioral and learning patterns often associated with dyslexia."
                details={[
                  "Based on established symptom checklists used by educators and clinicians",
                  "Covers reading, writing, and language processing abilities",
                  "Includes questions about daily activities and learning experiences",
                  "Takes approximately 10-15 minutes to complete"
                ]}
                link="/checklist"
              />
              
              <TestExplanationCard
                icon={<PenTool className="h-10 w-10 text-dyslexai-green-500" />}
                title="Handwriting Analysis"
                description="Upload or create a handwriting sample to identify potential dyslexia-related patterns in writing."
                details={[
                  "Analyzes letter formation, spacing, and consistency",
                  "Identifies common reversal patterns",
                  "Examines writing organization and structure",
                  "Provides immediate feedback on potential areas of concern"
                ]}
                link="/handwriting-analysis"
              />
              
              <TestExplanationCard
                icon={<BrainCircuit className="h-10 w-10 text-dyslexai-blue-500" />}
                title="Cognitive Tests"
                description="Interactive assessments that evaluate key cognitive processes related to reading and language."
                details={[
                  "Phonological awareness: ability to recognize and manipulate speech sounds",
                  "Rapid automatized naming: speed of retrieving familiar verbal information",
                  "Working memory: capacity to hold and process information",
                  "Processing speed: efficiency of processing visual and verbal information"
                ]}
                link="/cognitive-tests"
              />
            </div>
          </Section>

          <Section title="Scientific Foundation">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-6">
              <div>
                <p>
                  Our assessment tools are based on decades of scientific research on dyslexia and reading development. Key research areas that inform our tests include:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>Phonological Processing Theory:</strong> Research showing that difficulties with processing speech sounds are central to dyslexia</li>
                  <li><strong>Double-Deficit Hypothesis:</strong> Evidence that both phonological awareness and rapid naming contribute to reading difficulties</li>
                  <li><strong>Neuroimaging Studies:</strong> Brain research revealing differences in neural pathways during reading tasks</li>
                </ul>
                <p>
                  Our assessment methods draw from established screening tools like the Comprehensive Test of Phonological Processing (CTOPP-2), the Test of Word Reading Efficiency (TOWRE), and guidelines from the International Dyslexia Association.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1"
                  alt="Scientific research illustration"
                  className="rounded-lg shadow-md max-h-64 object-cover"
                />
              </div>
            </div>
          </Section>

          <Section title="Understanding Your Results">
            <p>
              After completing our assessments, you'll receive personalized results that identify potential areas of concern related to dyslexia. Our results page provides:
            </p>
            
            <ul className="list-disc pl-5 space-y-2 my-4">
              <li>An overview of performance across different assessment areas</li>
              <li>Explanation of what each result might indicate</li>
              <li>Educational resources tailored to identified areas of concern</li>
              <li>Guidance on next steps, including when to seek professional evaluation</li>
            </ul>
            
            <p>
              Remember that these results are meant to provide insights and information, not a diagnosis. If results suggest potential dyslexia, we recommend consulting with educational or healthcare professionals for further evaluation.
            </p>

            <div className="bg-dyslexai-green-50 p-6 rounded-lg my-6 border border-dyslexai-green-100">
              <h3 className="text-xl font-bold text-dyslexai-green-700 mb-3">Next Steps After Assessment</h3>
              <p className="mb-4">If your assessment results indicate potential dyslexia traits, consider these steps:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Share your results with teachers, parents, or healthcare providers</li>
                <li>Seek evaluation from educational psychologists or learning specialists</li>
                <li>Explore educational accommodations that might be helpful</li>
                <li>Learn more about dyslexia through our educational resources</li>
              </ol>
            </div>
          </Section>

          <div className="flex flex-col sm:flex-row justify-center gap-4 my-10">
            <Link to="/checklist">
              <Button className="dyslexai-btn-primary w-full sm:w-auto">
                Start Checklist Assessment
                <CheckSquare className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cognitive-tests">
              <Button className="dyslexai-btn-secondary w-full sm:w-auto">
                Explore Cognitive Tests
                <BrainCircuit className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

type TestExplanationCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  link: string;
};

const TestExplanationCard = ({ icon, title, description, details, link }: TestExplanationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start">
          <div className="mr-4">{icon}</div>
          <div>
            <CardTitle className="text-xl text-dyslexai-blue-700">{title}</CardTitle>
            <CardDescription className="text-base mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link to={link} className="w-full">
          <Button className="w-full">
            Try This Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HowTestsWork;
