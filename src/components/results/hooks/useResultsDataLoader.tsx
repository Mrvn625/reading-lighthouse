
import { useState, useEffect } from "react";

export interface UserData {
  name: string;
  age?: string;
  email?: string;
  school?: string;
  grade?: string;
  isLoggedIn: boolean;
}

export interface TestResults {
  [key: string]: number;
}

export interface TestDates {
  [key: string]: string;
}

export const useResultsDataLoader = () => {
  const [testResults, setTestResults] = useState<TestResults>({});
  const [userData, setUserData] = useState<UserData>({
    name: "Guest User",
    isLoggedIn: false
  });
  const [testDates, setTestDates] = useState<TestDates>({});
  const [checklistResults, setChecklistResults] = useState<any>(null);
  const [handwritingResults, setHandwritingResults] = useState<any>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem("testResults");
    if (savedResults) {
      setTestResults(JSON.parse(savedResults));
    }
    
    const savedDates = localStorage.getItem("testDates");
    if (savedDates) {
      setTestDates(JSON.parse(savedDates));
    }
    
    const savedUserData = localStorage.getItem("user");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }

    const savedChecklist = localStorage.getItem("checklistResults");
    if (savedChecklist) {
      setChecklistResults(JSON.parse(savedChecklist));
    }

    const savedHandwriting = localStorage.getItem("assessmentResults");
    if (savedHandwriting) {
      const assessmentResults = JSON.parse(savedHandwriting);
      if (assessmentResults.handwriting) {
        setHandwritingResults(assessmentResults.handwriting.result);
      }
    }
  }, []);

  return {
    testResults,
    userData,
    testDates,
    checklistResults,
    handwritingResults
  };
};
