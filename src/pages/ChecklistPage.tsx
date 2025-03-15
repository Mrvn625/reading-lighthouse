
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/ui/page-header";
import Section from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, ArrowRight, Check, BrainCircuit } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define age group options
const AGE_GROUPS = {
  preschool: "Preschool (Ages 3-5)",
  schoolAge: "School Age (Ages 6-17)",
  adult: "Adult (Ages 18+)"
};

// Define question categories and questions by age group
const questionGroupsByAgeCategory = {
  preschool: [
    {
      id: "language",
      title: "Language Development",
      questions: [
        { id: "p1", text: "Delay in speaking or difficulties pronouncing words" },
        { id: "p2", text: "Difficulty learning and remembering the names of letters" },
        { id: "p3", text: "Difficulty learning nursery rhymes or playing rhyming games" },
        { id: "p4", text: "Difficulty recognizing rhyming patterns" },
        { id: "p5", text: "Struggles to identify beginning sounds in words" }
      ]
    },
    {
      id: "development",
      title: "Early Development",
      questions: [
        { id: "p6", text: "Difficulty learning colors, shapes, and numbers" },
        { id: "p7", text: "Struggles to follow multi-step directions" },
        { id: "p8", text: "Family history of reading difficulties" },
        { id: "p9", text: "Avoids activities involving letters and words" },
        { id: "p10", text: "Unable to recognize or write their own name" }
      ]
    }
  ],
  schoolAge: [
    {
      id: "reading",
      title: "Reading",
      questions: [
        { id: "s1", text: "Has difficulty sounding out unfamiliar words" },
        { id: "s2", text: "Reads slowly, with many pauses and corrections" },
        { id: "s3", text: "Often loses place while reading or skips lines" },
        { id: "s4", text: "Struggles to comprehend what they've read" },
        { id: "s5", text: "Avoids reading aloud or for leisure" }
      ]
    },
    {
      id: "writing",
      title: "Writing",
      questions: [
        { id: "s6", text: "Has messy handwriting with inconsistent letter formation" },
        { id: "s7", text: "Makes persistent spelling errors, even with common words" },
        { id: "s8", text: "Reverses letters (b/d, p/q) or transposes letters in words" },
        { id: "s9", text: "Has difficulty organizing written work" },
        { id: "s10", text: "Takes much longer than peers to complete writing tasks" }
      ]
    },
    {
      id: "language",
      title: "Language Processing",
      questions: [
        { id: "s11", text: "Struggles to find the right word when speaking" },
        { id: "s12", text: "Has difficulty with rhyming or breaking words into syllables" },
        { id: "s13", text: "Mispronounces words or confuses similar-sounding words" },
        { id: "s14", text: "Has trouble following multi-step verbal instructions" },
        { id: "s15", text: "Struggles to learn and recall the alphabet, days of week, or months" }
      ]
    },
    {
      id: "cognitive",
      title: "Cognitive Skills",
      questions: [
        { id: "s16", text: "Has trouble with sequencing (e.g., alphabet, months, numbers)" },
        { id: "s17", text: "Struggles with time management and organization" },
        { id: "s18", text: "Has poor working memory (e.g., remembering lists or instructions)" },
        { id: "s19", text: "Takes longer to process and respond to questions" },
        { id: "s20", text: "Exhibits strengths in creative, spatial, or hands-on tasks" }
      ]
    }
  ],
  adult: [
    {
      id: "reading",
      title: "Reading",
      questions: [
        { id: "a1", text: "Reads slowly with frequent word recognition errors" },
        { id: "a2", text: "Avoids reading aloud or struggles when required to" },
        { id: "a3", text: "Finds reading for extended periods tiring or stressful" },
        { id: "a4", text: "Has difficulty understanding jokes, puns, or idioms" },
        { id: "a5", text: "Prefers audio books or visual information over reading" }
      ]
    },
    {
      id: "writing",
      title: "Writing and Spelling",
      questions: [
        { id: "a6", text: "Has persistent spelling difficulties despite spell-check tools" },
        { id: "a7", text: "Avoids writing tasks or takes unusually long to complete them" },
        { id: "a8", text: "Has inconsistent or poorly formed handwriting" },
        { id: "a9", text: "Struggles to express ideas clearly in writing" },
        { id: "a10", text: "Makes grammar and punctuation errors more frequently than peers" }
      ]
    },
    {
      id: "workLife",
      title: "Work and Daily Life",
      questions: [
        { id: "a11", text: "Has difficulty with time management and organization" },
        { id: "a12", text: "Struggles with note-taking in meetings or lectures" },
        { id: "a13", text: "Has trouble remembering sequences or following detailed instructions" },
        { id: "a14", text: "Finds it hard to recall names, dates, or phone numbers" },
        { id: "a15", text: "Experiences mental fatigue when processing text-heavy information" }
      ]
    },
    {
      id: "strengths",
      title: "Strengths and Coping",
      questions: [
        { id: "a16", text: "Shows strengths in problem-solving, creativity, or big-picture thinking" },
        { id: "a17", text: "Has developed systems to compensate for reading/writing challenges" },
        { id: "a18", text: "Performs better in jobs requiring visual-spatial skills or creativity" },
        { id: "a19", text: "Prefers to demonstrate knowledge through discussion rather than writing" },
        { id: "a20", text: "Has strong verbal communication or storytelling abilities" }
      ]
    }
  ]
};

