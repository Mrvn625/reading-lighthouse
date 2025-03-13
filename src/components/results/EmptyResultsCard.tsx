
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EmptyResultsCard = () => {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <h3 className="text-xl font-bold mb-4">No Test Results Available</h3>
        <p className="mb-6">You haven't completed any assessments yet. Complete at least one test to see your results.</p>
        <Link to="/cognitive-tests">
          <Button className="dyslexai-btn-primary">Take Tests Now</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EmptyResultsCard;
