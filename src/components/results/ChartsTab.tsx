
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, Bar, Legend } from 'recharts';

interface ChartsTabProps {
  generateChartData: () => Array<{
    name: string;
    score: number;
    threshold: number;
  }>;
}

const ChartsTab = ({ generateChartData }: ChartsTabProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-4">Performance Analysis</h3>
        
        <div className="mb-8">
          <h4 className="font-semibold text-dyslexai-blue-700 mb-2">Cognitive Profile</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={generateChartData()}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  formatter={(value, name) => {
                    return [`${value}%`, name === "threshold" ? "Research Threshold" : "Your Score"];
                  }}
                />
                <Legend />
                <Bar dataKey="score" fill="#3b82f6" name="Your Score" />
                <Bar dataKey="threshold" fill="#94a3b8" name="Research Threshold" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-left">
            This chart compares your performance across different cognitive areas assessed. Scores above the threshold indicate stronger performance in those areas. Thresholds are based on research by Shaywitz et al. (2008), Willcutt et al. (2005), and Norton & Wolf (2012).
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-dyslexai-blue-700 mb-2">Strengths and Challenges</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={generateChartData()}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  formatter={(value, name) => {
                    return [`${value}%`, name === "threshold" ? "Research Threshold" : "Your Score"];
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  activeDot={{ r: 8 }} 
                  name="Your Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="threshold" 
                  stroke="#ef4444" 
                  strokeDasharray="5 5" 
                  name="Research Threshold"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-left">
            This line chart highlights the pattern of your strengths and challenges across cognitive domains related to dyslexia. The research threshold of 70% is based on standardized assessments used in clinical practice as described by the International Dyslexia Association.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartsTab;
