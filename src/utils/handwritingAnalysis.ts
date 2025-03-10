
/**
 * Type definitions and interfaces for handwriting analysis 
 * These are used by the TensorFlow.js implementation in ml-services.ts
 */

// Types for handwriting analysis results
export interface HandwritingAnalysisResult {
  letterFormation: {
    score: number;
    description: string;
  };
  letterSpacing: {
    score: number;
    description: string;
  };
  lineAlignment: {
    score: number;
    description: string;
  };
  letterReversals: {
    score: number;
    description: string;
  };
  overallScore: number;
}

// Feature extraction interfaces
export interface HandwritingFeatures {
  letterFormation: number;
  letterSpacing: number;
  lineAlignment: number;
  letterReversals: number;
}
