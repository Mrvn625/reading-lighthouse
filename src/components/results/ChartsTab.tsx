
import { Card, CardContent } from "@/components/ui/card";
import { 
  LineChart, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Line, 
  Bar, 
  Legend,
  ReferenceLine,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { InfoCircle } from "lucide-react";

interface ChartsTabProps {
  generateChartData: () => Array<{
    name: string;
    score: number;
    threshold: number;
  }>;
}

const ChartsTab = ({ generateChartData }: ChartsTabProps) => {
  const [chartType, setChartType] = useState("bar");
  const chartData = generateChartData();
  
  // Define chart colors
  const config = {
    score: {
      label: "Your Score",
      theme: {
        light: "#3b82f6", // Blue color for scores
        dark: "#60a5fa",
      }
    },
    threshold: {
      label: "Research Threshold",
      theme: {
        light: "#94a3b8", // Gray color for threshold
        dark: "#64748b",
      }
    },
    area: {
      label: "Performance Area",
      theme: {
        light: "rgba(59, 130, 246, 0.2)", // Transparent blue for area
        dark: "rgba(96, 165, 250, 0.3)",
      }
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-4">Performance Analysis</h3>
        
        <Tabs value={chartType} onValueChange={setChartType} className="mb-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="area">Area Chart</TabsTrigger>
            <TabsTrigger value="radar">Radar Chart</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="h-[350px] w-full mb-6">
          {chartType === "bar" && (
            <ChartContainer
              config={config}
              className="w-full h-full"
            >
              <BarChart
                data={chartData}
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
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <ChartTooltipContent
                          className="p-2"
                          label={`${data.name}`}
                          payload={payload}
                          formatter={(value, name) => {
                            return [`${value}%`, name === "threshold" ? "Research Threshold" : "Your Score"];
                          }}
                        />
                      );
                    }
                    return null;
                  }} 
                />
                <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Threshold', position: 'right', fill: '#ef4444' }} />
                <Legend />
                <Bar dataKey="score" name="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="threshold" name="threshold" fill="var(--color-threshold)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          )}

          {chartType === "line" && (
            <ChartContainer
              config={config}
              className="w-full h-full"
            >
              <LineChart
                data={chartData}
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
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <ChartTooltipContent
                          className="p-2"
                          label={`${data.name}`}
                          payload={payload}
                          formatter={(value, name) => {
                            return [`${value}%`, name === "threshold" ? "Research Threshold" : "Your Score"];
                          }}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Threshold', position: 'right', fill: '#ef4444' }} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="var(--color-score)" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                  name="score"
                />
                <Line 
                  type="monotone" 
                  dataKey="threshold" 
                  stroke="#ef4444" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  name="threshold" 
                />
              </LineChart>
            </ChartContainer>
          )}

          {chartType === "area" && (
            <ChartContainer
              config={config}
              className="w-full h-full"
            >
              <AreaChart
                data={chartData}
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
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <ChartTooltipContent
                          className="p-2"
                          label={`${data.name}`}
                          payload={payload}
                          formatter={(value, name) => {
                            return [`${value}%`, name === "threshold" ? "Research Threshold" : "Your Score"];
                          }}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Threshold', position: 'right', fill: '#ef4444' }} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="var(--color-score)"
                  fill="var(--color-area)"
                  name="score"
                />
                <Line
                  type="monotone"
                  dataKey="threshold"
                  stroke="#ef4444"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  name="threshold"
                />
              </AreaChart>
            </ChartContainer>
          )}

          {chartType === "radar" && (
            <ChartContainer
              config={config}
              className="w-full h-full"
            >
              <RadarChart 
                outerRadius={130} 
                width={730} 
                height={350}
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <ChartTooltipContent
                          className="p-2"
                          label={`${data.name}`}
                          payload={payload}
                          formatter={(value, name) => {
                            return [`${value}%`, name === "threshold" ? "Research Threshold" : "Your Score"];
                          }}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Radar 
                  name="score" 
                  dataKey="score" 
                  stroke="var(--color-score)" 
                  fill="var(--color-area)" 
                  fillOpacity={0.6} 
                />
                <Radar 
                  name="threshold" 
                  dataKey="threshold" 
                  stroke="#ef4444" 
                  fill="#ef444433" 
                  fillOpacity={0.2}
                  strokeDasharray="5 5"
                />
                <Legend />
              </RadarChart>
            </ChartContainer>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-dyslexai-blue-700 mb-2 flex items-center">
              <InfoCircle className="h-4 w-4 mr-2" />
              Understanding Your Chart
            </h4>
            <p className="text-sm text-gray-600">
              This chart compares your performance across different cognitive areas assessed. 
              Scores above the red threshold line (70%) indicate stronger performance in those areas. 
              Areas falling below the threshold may indicate challenges that are worth exploring further.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-dyslexai-blue-700 mb-2">Research Background</h4>
            <p className="text-sm text-gray-600">
              The 70% threshold is based on research by Shaywitz et al. (2008), Willcutt et al. (2005), and Norton & Wolf (2012). 
              Performance below this threshold is associated with patterns seen in individuals with dyslexia and related learning differences.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-dyslexai-blue-700 mb-2">Score Interpretation</h4>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li><strong>80-100%:</strong> Strong performance, typical development</li>
              <li><strong>70-79%:</strong> Borderline performance, monitor development</li>
              <li><strong>60-69%:</strong> Some challenges present, may benefit from support</li>
              <li><strong>Below 60%:</strong> Significant challenges, consider additional assessment</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartsTab;
