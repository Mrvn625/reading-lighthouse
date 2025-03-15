
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, PlayCircle } from "lucide-react";

type TestCardProps = {
  title: string;
  description: string;
  duration: string;
  skills: string[];
  completed?: boolean;
  onStart: () => void;
};

const TestCard = ({ title, description, duration, skills, completed = false, onStart }: TestCardProps) => {
  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-dyslexai-blue-700 flex items-center">
          {title}
          {completed && (
            <CheckCircle2 className="ml-2 h-5 w-5 text-green-500" />
          )}
        </CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-gray-600 mb-4">
          <span className="flex items-center">
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {duration}
          </span>
        </div>
        <div>
          <h4 className="font-medium mb-2">Skills Assessed:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-dyslexai-blue-400 mr-2"></div>
                <span className="text-sm">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full flex items-center justify-center ${
            completed ? "bg-green-500 hover:bg-green-600" : ""
          }`}
          onClick={onStart}
        >
          {completed ? (
            <>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Test Completed - Retake
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-5 w-5" />
              Start Test
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestCard;
