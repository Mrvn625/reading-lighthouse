
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { useToast } from "@/components/ui/use-toast";
import ReportHeader from "./ReportHeader";
import ReportHeading from "./ReportHeading";
import AssessmentSummary from "./AssessmentSummary";
import TestResultsSection from "./TestResultsSection";
import RecommendationsSection from "./RecommendationsSection";
import ReportFooter from "./ReportFooter";
import { useRiskAssessment } from "./useRiskAssessment";

export interface ReportProps {
  userData: {
    name: string;
    age?: number;
    date: string;
    email?: string;
    school?: string;
    grade?: string;
    testDate?: string;
  };
  testResults: {
    phonological?: number;
    workingMemory?: number;
    processingSpeed?: number;
    ran?: number;
    handwriting?: number;
    audioDiscrimination?: number;
    directionSense?: number;
  };
  recommendations: string[];
  handwritingDetails?: any;
  checklistDetails?: any;
}

const DyslexiaReport = ({ userData, testResults, recommendations, handwritingDetails, checklistDetails }: ReportProps) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { riskLevel, riskDescription } = useRiskAssessment(testResults);

  const handleDownloadPdf = () => {
    if (!reportRef.current) return;
    
    toast({
      title: "Generating PDF",
      description: "Your report is being generated...",
    });

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `dyslexia-report-${userData.name.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(reportRef.current).save().then(() => {
      toast({
        title: "PDF Downloaded",
        description: "Your report has been downloaded successfully",
      });
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <ReportHeader onPrint={handlePrint} onDownloadPdf={handleDownloadPdf} />
      
      <div ref={reportRef} className="p-6 max-w-4xl mx-auto bg-white print:p-0">
        <ReportHeading userData={userData} />
        
        <AssessmentSummary 
          riskLevel={riskLevel}
          riskDescription={riskDescription}
          testResults={testResults}
          checklistDetails={checklistDetails}
          handwritingDetails={handwritingDetails}
        />
        
        <TestResultsSection testResults={testResults} />
        
        <RecommendationsSection recommendations={recommendations} />
        
        <ReportFooter />
      </div>
    </div>
  );
};

export default DyslexiaReport;
