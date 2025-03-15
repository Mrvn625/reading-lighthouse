
import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/ui/page-header";
import Section from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, ArrowRight, Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

// Define question categories and questions
const questionGroups = [
  {
    id: "reading",
    title: "Reading",
    questions: [
      { id: "q1", text: "Has difficulty sounding out unfamiliar words" },
      { id: "q2", text: "Reads slowly, with many pauses and corrections" },
      { id: "q3", text: "Often loses place while reading or skips lines" },
      { id: "q4", text: "Struggles to comprehend what they've read" },
      { id: "q5", text: "Avoids reading aloud or for leisure" }
    ]
  },
  {
    id: "writing",
    title: "Writing",
    questions: [
      { id: "q6", text: "Has messy handwriting with inconsistent letter formation" },
      { id: "q7", text: "Makes persistent spelling errors, even with common words" },
      { id: "q8", text: "Reverses letters (b/d, p/q) or transposes letters in words" },
      { id: "q9", text: "Has difficulty organizing written work" },
      { id: "q10", text: "Takes much longer than peers to complete writing tasks" }
    ]
  },
  {
    id: "language",
    title: "Language Processing",
    questions: [
      { id: "q11", text: "Struggles to find the right word when speaking" },
      { id: "q12", text: "Has difficulty with rhyming or breaking words into syllables" },
      { id: "q13", text: "Mispronounces words or confuses similar-sounding words" },
      { id: "q14", text: "Has trouble following multi-step verbal instructions" },
      { id: "q15", text: "Struggles to learn and recall the alphabet, days of week, or months" }
    ]
  },
  {
    id: "cognitive",
    title: "Cognitive Skills",
    questions: [
      { id: "q16", text: "Has trouble with sequencing (e.g., alphabet, months, numbers)" },
      { id: "q17", text: "Struggles with time management and organization" },
      { id: "q18", text: "Has poor working memory (e.g., remembering lists or instructions)" },
      { id: "q19", text: "Takes longer to process and respond to questions" },
      { id: "q20", text: "Exhibits strengths in creative, spatial, or hands-on tasks" }
    ]
  }
];

const totalQuestions = questionGroups.reduce(
  (acc, group) => acc + group.questions.length,
  0
);

