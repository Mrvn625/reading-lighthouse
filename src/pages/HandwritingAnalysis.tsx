
import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/ui/page-header";
import Section from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { PenTool, Upload, ArrowRight, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { analyzeHandwritingWithML, loadHandwritingModel } from "@/utils/ml-services";
import { HandwritingAnalysisResult } from "@/utils/handwritingAnalysis";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const HandwritingAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<HandwritingAnalysisResult | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadModel = async () => {
      try {
        setModelLoading(true);
        const success = await loadHandwritingModel();
        setModelLoaded(success);
        if (success) {
          toast({
            title: "Model loaded",
            description: "Handwriting analysis model is ready to use",
          });
        }
      } catch (error) {
        console.error("Error loading model:", error);
        toast({
          title: "Model loading failed",
          description: "Could not load the handwriting analysis model. Please refresh and try again.",
          variant: "destructive",
        });
      } finally {
        setModelLoading(false);
      }
    };

    loadModel();
  }, [toast]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      if (!file.type.match('image.*')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (jpg, png, etc.)",
          variant: "destructive",
        });
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
      setAnalysisResult(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!previewUrl) return;
    
    setIsAnalyzing(true);
    toast({
      title: "Analyzing handwriting...",
      description: "Our AI model is analyzing your handwriting sample",
    });
    
    try {
      const result = await analyzeHandwritingWithML(previewUrl);
      setAnalysisResult(result);
      
      toast({
        title: "Analysis complete",
        description: "Your handwriting analysis is ready to view",
      });
    } catch (error) {
      console.error("Error analyzing handwriting:", error);
      toast({
        title: "Analysis failed",
        description: "There was a problem analyzing your handwriting sample",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <PageLayout>
      <div className="dyslexai-container">
        <PageHeader
          title="Handwriting Analysis"
          description="Upload a handwriting sample to identify potential dyslexia-related patterns"
          icon={<PenTool className="h-10 w-10" />}
        />

        <div className="max-w-4xl mx-auto">
          <Section title="How This Test Works">
            <p>
              Handwriting can provide valuable insights into potential indicators of dyslexia. People with dyslexia often display certain patterns in their handwriting, such as letter reversals, inconsistent spacing, and difficulties with letter formation.
            </p>
            <p>
              For this test, you'll need to upload a clear image of a handwriting sample. For best results, the sample should include at least 2-3 sentences written on lined paper.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <InstructionCard
                number="1"
                title="Prepare Sample"
                description="Write 2-3 sentences on lined paper with a pen or pencil"
              />
              <InstructionCard
                number="2"
                title="Take Photo"
                description="Capture a clear, well-lit photo of your handwriting"
              />
              <InstructionCard
                number="3"
                title="Upload & Analyze"
                description="Upload the image and our AI will analyze patterns related to dyslexia"
              />
            </div>
          </Section>

          <Section title="Upload Your Handwriting Sample">
            {!modelLoaded && (
              <Alert className="mb-6 border-yellow-500 bg-yellow-50" variant="default">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-yellow-800">Model Loading</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  {modelLoading 
                    ? "The handwriting analysis model is currently loading. This may take a few moments..." 
                    : "The handwriting analysis model failed to load. Please refresh the page to try again."}
                </AlertDescription>
              </Alert>
            )}
            
            <Card>
              <CardContent className="pt-6">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-4" />
                      <p className="text-xl font-medium text-gray-700 mb-1">Upload handwriting sample</p>
                      <p className="text-sm text-gray-500 mb-4">JPG, PNG or GIF up to 10MB</p>
                      <label htmlFor="file-upload">
                        <Button 
                          className="dyslexai-btn-primary cursor-pointer"
                          disabled={!modelLoaded}
                          type="button"
                        >
                          Choose File
                        </Button>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <PenTool className="h-5 w-5 text-dyslexai-blue-500 mr-2" />
                        <span className="font-medium">{selectedFile.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveFile}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                    {previewUrl && (
                      <div className="mt-4 flex justify-center">
                        <img
                          src={previewUrl}
                          alt="Handwriting sample preview"
                          className="max-h-[300px] rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                    <Button
                      className="dyslexai-btn-primary w-full"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !modelLoaded}
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Handwriting"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </Section>

          {analysisResult && (
            <Section title="Analysis Results">
              <div className="bg-white rounded-xl shadow-md p-6 border border-dyslexai-blue-100">
                <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-4">Handwriting Assessment</h3>
                
                <div className="space-y-6">
                  <ResultItem
                    title="Letter Formation"
                    score={analysisResult.letterFormation.score}
                    maxScore={5}
                    description={analysisResult.letterFormation.description}
                  />
                  
                  <ResultItem
                    title="Letter Spacing"
                    score={analysisResult.letterSpacing.score}
                    maxScore={5}
                    description={analysisResult.letterSpacing.description}
                  />
                  
                  <ResultItem
                    title="Line Alignment"
                    score={analysisResult.lineAlignment.score}
                    maxScore={5}
                    description={analysisResult.lineAlignment.description}
                  />
                  
                  <ResultItem
                    title="Letter Reversals"
                    score={analysisResult.letterReversals.score}
                    maxScore={5}
                    description={analysisResult.letterReversals.description}
                  />
                </div>
                
                <div className="mt-8 p-4 bg-dyslexai-blue-50 rounded-lg">
                  <h4 className="font-bold text-dyslexai-blue-700 mb-2">What These Results Mean</h4>
                  <p className="text-gray-700">
                    {analysisResult.overallScore >= 75 ? 
                      "Your handwriting shows few patterns associated with dyslexia. If you're still concerned, continue with our other assessments to gather more information." :
                      analysisResult.overallScore >= 50 ?
                      "Your handwriting shows some patterns that are sometimes associated with dyslexia, particularly in letter formation and spacing. These results suggest it may be worth exploring further assessment options." :
                      "Your handwriting shows several patterns strongly associated with dyslexia, including letter reversals and inconsistent spacing. We recommend completing our other assessments and considering professional evaluation."
                    }
                  </p>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Link to="/checklist">
                    <Button className="dyslexai-btn-primary">
                      Continue to Checklist Assessment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Section>
          )}

          <Section title="What We're Looking For">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <FeatureCard
                title="Letter Reversals"
                description="Frequency of backwards or inverted letters like 'b/d', 'p/q', or 's/z'"
              />
              <FeatureCard
                title="Spacing Issues"
                description="Inconsistent spacing between letters, words, or lines"
              />
              <FeatureCard
                title="Letter Formation"
                description="Inconsistency in how letters are shaped and formed"
              />
              <FeatureCard
                title="Organization"
                description="Overall organization, alignment, and structure of writing"
              />
            </div>
            
            <p className="mt-4 text-gray-600 italic">
              Note: This analysis provides indications only and should not be considered a formal diagnosis. Handwriting can be affected by many factors besides dyslexia, including age, motor skills, and writing conditions.
            </p>
          </Section>

          <div className="flex justify-center my-10">
            <Link to="/checklist">
              <Button className="dyslexai-btn-outline">
                Skip to Checklist Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

type InstructionCardProps = {
  number: string;
  title: string;
  description: string;
};

const InstructionCard = ({ number, title, description }: InstructionCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-dyslexai-blue-100">
      <div className="flex items-center mb-3">
        <div className="bg-dyslexai-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
          {number}
        </div>
        <h3 className="font-bold text-dyslexai-blue-700">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

type FeatureCardProps = {
  title: string;
  description: string;
};

const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-bold text-dyslexai-blue-700 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

type ResultItemProps = {
  title: string;
  score: number;
  maxScore: number;
  description: string;
};

const ResultItem = ({ title, score, maxScore, description }: ResultItemProps) => {
  const dots = [];
  for (let i = 1; i <= maxScore; i++) {
    dots.push(
      <div
        key={i}
        className={`w-4 h-4 rounded-full ${
          i <= score ? "bg-dyslexai-blue-500" : "bg-gray-200"
        }`}
      ></div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold">{title}</h4>
        <div className="flex space-x-1">{dots}</div>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default HandwritingAnalysis;
