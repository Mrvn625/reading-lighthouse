
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Brain, 
  Clock, 
  Hourglass, 
  Text, 
  Headphones, 
  MoveHorizontal,
  PenTool,
  ClipboardCheck,
  User
} from "lucide-react";
import TestCard from "./TestCard";

const AvailableTests = () => {
  const navigate = useNavigate();

  // Check if user has a profile set up
  const hasUserProfile = localStorage.getItem("user") !== null;

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-dyslexai-blue-700 mb-6">Available Assessments</h2>
        
        <div className="mb-6">
          <h3 className="font-semibold text-dyslexai-blue-600 mb-3 flex items-center">
            <User className="mr-2 h-5 w-5" />
            User Profile
          </h3>
          <div className="p-4 bg-dyslexai-blue-50 rounded-lg mb-4">
            <p className="text-gray-700 mb-2">
              {hasUserProfile 
                ? "You have already created your user profile. You can update it at any time."
                : "Please set up your user profile before starting the assessments. This will help personalize your results."}
            </p>
            <Button 
              onClick={() => navigate("/profile")} 
              className="mt-2"
              variant={hasUserProfile ? "outline" : "default"}
            >
              {hasUserProfile ? "Update Profile" : "Create Profile"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold text-dyslexai-blue-600 mb-3 flex items-center">
            <PenTool className="mr-2 h-5 w-5" />
            Handwriting Analysis
          </h3>
          <TestCard
            title="Handwriting Sample Analysis"
            description="Upload a handwriting sample for AI analysis"
            duration="5-10 minutes"
            buttonText="Start Analysis"
            icon={<PenTool className="h-8 w-8 text-dyslexai-blue-500" />}
            onClick={() => navigate("/handwriting")}
          />
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold text-dyslexai-blue-600 mb-3 flex items-center">
            <ClipboardCheck className="mr-2 h-5 w-5" />
            Symptom Checklist
          </h3>
          <TestCard
            title="Dyslexia Symptom Checklist"
            description="Complete a questionnaire to identify potential dyslexia indicators"
            duration="10-15 minutes"
            buttonText="Start Checklist"
            icon={<ClipboardCheck className="h-8 w-8 text-dyslexai-blue-500" />}
            onClick={() => navigate("/checklist")}
          />
        </div>
        
        <div>
          <h3 className="font-semibold text-dyslexai-blue-600 mb-3 flex items-center">
            <Brain className="mr-2 h-5 w-5" />
            Cognitive Tests
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TestCard
              title="Phonological Awareness"
              description="Test ability to identify and manipulate sounds in words"
              duration="5 minutes"
              buttonText="Start Test"
              icon={<Text className="h-8 w-8 text-dyslexai-blue-500" />}
              onClick={() => navigate("/cognitive-tests/phonological")}
            />
            
            <TestCard
              title="Working Memory"
              description="Test ability to hold and manipulate information"
              duration="5 minutes"
              buttonText="Start Test"
              icon={<Brain className="h-8 w-8 text-dyslexai-blue-500" />}
              onClick={() => navigate("/cognitive-tests/working-memory")}
            />
            
            <TestCard
              title="Processing Speed"
              description="Test speed of processing visual information"
              duration="5 minutes"
              buttonText="Start Test"
              icon={<Clock className="h-8 w-8 text-dyslexai-blue-500" />}
              onClick={() => navigate("/cognitive-tests/processing-speed")}
            />
            
            <TestCard
              title="Rapid Automatic Naming"
              description="Test ability to quickly name visual symbols"
              duration="5 minutes"
              buttonText="Start Test"
              icon={<Hourglass className="h-8 w-8 text-dyslexai-blue-500" />}
              onClick={() => navigate("/cognitive-tests/ran")}
            />
            
            <TestCard
              title="Audio Discrimination"
              description="Test ability to distinguish between similar sounds"
              duration="5 minutes"
              buttonText="Start Test"
              icon={<Headphones className="h-8 w-8 text-dyslexai-blue-500" />}
              onClick={() => navigate("/cognitive-tests/audio-discrimination")}
            />
            
            <TestCard
              title="Direction Sense"
              description="Test ability to recognize letter and symbol orientation"
              duration="5 minutes"
              buttonText="Start Test"
              icon={<MoveHorizontal className="h-8 w-8 text-dyslexai-blue-500" />}
              onClick={() => navigate("/cognitive-tests/direction-sense")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailableTests;
