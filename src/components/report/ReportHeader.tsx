
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

interface ReportHeaderProps {
  onPrint: () => void;
  onDownloadPdf: () => void;
}

const ReportHeader = ({ onPrint, onDownloadPdf }: ReportHeaderProps) => {
  return (
    <div className="print:hidden flex justify-end space-x-2 mb-4">
      <Button variant="outline" onClick={onPrint}>
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
      <Button onClick={onDownloadPdf}>
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
    </div>
  );
};

export default ReportHeader;
