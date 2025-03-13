
import React from "react";

interface ReportHeadingProps {
  userData: {
    name: string;
    age?: number;
    date: string;
    email?: string;
    school?: string;
    grade?: string;
    testDate?: string;
  };
}

const ReportHeading = ({ userData }: ReportHeadingProps) => {
  return (
    <>
      <div className="text-center mb-6 border-b pb-4 print:pb-2">
        <h1 className="text-2xl font-bold text-dyslexai-blue-700">DyslexAI Assessment Report</h1>
        <p className="text-gray-500">Confidential Dyslexia Screening Result</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-600">Name: <span className="font-medium">{userData.name}</span></p>
          {userData.age && <p className="text-gray-600">Age: <span className="font-medium">{userData.age} years</span></p>}
          {userData.school && <p className="text-gray-600">School: <span className="font-medium">{userData.school}</span></p>}
          {userData.grade && <p className="text-gray-600">Grade: <span className="font-medium">{userData.grade}</span></p>}
        </div>
        <div className="text-right">
          <p className="text-gray-600">Assessment Date: <span className="font-medium">{userData.testDate || userData.date}</span></p>
          <p className="text-gray-600">Report Created: <span className="font-medium">{userData.date}</span></p>
          <p className="text-gray-600">Report ID: <span className="font-medium">{Math.random().toString(36).substring(2, 10).toUpperCase()}</span></p>
        </div>
      </div>
    </>
  );
};

export default ReportHeading;
