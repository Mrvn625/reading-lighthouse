
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ScienceCardProps = {
  title: string;
  description: string;
  research: string;
};

const ScienceCard = ({ title, description, research }: ScienceCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-dyslexai-blue-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{description}</p>
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-600 italic">{research}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScienceCard;
