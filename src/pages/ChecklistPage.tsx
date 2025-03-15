
import { useState, useEffect } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define age groups
const AGE_GROUPS = {
  PRESCHOOL: "preschool",
  SCHOOL_AGE: "school_age",
  ADULT: "adult"
};

// Define question categories and questions based on age groups
const questionGroupsByAge = {
  [AGE_GROUPS.PRESCHOOL]: [
    {
      id: "preschool_language",
      title: "Language Development",
      questions: [
        { id: "pre_q1", text: "Delayed speech or problems learning to talk" },
        { id: "pre_q2", text: "Difficulty pronouncing words correctly" },
        { id: "pre_q3", text: "Trouble learning nursery rhymes or playing rhyming games" },
        { id: "pre_q4", text: "Difficulty naming familiar objects (vocabulary)" },
        { id: "pre_q5", text: "Unable to recall the right word when speaking" }
      ]
    },
    {
      id: "preschool_knowledge",
      title: "Pre-Reading Skills",
      questions: [
        { id: "pre_q6", text: "Difficulty recognizing and learning the alphabet" },
        { id: "pre_q7", text: "Trouble connecting letters to their sounds" },
        { id: "pre_q8", text: "Inability to recognize rhyming patterns" },
        { id: "pre_q9", text: "Difficulty remembering names of letters in their own name" },
        { id: "pre_q10", text: "Shows little interest in printed language or being read to" }
      ]
    },
    {
      id: "preschool_motor",
      title: "Motor and Cognitive Skills",
      questions: [
        { id: "pre_q11", text: "Difficulty learning to count" },
        { id: "pre_q12", text: "Problems with fine motor skills (using crayons, scissors)" },
        { id: "pre_q13", text: "Confusion with directional concepts (up/down, over/under)" },
        { id: "pre_q14", text: "Difficulty following multi-step directions" },
        { id: "pre_q15", text: "Family history of reading or learning problems" }
      ]
    }
  ],
  [AGE_GROUPS.SCHOOL_AGE]: [
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
        { id: "q6", text: "Makes persistent spelling errors, even with common words" },
        { id: "q7", text: "Reverses letters (b/d, p/q) or transposes letters in words" },
        { id: "q8", text: "Has difficulty organizing written work" },
        { id: "q9", text: "Takes much longer than peers to complete writing tasks" },
        { id: "q10", text: "Written work does not reflect their verbal abilities" }
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
  ],
  [AGE_GROUPS.ADULT]: [
    {
      id: "adult_reading",
      title: "Reading Skills",
      questions: [
        { id: "adult_q1", text: "Reads slowly and laboriously, especially under time pressure" },
        { id: "adult_q2", text: "Avoids reading aloud or struggles when required to do so" },
        { id: "adult_q3", text: "Has to re-read text multiple times to understand meaning" },
        { id: "adult_q4", text: "Difficulty pronouncing uncommon or unfamiliar words" },
        { id: "adult_q5", text: "Tends to prefer listening to information rather than reading it" }
      ]
    },
    {
      id: "adult_writing",
      title: "Writing Skills",
      questions: [
        { id: "adult_q6", text: "Makes persistent spelling errors despite spellchecking" },
        { id: "adult_q7", text: "Written work doesn't reflect verbal abilities or knowledge" },
        { id: "adult_q8", text: "Avoids or delays writing tasks or needs significant extra time" },
        { id: "adult_q9", text: "Difficulty organizing thoughts in writing" },
        { id: "adult_q10", text: "Problems with grammar, punctuation, or sentence structure" }
      ]
    },
    {
      id: "adult_org",
      title: "Organization & Memory",
      questions: [
        { id: "adult_q11", text: "Struggles with time management and meeting deadlines" },
        { id: "adult_q12", text: "Difficulty with following directions or sequences of steps" },
        { id: "adult_q13", text: "Problems remembering names, dates, or phone numbers" },
        { id: "adult_q14", text: "Struggles with mental math or memorizing math facts" },
        { id: "adult_q15", text: "Difficulty keeping track of belongings or managing materials" }
      ]
    },
    {
      id: "adult_language",
      title: "Language & Communication",
      questions: [
        { id: "adult_q16", text: "Mispronounces words or uses wrong word with similar sounds" },
        { id: "adult_q17", text: "Difficulty retrieving specific words when speaking" },
        { id: "adult_q18", text: "Needs more time to formulate responses in conversation" },
        { id: "adult_q19", text: "Difficulty understanding jokes, puns, or idioms" },
        { id: "adult_q20", text: "Strengths in creative thinking, problem-solving, or visual tasks" }
      ]
    }
  ]
};

