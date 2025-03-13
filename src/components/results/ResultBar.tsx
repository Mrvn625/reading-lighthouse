
import { ReactNode } from "react";

interface ResultBarProps {
  title: string;
  score: number;
  description: string;
  date?: string;
}

const ResultBar = ({ title, score, description, date }: ResultBarProps) => {
  const getBarColor = (score: number): string => {
    if (score >= 80) return "bg-green-500"; 
    if (score >= 70) return "bg-green-400";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 50) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div>
          <h4 className="font-medium">{title}</h4>
          {date && <span className="text-xs text-gray-500">Completed: {new Date(date).toLocaleDateString()}</span>}
        </div>
        <span className="font-bold">{score}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div 
          className={`${getBarColor(score)} h-4 rounded-full`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-1 text-left">{description}</p>
    </div>
  );
};

export default ResultBar;
