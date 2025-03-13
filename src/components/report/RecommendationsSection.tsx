
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RecommendationsSectionProps {
  recommendations: string[];
}

const RecommendationsSection = ({ recommendations }: RecommendationsSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle>Recommendations</CardTitle>
        <CardDescription>Next steps and suggested resources</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="text-gray-700">{recommendation}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecommendationsSection;