const ChecklistPage = () => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(AGE_GROUPS.SCHOOL_AGE);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Get the appropriate question groups for the selected age group
  const questionGroups = questionGroupsByAge[selectedAgeGroup];
  
  const totalQuestions = questionGroups.reduce(
    (acc, group) => acc + group.questions.length,
    0
  );

  const currentGroup = questionGroups[currentGroupIndex];
  
  const answeredQuestions = Object.keys(answers).length;
  const progress = Math.round((answeredQuestions / totalQuestions) * 100);

  // Reset when age group changes
  useEffect(() => {
    setCurrentGroupIndex(0);
    setAnswers({});
    setIsSubmitted(false);
  }, [selectedAgeGroup]);

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
    // Calculate the scores
    const scores = calculateScores();
    
    // Save to localStorage
    const checklistResults = {
      date: new Date().toISOString(),
      ageGroup: selectedAgeGroup,
      score: scores.overall,
      categoryScores: scores,
      answers: answers
    };
    
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
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div className="w-full md:w-auto">
                      <Label htmlFor="age-group" className="mb-2 block">Select Age Group</Label>
                      <Select
                        value={selectedAgeGroup}
                        onValueChange={setSelectedAgeGroup}
                      >
                        <SelectTrigger className="w-full md:w-[220px]">
                          <SelectValue placeholder="Select age group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={AGE_GROUPS.PRESCHOOL}>Preschool (Ages 3-5)</SelectItem>
                          <SelectItem value={AGE_GROUPS.SCHOOL_AGE}>School Age (Ages 6-17)</SelectItem>
                          <SelectItem value={AGE_GROUPS.ADULT}>Adult (Ages 18+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex-1 w-full md:w-auto text-right">
                      <span className="text-sm font-medium text-gray-500 block md:inline mb-1 md:mb-0 md:mr-3">
                        Progress: {progress}% ({answeredQuestions}/{totalQuestions})
                      </span>
                      <span className="text-sm font-medium text-gray-500 block md:inline">
                        Section {currentGroupIndex + 1} of {questionGroups.length}
                      </span>
                    </div>
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
                <p className="text-left mb-2">
                  This checklist is designed to identify behavioral and learning patterns often associated with dyslexia. 
                  Rate each item based on how frequently you (or the person you're assessing) experience these traits.
                </p>
                <p className="text-left mb-4">
                  We've customized this assessment for the {selectedAgeGroup === AGE_GROUPS.PRESCHOOL ? "preschool" : 
                    selectedAgeGroup === AGE_GROUPS.SCHOOL_AGE ? "school-age" : "adult"} age group, following guidelines from the 
                  <a href="https://dyslexiaida.org/screening-for-dyslexia/" target="_blank" rel="noopener noreferrer" className="text-dyslexai-blue-600 hover:underline"> International Dyslexia Association</a>.
                </p>
                <p className="text-gray-600 italic text-left">
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
                        <ResultInterpretation score={scores.overall} ageGroup={selectedAgeGroup} />
                      </div>

                      <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-4">Category Breakdown</h3>
                      <div className="space-y-6">
                        {questionGroups.map((group) => (
                          <div key={group.id} className="p-4 bg-gray-50 rounded-lg">
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
                            <p className="text-sm text-gray-600 mt-2 text-left">
                              {getCategoryInterpretation(group.id, scores[group.id], selectedAgeGroup)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 p-4 bg-dyslexai-blue-50 rounded-lg">
                        <h4 className="font-bold text-dyslexai-blue-700 mb-2">
                          Score Calculation Method
                        </h4>
                        <p className="text-gray-700 mb-4 text-left">
                          This score is calculated based on your responses to all questions, where:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 text-left mb-4">
                          <li>"Never or rarely" = 0 points</li>
                          <li>"Sometimes" = 1 point</li>
                          <li>"Often" = 2 points</li>
                          <li>"Very often or always" = 3 points</li>
                        </ul>
                        <p className="text-gray-700 text-left">
                          The maximum possible score is {totalQuestions * 3} points. Your raw score of {Object.values(answers).reduce((sum, score) => sum + score, 0)} points 
                          equates to {scores.overall}% of the maximum possible score. Higher percentages indicate more dyslexia-related characteristics reported.
                        </p>
                      </div>

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
                    </>
                  );
                })()}
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
  ageGroup: string;
};

