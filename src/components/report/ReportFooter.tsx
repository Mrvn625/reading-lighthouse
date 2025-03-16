
import React from "react";

const ReportFooter = () => {
  return (
    <div className="text-sm text-gray-500 mt-10 border-t pt-4 print:mt-4 print:pt-2">
      <p>This report is generated by DyslexAI as a preliminary screening tool and is not a formal diagnosis. For a comprehensive evaluation, please consult with a qualified educational psychologist or specialist.</p>
      
      <div className="mt-3 p-3 bg-gray-50 rounded-md">
        <h4 className="font-medium text-gray-700 mb-1">Understanding Dyslexia</h4>
        <p className="mb-2">Dyslexia is a language-based learning difficulty that affects 1 in 5 people. It primarily impacts reading, writing, and spelling skills but is not related to intelligence.</p>
        <p>Early intervention is key - research shows that structured, multisensory instruction is most effective for dyslexic learners.</p>
        <p className="mt-2 text-xs italic">Source: Adapted from materials by Nessy Learning and International Dyslexia Association</p>
      </div>
      
      <p className="mt-3">© {new Date().getFullYear()} DyslexAI - All Rights Reserved</p>
    </div>
  );
};

export default ReportFooter;
