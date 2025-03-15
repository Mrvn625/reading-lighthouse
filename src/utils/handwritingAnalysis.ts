
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
  // New metrics for OCR analysis
  phoneticAccuracy: {
    score: number;
    description: string;
  };
  spellingAccuracy: {
    score: number;
    description: string;
  };
  grammaticalAccuracy: {
    score: number;
    description: string;
  };
  corrections: {
    count: number;
    description: string;
  };
  recognizedText: string;
  confidenceDetails?: {
    letterFormation: number;
    wordRecognition: number;
    lineAlignment: number;
    overallQuality: number;
  };
  overallScore: number;
}

// Feature extraction interfaces
export interface HandwritingFeatures {
  letterFormation: number;
  letterSpacing: number;
  lineAlignment: number;
  letterReversals: number;
  phoneticAccuracy: number;
  spellingAccuracy: number;
  grammaticalAccuracy: number;
  corrections: number;
}

// OCR result interface
export interface OCRResult {
  text: string;
  confidence: number;
  confidenceDetails?: {
    letterFormation: number;
    wordRecognition: number;
    lineAlignment: number;
    overallQuality: number;
  };
}