const getQuestionGroups = (ageGroup) => {
  return questionGroupsByAgeCategory[ageGroup] || questionGroupsByAgeCategory.schoolAge;
};

const getTotalQuestions = (groups) => {
  return groups.reduce((acc, group) => acc + group.questions.length, 0);
};

const ChecklistPage = () => {
  const [ageGroup, setAgeGroup] = useState("schoolAge");
  const [questionGroups, setQuestionGroups] = useState(getQuestionGroups("schoolAge"));
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user has a profile
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast({
        title: "Profile required",
        description: "Please complete your profile before taking the assessment",
      });
      navigate("/profile");
    }
  }, [navigate, toast]);

  useEffect(() => {
    // Update question groups when age group changes
    setQuestionGroups(getQuestionGroups(ageGroup));
    setCurrentGroupIndex(0);
    setAnswers({});
    setIsSubmitted(false);
  }, [ageGroup]);

  const currentGroup = questionGroups[currentGroupIndex];
  
  const totalQuestions = getTotalQuestions(questionGroups);
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
    const scores = calculateScores();
    const checklistResults = {
      date: new Date().toISOString(),
      score: scores.overall,
      ageGroup: ageGroup,
      categoryScores: scores
    };
    
    // Save to localStorage
    localStorage.setItem("checklistResults", JSON.stringify(checklistResults));
    
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
                <div className="mb-4">
                  <Label htmlFor="ageGroup" className="block text-sm font-medium mb-2">Select Age Group</Label>
                  <Select
                    value={ageGroup}
                    onValueChange={(value) => setAgeGroup(value)}
                  >
                    <SelectTrigger className="w-full sm:w-auto">
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preschool">{AGE_GROUPS.preschool}</SelectItem>
                      <SelectItem value="schoolAge">{AGE_GROUPS.schoolAge}</SelectItem>
                      <SelectItem value="adult">{AGE_GROUPS.adult}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
                <p className="mb-4">
                  This checklist is designed for <strong>{AGE_GROUPS[ageGroup]}</strong> to identify behavioral and learning patterns often associated with dyslexia. Rate each item based on how frequently you (or the person you're assessing) experience these traits.
                </p>
                <p>
                  This assessment is based on guidelines from the International Dyslexia Association and covers key areas relevant to this age group.
                </p>
                <p className="text-gray-600 italic mt-4">
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

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-bold mb-2">How Scores Are Calculated</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Each question is scored from 0-3 (Never=0, Sometimes=1, Often=2, Very Often=3).
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          Category scores = (Sum of question scores) ÷ (Max possible score) × 100
                        </p>
                        <p className="text-sm text-gray-600">
                          Overall score = (Total points across all questions) ÷ (Max possible points) × 100
                        </p>
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

export default ChecklistPage;