const ResultInterpretation = ({ score, ageGroup }: ResultInterpretationProps) => {
  let level, description;

  if (score >= 70) {
    level = "High indicators";
    description = ageGroup === AGE_GROUPS.PRESCHOOL 
      ? "Your responses indicate multiple early warning signs that may be associated with future reading difficulties or dyslexia."
      : ageGroup === AGE_GROUPS.SCHOOL_AGE
      ? "Your responses indicate multiple characteristics often associated with dyslexia in school-aged children."
      : "Your responses indicate multiple characteristics often associated with dyslexia in adults.";
  } else if (score >= 40) {
    level = "Moderate indicators";
    description = ageGroup === AGE_GROUPS.PRESCHOOL
      ? "Your responses show some early signs that could indicate potential reading challenges."
      : ageGroup === AGE_GROUPS.SCHOOL_AGE
      ? "Your responses show some characteristics that may be associated with dyslexia."
      : "Your responses show some characteristics that may be associated with dyslexia in adults.";
  } else {
    level = "Low indicators";
    description = ageGroup === AGE_GROUPS.PRESCHOOL
      ? "Your responses show few early warning signs typically associated with future reading difficulties."
      : ageGroup === AGE_GROUPS.SCHOOL_AGE
      ? "Your responses show few characteristics typically associated with dyslexia."
      : "Your responses show few characteristics typically associated with dyslexia in adults.";
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
        <p className="text-gray-600 text-left">{description}</p>
      </div>
    </div>
  );
};

// Function to get category-specific interpretation text
function getCategoryInterpretation(categoryId: string, score: number, ageGroup: string): string {
  // Preschool interpretations
  if (ageGroup === AGE_GROUPS.PRESCHOOL) {
    if (categoryId === "preschool_language") {
      return score >= 70 
        ? "Shows significant language development concerns that may indicate early signs of dyslexia."
        : score >= 40
        ? "Shows some language development patterns that may need monitoring."
        : "Shows typical language development patterns for age.";
    }
    if (categoryId === "preschool_knowledge") {
      return score >= 70 
        ? "Shows significant challenges with pre-reading skills that often precede dyslexia."
        : score >= 40
        ? "Shows some difficulty with pre-reading skills that may need support."
        : "Shows typical pre-reading skill development for age.";
    }
    if (categoryId === "preschool_motor") {
      return score >= 70 
        ? "Shows significant issues with motor and cognitive skills often associated with learning differences."
        : score >= 40
        ? "Shows some challenges with motor and cognitive skills that may need support."
        : "Shows typical motor and cognitive skill development for age.";
    }
  }
  
  // School-age interpretations
  if (ageGroup === AGE_GROUPS.SCHOOL_AGE) {
    if (categoryId === "reading") {
      return score >= 70 
        ? "Shows significant reading difficulties typical of dyslexia."
        : score >= 40
        ? "Shows some reading challenges that may be related to dyslexia."
        : "Shows few reading difficulties associated with dyslexia.";
    }
    if (categoryId === "writing") {
      return score >= 70 
        ? "Shows significant writing difficulties often seen with dyslexia."
        : score >= 40
        ? "Shows some writing challenges that may be related to dyslexia."
        : "Shows few writing difficulties associated with dyslexia.";
    }
    if (categoryId === "language") {
      return score >= 70 
        ? "Shows significant language processing difficulties characteristic of dyslexia."
        : score >= 40
        ? "Shows some language processing challenges that may be related to dyslexia."
        : "Shows few language processing difficulties associated with dyslexia.";
    }
    if (categoryId === "cognitive") {
      return score >= 70 
        ? "Shows significant cognitive skill patterns commonly associated with dyslexia."
        : score >= 40
        ? "Shows some cognitive patterns that may be related to dyslexia."
        : "Shows few cognitive patterns associated with dyslexia.";
    }
  }
  
  // Adult interpretations
  if (ageGroup === AGE_GROUPS.ADULT) {
    if (categoryId === "adult_reading") {
      return score >= 70 
        ? "Shows significant reading difficulties common in adults with dyslexia."
        : score >= 40
        ? "Shows some reading challenges that may be related to dyslexia."
        : "Shows few reading difficulties associated with dyslexia.";
    }
    if (categoryId === "adult_writing") {
      return score >= 70 
        ? "Shows significant writing difficulties typical of adults with dyslexia."
        : score >= 40
        ? "Shows some writing challenges that may be related to dyslexia."
        : "Shows few writing difficulties associated with dyslexia.";
    }
    if (categoryId === "adult_org") {
      return score >= 70 
        ? "Shows significant organizational challenges often seen in adults with dyslexia."
        : score >= 40
        ? "Shows some organizational challenges that may be related to dyslexia."
        : "Shows few organizational difficulties associated with dyslexia.";
    }
    if (categoryId === "adult_language") {
      return score >= 70 
        ? "Shows significant language and communication difficulties characteristic of dyslexia in adults."
        : score >= 40
        ? "Shows some language and communication challenges that may be related to dyslexia."
        : "Shows few language and communication difficulties associated with dyslexia.";
    }
  }
  
  return "Score calculated based on your responses in this category.";
}

import { BrainCircuit } from "lucide-react";

export default ChecklistPage;
