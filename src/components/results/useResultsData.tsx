
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

export const useResultsData = () => {
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

  const calculateAverageScore = () => {
    const scores = Object.values(testResults);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const getRecommendations = () => {
    const avgScore = calculateAverageScore();
    
    const baseRecommendations = [
      "Continue to practice reading regularly with materials at an appropriate level.",
      "Use assistive technologies like text-to-speech when needed for longer reading assignments.",
      "Break complex tasks into smaller, manageable steps."
    ];
    
    if (avgScore < 60) {
      return [
        "Consider a comprehensive evaluation with an educational psychologist specializing in dyslexia.",
        "Explore structured literacy programs that use multisensory approaches (Orton-Gillingham, Wilson, etc.).",
        "Discuss potential accommodations with teachers/schools.",
        ...baseRecommendations
      ];
    } else if (avgScore < 75) {
      return [
        "Consider a follow-up screening with a learning specialist to further assess potential challenges.",
        "Focus on strengthening phonological awareness through specific exercises.",
        "Practice memory-building activities to support learning.",
        ...baseRecommendations
      ];
    } else {
      return [
        "Continue monitoring reading progress through regular practice.",
        "Maintain a diverse reading diet to build vocabulary and comprehension.",
        "Consider strengths-based approaches to learning.",
        ...baseRecommendations
      ];
    }
  };

  const generateChartData = () => {
    const data = [];
    
    if (testResults.phonological !== undefined) {
      data.push({
        name: "Phonological",
        score: testResults.phonological,
        threshold: 70
      });
    }
    
    if (testResults.workingMemory !== undefined) {
      data.push({
        name: "Working Memory",
        score: testResults.workingMemory,
        threshold: 70
      });
    }
    
    if (testResults.processingSpeed !== undefined) {
      data.push({
        name: "Processing",
        score: testResults.processingSpeed,
        threshold: 70
      });
    }
    
    if (testResults.ran !== undefined) {
      data.push({
        name: "RAN",
        score: testResults.ran,
        threshold: 70
      });
    }
    
    if (handwritingResults?.overallScore !== undefined) {
      data.push({
        name: "Handwriting",
        score: handwritingResults.overallScore,
        threshold: 70
      });
    }
    
    if (testResults.audioDiscrimination !== undefined) {
      data.push({
        name: "Audio",
        score: testResults.audioDiscrimination,
        threshold: 70
      });
    }
    
    if (testResults.directionSense !== undefined) {
      data.push({
        name: "Direction",
        score: testResults.directionSense,
        threshold: 70
      });
    }

    if (checklistResults?.score !== undefined) {
      data.push({
        name: "Checklist",
        score: checklistResults.score,
        threshold: 70
      });
    }
    
    return data;
  };

  const getMostRecentTestDate = () => {
    if (Object.keys(testDates).length === 0) {
      return new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    const dates = Object.values(testDates).map(dateStr => new Date(dateStr));
    const mostRecent = new Date(Math.max(...dates.map(date => date.getTime())));
    
    return mostRecent.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return {
    testResults,
    userData,
    testDates,
    checklistResults,
    handwritingResults,
    calculateAverageScore,
    getRecommendations,
    generateChartData,
    getMostRecentTestDate
  };
};