const ChecklistPage = () => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const currentGroup = questionGroups[currentGroupIndex];
  
  const answeredQuestions = Object.keys(answers).length;
  const progress = Math.round((answeredQuestions / totalQuestions) * 100);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const isCurrentGroupComplete = () => {
    return currentGroup.questions.every(q => q.id in answers);
  };

  const handleNext = () => {
    if (!isCurrentGroupComplete()) {
      toast({
        title: "Please answer all questions",
        description: "All questions in this section must be answered before continuing.",
        variant: "destructive",
      });
      return;
    }

    if (currentGroupIndex < questionGroups.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
      // Smoothly scroll to top of questions
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      submitAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
      // Smoothly scroll to top of questions
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const submitAssessment = () => {
    toast({
      title: "Assessment submitted",
      description: "Your checklist responses have been analyzed.",
    });
    setIsSubmitted(true);
    // Scroll to top to see results
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate scores for results
  const calculateScores = () => {
    const scores: Record<string, number> = {};
    
    questionGroups.forEach(group => {
      const groupQuestions = group.questions;
      const groupScores = groupQuestions.map(q => answers[q.id] || 0);
      const totalScore = groupScores.reduce((sum, score) => sum + score, 0);
      const maxPossibleScore = groupQuestions.length * 3; // 3 is max score per question
      scores[group.id] = Math.round((totalScore / maxPossibleScore) * 100);
    });
    
    // Calculate overall score
    const allScores = Object.values(answers);
    const totalScore = allScores.reduce((sum, score) => sum + score, 0);
    const maxPossibleScore = totalQuestions * 3; // 3 is max score per question
    scores.overall = Math.round((totalScore / maxPossibleScore) * 100);
    
    return scores;
  };

  return (
    <PageLayout>
      <div className="dyslexai-container">
        <PageHeader
          title="Dyslexia Checklist Assessment"
          description="Complete this questionnaire to identify potential dyslexia-related patterns"
          icon={<CheckSquare className="h-10 w-10" />}
        />

        <div className="max-w-3xl mx-auto">
          {!isSubmitted ? (
            <>
              <Section>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Progress: {progress}% ({answeredQuestions}/{totalQuestions} questions)
                    </span>
                    <span className="text-sm font-medium text-gray-500">
                      Section {currentGroupIndex + 1} of {questionGroups.length}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <Card className="p-6">
                  <h2 className="text-xl font-bold text-dyslexai-blue-700 mb-6">
                    {currentGroup.title} Questions
                  </h2>
                  
                  <div className="space-y-6">
                    {currentGroup.questions.map((question) => (
                      <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                        <p className="mb-3 font-medium">{question.text}</p>
                        <RadioGroup
                          value={answers[question.id]?.toString()}
                          onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
                          className="space-y-2"
                        >
                          <div className="flex items-center">
                            <RadioGroupItem value="0" id={`${question.id}-0`} />
                            <Label htmlFor={`${question.id}-0`} className="ml-2">Never or rarely</Label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="1" id={`${question.id}-1`} />
                            <Label htmlFor={`${question.id}-1`} className="ml-2">Sometimes</Label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="2" id={`${question.id}-2`} />
                            <Label htmlFor={`${question.id}-2`} className="ml-2">Often</Label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="3" id={`${question.id}-3`} />
                            <Label htmlFor={`${question.id}-3`} className="ml-2">Very often or always</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentGroupIndex === 0}
                    >
                      Previous Section
                    </Button>
                    <Button
                      className={currentGroupIndex === questionGroups.length - 1 ? "dyslexai-btn-primary" : ""}
                      onClick={handleNext}
                    >
                      {currentGroupIndex === questionGroups.length - 1 ? "Submit Assessment" : "Next Section"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              </Section>

              <Section title="About This Assessment">
                <p>
                  This checklist is designed to identify behavioral and learning patterns often associated with dyslexia. Rate each item based on how frequently you (or the person you're assessing) experience these traits.
                </p>
                <p>
                  This assessment covers four key areas:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>Reading:</strong> Fluency, accuracy, and comprehension</li>
                  <li><strong>Writing:</strong> Spelling, handwriting, and written expression</li>
                  <li><strong>Language Processing:</strong> Phonological awareness and verbal skills</li>
                  <li><strong>Cognitive Skills:</strong> Memory, processing speed, and organization</li>
                </ul>
                <p className="text-gray-600 italic">
                  Note: This checklist provides indications only and should not be considered a formal diagnosis. Many of these traits can be related to other learning differences or developmental factors.
                </p>
              </Section>
            </>
          ) : (
            // Results view
            <Section title="Your Assessment Results">
              <div className="bg-white rounded-xl shadow-md p-6 border border-dyslexai-blue-100">
                {(() => {
                  const scores = calculateScores();
                  return (
                    <>
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-4">Overall Result</h3>
                        <div className="flex items-center mb-4">
                          <div className="w-full bg-gray-200 rounded-full h-6 mr-4">
                            <div
                              className={`h-6 rounded-full ${
                                scores.overall >= 70
                                  ? "bg-dyslexai-blue-500"
                                  : scores.overall >= 40
                                  ? "bg-dyslexai-blue-300"
                                  : "bg-dyslexai-blue-200"
                              }`}
                              style={{ width: `${scores.overall}%` }}
                            ></div>
                          </div>
                          <span className="text-lg font-bold">{scores.overall}%</span>
                        </div>
                        <ResultInterpretation score={scores.overall} />
                      </div>

                      <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-4">Category Breakdown</h3>
                      <div className="space-y-6">
                        {questionGroups.map((group) => (
                          <div key={group.id}>
                            <h4 className="font-bold mb-2">{group.title}</h4>
                            <div className="flex items-center mb-1">
                              <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
                                <div
                                  className="h-4 rounded-full bg-dyslexai-blue-400"
                                  style={{ width: `${scores[group.id]}%` }}
                                ></div>
                              </div>
                              <span className="font-medium">{scores[group.id]}%</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 p-4 bg-dyslexai-blue-50 rounded-lg">
                        <h4 className="font-bold text-dyslexai-blue-700 mb-2">
                          What These Results Mean
                        </h4>
                        <p className="text-gray-700 mb-4">
                          {scores.overall >= 70
                            ? "Your responses indicate several patterns commonly associated with dyslexia. While this is not a diagnosis, it suggests that further professional assessment may be beneficial."
                            : scores.overall >= 40
                            ? "Your responses show some patterns that could be associated with dyslexia. Consider exploring these areas further with our other assessments or with an educational professional."
                            : "Your responses show few patterns typically associated with dyslexia. If you're still concerned, consider completing our other assessments or consulting with an educational professional."}
                        </p>
                        <p className="text-gray-700">
                          Remember that dyslexia exists on a spectrum, and many of these traits can be related to other factors. This checklist is just one piece of information to consider.
                        </p>
                      </div>
                    </>
                  );
                })()}

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/cognitive-tests">
                    <Button className="dyslexai-btn-primary w-full sm:w-auto">
                      Continue to Cognitive Tests
                      <BrainCircuit className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/results">
                    <Button className="dyslexai-btn-outline w-full sm:w-auto">
                      View All Results
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Section>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

type ResultInterpretationProps = {
  score: number;
};

const ResultInterpretation = ({ score }: ResultInterpretationProps) => {
  let level, description;

  if (score >= 70) {
    level = "High indicators";
    description = "Your responses indicate multiple characteristics often associated with dyslexia.";
  } else if (score >= 40) {
    level = "Moderate indicators";
    description = "Your responses show some characteristics that may be associated with dyslexia.";
  } else {
    level = "Low indicators";
    description = "Your responses show few characteristics typically associated with dyslexia.";
  }

  return (
    <div className="flex items-start">
      <div className={`p-2 rounded-full mr-3 ${
        score >= 70 ? "bg-dyslexai-blue-100" : "bg-gray-100"
      }`}>
        <Check className={`h-5 w-5 ${
          score >= 70 ? "text-dyslexai-blue-700" : "text-gray-500"
        }`} />
      </div>
      <div>
        <h4 className="font-bold">{level}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

import { BrainCircuit } from "lucide-react";

export default ChecklistPage;
