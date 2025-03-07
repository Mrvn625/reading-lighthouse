
import { Button } from "@/components/ui/button";

type TestSimulationProps = {
  title: string;
  description: string;
  onComplete: (score: number) => void;
};

const TestSimulation = ({ title, description, onComplete }: TestSimulationProps) => {
  return (
    <div className="text-center p-12 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="mb-4">{description}</p>
      <Button 
        className="dyslexai-btn-primary"
        onClick={() => onComplete(Math.floor(Math.random() * 30) + 50)}
      >
        Simulate Test Completion
      </Button>
    </div>
  );
};

export default TestSimulation;
