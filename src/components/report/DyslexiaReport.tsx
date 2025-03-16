
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

    // Enhanced PDF options for professional look
    const opt = {
      margin: [15, 15, 15, 15], // Increased margins
      filename: `dyslexia-report-${userData.name.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 1.0 }, // Increased image quality
      html2canvas: { scale: 2.5, useCORS: true, letterRendering: true }, // Improved rendering
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true, // Better compression
        precision: 16 // Higher precision
      },
      pagebreak: { mode: 'avoid-all', before: '.page-break' } // Better page breaks
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
      
      <div ref={reportRef} className="p-6 max-w-4xl mx-auto bg-white print:p-0 professional-report">
        <style dangerouslySetInnerHTML={{
          __html: `
            @media print {
              .professional-report {
                font-family: 'Georgia', serif;
                color: #222222;
              }
              .professional-report h1, 
              .professional-report h2, 
              .professional-report h3 {
                color: #403E43;
                font-weight: 600;
              }
              .professional-report table {
                border-collapse: collapse;
                width: 100%;
              }
              .professional-report th {
                background-color: #F6F6F7;
                color: #221F26;
                text-align: left;
                padding: 12px;
                border: 1px solid #C8C8C9;
              }
              .professional-report td {
                padding: 10px;
                border: 1px solid #C8C8C9;
              }
              .professional-report tr:nth-child(even) {
                background-color: #F1F1F1;
              }
              .page-break {
                page-break-after: always;
              }
            }
          `
        }} />
        
        <ReportHeading userData={userData} />
        
        <AssessmentSummary 
          riskLevel={riskLevel}
          riskDescription={riskDescription}
          testResults={testResults}
          checklistDetails={checklistDetails}
          handwritingDetails={handwritingDetails}
        />
        
        <div className="page-break"></div>
        
        <TestResultsSection testResults={testResults} />
        
        <RecommendationsSection recommendations={recommendations} />
        
        <ReportFooter />
      </div>
    </div>
  );
};

export default DyslexiaReport;
