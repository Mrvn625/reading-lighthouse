
/**
 * Type definitions and interfaces for handwriting analysis 
 * These are used by the TensorFlow.js implementation in ml-services.ts
 */

// Types for handwriting analysis results
export interface HandwritingAnalysisResult {
  // Text analysis metrics only
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
    wordRecognition: number;
    overallQuality: number;
  };
  overallScore: number;
}

// Feature extraction interfaces
export interface HandwritingFeatures {
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
    wordRecognition: number;
    overallQuality: number;
  };
}
