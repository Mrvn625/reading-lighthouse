
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

type TestIntroProps = {
  onStart: () => void;
};

const TestIntro = ({ onStart }: TestIntroProps) => {
  return (
    <div className="text-center p-8">
      <h3 className="text-lg font-bold mb-4">Instructions</h3>
      <p className="mb-6">
        In this test, you'll hear a word and be asked questions about the sounds in the word.
        Listen carefully and select the correct answer.
      </p>
      <Button onClick={onStart} className="dyslexai-btn-primary">
        <PlayCircle className="mr-2 h-5 w-5" />
        Start Test
      </Button>
    </div>
  );
};

export default TestIntro;
