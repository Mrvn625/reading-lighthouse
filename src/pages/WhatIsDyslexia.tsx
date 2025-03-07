
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/ui/page-header";
import Section from "@/components/ui/section";
import { BookOpen, BrainCircuit, ArrowRight, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const WhatIsDyslexia = () => {
  return (
    <PageLayout>
      <div className="dyslexai-container">
        <PageHeader
          title="What is Dyslexia?"
          description="Understanding dyslexia, its symptoms, and impacts on learning and daily life"
          icon={<BookOpen className="h-10 w-10" />}
        />

        <div className="max-w-4xl mx-auto">
          <Section title="Understanding Dyslexia">
            <p>
              Dyslexia is a learning disorder characterized by difficulties with accurate and fluent word recognition, spelling, and decoding abilities. It affects how the brain processes language and is not related to intelligence or vision problems.
            </p>
            <p>
              Approximately 15-20% of the population exhibits some symptoms of dyslexia. It is a neurological condition that is often hereditary and exists on a spectrum, meaning individuals can experience it in different ways and to varying degrees.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-dyslexai-blue-700">What Dyslexia Is</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>A learning difference that affects reading, writing, and spelling</li>
                    <li>A neurological condition present from birth</li>
                    <li>Often hereditary and runs in families</li>
                    <li>A lifelong condition that can be managed with appropriate support</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-dyslexai-blue-700">What Dyslexia Is Not</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Not a sign of low intelligence or laziness</li>
                    <li>Not primarily a vision problem</li>
                    <li>Not caused by lack of educational opportunity</li>
                    <li>Not something individuals "grow out of"</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </Section>

          <Section title="Common Signs of Dyslexia">
            <p>
              Dyslexia can present differently from person to person, but there are some common signs to watch for at different ages. It's important to note that having some of these signs doesn't necessarily mean someone has dyslexia.
            </p>

            <div className="space-y-6 my-8">
              <SignsCard
                title="In Preschool Children"
                signs={[
                  "Late talking compared to other children",
                  "Difficulty learning new words and rhymes",
                  "Trouble recognizing letters in their own name",
                  "Struggles with pronouncing words correctly",
                  "Difficulty learning or remembering the alphabet"
                ]}
              />
              <SignsCard
                title="In School-Age Children"
                signs={[
                  "Reading below expected level for age",
                  "Difficulty sounding out unfamiliar words",
                  "Frequent spelling errors, even with common words",
                  "Confusing letters that look similar (b/d, p/q)",
                  "Slow or laborious reading and writing",
                  "Avoiding reading activities or becoming frustrated with reading tasks"
                ]}
              />
              <SignsCard
                title="In Teenagers and Adults"
                signs={[
                  "Continued reading and spelling difficulties",
                  "Slow reading and writing that may affect academic performance",
                  "Poor note-taking abilities",
                  "Difficulty summarizing information",
                  "Trouble with foreign language learning",
                  "Tendency to avoid reading-intensive tasks"
                ]}
              />
            </div>
          </Section>

          <Section title="The Brain and Dyslexia">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-6">
              <div>
                <p>
                  Research using brain imaging has shown that people with dyslexia process information differently. Areas of the brain typically associated with reading and language processing show different patterns of activity.
                </p>
                <p>
                  Key differences include:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Reduced activity in the left temporoparietal region (associated with phonological processing)</li>
                  <li>Different connections between language areas of the brain</li>
                  <li>Reliance on different brain pathways when reading</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="Brain function illustration"
                  className="rounded-lg shadow-md max-h-64 object-cover"
                />
              </div>
            </div>
            <p>
              It's important to understand that the dyslexic brain is not "broken"—it's simply wired differently. Many people with dyslexia have exceptional abilities in areas such as three-dimensional thinking, problem-solving, and creative fields.
            </p>
          </Section>

          <Section title="Support and Accommodations">
            <p>
              With appropriate support and teaching methods, people with dyslexia can thrive academically and professionally. Effective approaches include:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
              <SupportCard title="Structured Literacy" icon={<BookOpen className="h-6 w-6" />} description="Explicit, systematic teaching of reading and language skills" />
              <SupportCard title="Assistive Technology" icon={<BrainCircuit className="h-6 w-6" />} description="Text-to-speech, spell checkers, and dictation software" />
              <SupportCard title="Multisensory Learning" icon={<CheckSquare className="h-6 w-6" />} description="Using visual, auditory, and kinesthetic approaches" />
            </div>

            <p>
              Many famous thinkers, artists, entrepreneurs, and scientists have had dyslexia, including Albert Einstein, Leonardo da Vinci, Steve Jobs, and Richard Branson.
            </p>
          </Section>

          <div className="flex justify-center my-10">
            <Link to="/how-tests-work">
              <Button className="dyslexai-btn-primary">
                Learn How Our Tests Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

type SignsCardProps = {
  title: string;
  signs: string[];
};

const SignsCard = ({ title, signs }: SignsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-dyslexai-blue-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          {signs.map((sign, index) => (
            <li key={index}>{sign}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

type SupportCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const SupportCard = ({ title, description, icon }: SupportCardProps) => {
  return (
    <div className="bg-dyslexai-blue-50 p-4 rounded-lg">
      <div className="flex items-center mb-2 text-dyslexai-blue-600">
        {icon}
        <h3 className="font-bold ml-2">{title}</h3>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default WhatIsDyslexia;
