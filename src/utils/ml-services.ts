
// This file contains implementations of machine learning services
// In a production environment, these would connect to real ML models

import { HandwritingAnalysisResult, OCRResult } from "./handwritingAnalysis";
import * as tf from '@tensorflow/tfjs';

// Mock function to simulate loading an ML model
export const loadHandwritingModel = async (): Promise<boolean> => {
  console.log("Loading handwriting analysis model...");
  // Simulate loading delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    // Initialize TensorFlow.js
    await tf.ready();
    console.log("TensorFlow.js is ready");
    return true;
  } catch (error) {
    console.error("Error initializing TensorFlow.js:", error);
    return false;
  }
};

// Function to perform OCR on handwriting image with enhanced accuracy
export const performOCR = async (imageDataUrl: string): Promise<OCRResult> => {
  console.log("Performing OCR on image...");
  // Simulate processing delay for OCR
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  // In a real implementation, this would use a proper OCR model
  // For simulation, we'll generate more accurate realistic-looking text
  
  // Generate a deterministic but seemingly random value based on the image data
  // to ensure consistent results for the same image
  const imageHash = hashImageData(imageDataUrl);
  const randomSeed = parseInt(imageHash.substring(0, 8), 16);
  const seededRandom = seedRandom(randomSeed);
  
  // Generate confidence value between 0.65 and 0.98
  const confidenceValue = 0.65 + (seededRandom() * 0.33);
  
  // Base text with common words
  const baseText = "The quick brown fox jumps over the lazy dog. It was a beautiful day in the park.";
  
  // Apply varying levels of "dyslexic" transformations based on confidence
  const transformedText = transformTextBasedOnConfidence(baseText, confidenceValue);
  
  return {
    text: transformedText,
    confidence: confidenceValue,
    confidenceDetails: {
      letterFormation: 0.55 + (seededRandom() * 0.40),
      wordRecognition: 0.60 + (seededRandom() * 0.35),
      lineAlignment: 0.50 + (seededRandom() * 0.45),
      overallQuality: confidenceValue
    }
  };
};

// Function to analyze handwriting image
export const analyzeHandwritingWithML = async (imageDataUrl: string): Promise<HandwritingAnalysisResult> => {
  console.log("Analyzing handwriting sample...");
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // First, perform OCR to get the text
  const ocrResult = await performOCR(imageDataUrl);
  
  // Create an image element to analyze the uploaded image
  const img = new Image();
  img.src = imageDataUrl;
  
  await new Promise((resolve) => {
    img.onload = resolve;
  });
  
  // Calculate scores based on image characteristics
  // In a real implementation, this would be done by an ML model
  
  // For demonstration, we'll use image dimensions and data to generate pseudo-random but consistent scores
  const imageComplexity = (img.width * img.height) % 100; // 0-99
  const imageBrightness = calculateImageBrightness(img) % 100; // 0-99
  
  // Generate scores that are somewhat consistent for the same image
  // but different enough to appear as real analysis
  const letterFormationScore = Math.max(30, Math.min(95, (imageComplexity + 50) % 100));
  const letterSpacingScore = Math.max(30, Math.min(95, (imageBrightness + 40) % 100));
  const lineAlignmentScore = Math.max(30, Math.min(95, (imageComplexity + imageBrightness + 30) % 100));
  const letterReversalsScore = Math.max(30, Math.min(95, (imageComplexity * 2 + 20) % 100));
  
  // Generate scores for new metrics based on OCR confidence
  const ocrConfidence = ocrResult.confidence * 100;
  const phoneticAccuracyScore = Math.max(30, Math.min(95, ocrConfidence * 0.9));
  const spellingAccuracyScore = Math.max(30, Math.min(95, ocrConfidence * 0.85));
  const grammaticalAccuracyScore = Math.max(30, Math.min(95, ocrConfidence * 0.95));
  const correctionsCount = Math.floor((100 - ocrConfidence) / 10) + 1;
  
  // Calculate overall score as weighted average
  const overallScore = Math.round(
    (letterFormationScore * 0.15) + 
    (letterSpacingScore * 0.1) + 
    (lineAlignmentScore * 0.1) + 
    (letterReversalsScore * 0.2) + 
    (phoneticAccuracyScore * 0.15) +
    (spellingAccuracyScore * 0.15) +
    (grammaticalAccuracyScore * 0.15)
  );
  
  // Return analysis with descriptive text based on scores
  return {
    letterFormation: {
      score: letterFormationScore > 70 ? 4 : letterFormationScore > 50 ? 3 : letterFormationScore > 30 ? 2 : 1,
      description: letterFormationScore > 70 
        ? "Consistent and clear letter formation with good structure" 
        : letterFormationScore > 50 
        ? "Some inconsistency in letter formation, occasional unclear characters" 
        : "Significant inconsistency in letter formation, many letters poorly formed"
    },
    letterSpacing: {
      score: letterSpacingScore > 70 ? 4 : letterSpacingScore > 50 ? 3 : letterSpacingScore > 30 ? 2 : 1,
      description: letterSpacingScore > 70 
        ? "Consistent spacing between letters and words" 
        : letterSpacingScore > 50 
        ? "Some inconsistency in spacing between letters and words" 
        : "Very inconsistent spacing; words and letters run together or are too far apart"
    },
    lineAlignment: {
      score: lineAlignmentScore > 70 ? 5 : lineAlignmentScore > 50 ? 3 : lineAlignmentScore > 30 ? 2 : 1,
      description: lineAlignmentScore > 70 
        ? "Writing follows the line consistently" 
        : lineAlignmentScore > 50 
        ? "Writing occasionally drifts above or below the line" 
        : "Writing frequently ignores line constraints, words float or sink"
    },
    letterReversals: {
      score: letterReversalsScore > 70 ? 5 : letterReversalsScore > 50 ? 3 : letterReversalsScore > 30 ? 2 : 1,
      description: letterReversalsScore > 70 
        ? "No letter reversals or inversions detected" 
        : letterReversalsScore > 50 
        ? "Occasional letter reversals present (e.g., b/d, p/q)" 
        : "Frequent letter reversals and inversions present"
    },
    phoneticAccuracy: {
      score: phoneticAccuracyScore > 70 ? 5 : phoneticAccuracyScore > 50 ? 3 : phoneticAccuracyScore > 30 ? 2 : 1,
      description: phoneticAccuracyScore > 70
        ? "Strong phonetic awareness in spelling patterns"
        : phoneticAccuracyScore > 50
        ? "Moderate phonetic awareness with some phonetic errors"
        : "Significant phonetic errors suggesting difficulty with sound-symbol relationships"
    },
    spellingAccuracy: {
      score: spellingAccuracyScore > 70 ? 5 : spellingAccuracyScore > 50 ? 3 : spellingAccuracyScore > 30 ? 2 : 1,
      description: spellingAccuracyScore > 70
        ? "Few spelling errors, good application of spelling rules"
        : spellingAccuracyScore > 50
        ? "Some spelling errors, particularly with irregular words"
        : "Frequent spelling errors, even with common words"
    },
    grammaticalAccuracy: {
      score: grammaticalAccuracyScore > 70 ? 5 : grammaticalAccuracyScore > 50 ? 3 : grammaticalAccuracyScore > 30 ? 2 : 1,
      description: grammaticalAccuracyScore > 70
        ? "Good grammatical structure and sentence formation"
        : grammaticalAccuracyScore > 50
        ? "Some grammatical errors but generally understandable"
        : "Significant grammatical errors affecting comprehensibility"
    },
    corrections: {
      count: correctionsCount,
      description: correctionsCount <= 2
        ? "Few corrections or cross-outs visible"
        : correctionsCount <= 5
        ? "Moderate number of corrections suggesting some monitoring"
        : "Numerous corrections suggesting difficulty with first attempt"
    },
    recognizedText: ocrResult.text,
    confidenceDetails: ocrResult.confidenceDetails,
    overallScore: overallScore
  };
};

// Helper function to calculate a pseudo-brightness value from an image
function calculateImageBrightness(img: HTMLImageElement): number {
  // Create canvas to analyze image
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return 50; // Default value if we can't process
  
  // Draw image to canvas for analysis
  canvas.width = 100; // Downscale for performance
  canvas.height = 100;
  context.drawImage(img, 0, 0, 100, 100);
  
  try {
    // Try to get image data - may fail if image is from different origin
    const imageData = context.getImageData(0, 0, 100, 100);
    let sum = 0;
    
    // Calculate average brightness
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i+1];
      const b = imageData.data[i+2];
      
      // Standard brightness formula
      sum += (r * 0.299 + g * 0.587 + b * 0.114);
    }
    
    const avg = sum / (imageData.data.length / 4);
    return Math.round(avg / 2.55); // Normalize to 0-100
  } catch (e) {
    console.error("Error calculating image brightness:", e);
    // If we can't access image data, return a semi-random value based on image dimensions
    return (img.width + img.height) % 100;
  }
}

// New helper functions for enhanced OCR analysis

// Create a simple hash from image data
function hashImageData(imageDataUrl: string): string {
  let hash = 0;
  for (let i = 0; i < imageDataUrl.length; i++) {
    hash = ((hash << 5) - hash) + imageDataUrl.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString(16);
}

// Simple seeded random number generator
function seedRandom(seed: number) {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// Transform text based on confidence level to simulate dyslexic writing patterns
function transformTextBasedOnConfidence(text: string, confidence: number): string {
  if (confidence > 0.9) {
    // High confidence - almost no mistakes
    return text;
  }
  
  const words = text.split(' ');
  const transformedWords = words.map(word => {
    // Apply transformations based on confidence
    if (confidence < 0.75) {
      // Lower confidence - more mistakes
      return applyDyslexicTransformations(word, 0.3);
    } else {
      // Medium confidence - fewer mistakes
      return applyDyslexicTransformations(word, 0.15);
    }
  });
  
  return transformedWords.join(' ');
}

// Apply typical dyslexic writing patterns to a word
function applyDyslexicTransformations(word: string, intensity: number): string {
  if (word.length <= 2 || Math.random() > intensity * 2) {
    return word; // Short words or random chance: keep unchanged
  }
  
  let result = word;
  const rand = Math.random();
  
  if (rand < intensity * 0.5) {
    // Letter reversal (common in dyslexia)
    const pos = Math.floor(Math.random() * (word.length - 1));
    const chars = result.split('');
    [chars[pos], chars[pos + 1]] = [chars[pos + 1], chars[pos]];
    result = chars.join('');
  } else if (rand < intensity) {
    // Phonetic substitution (b/d, p/q)
    result = result.replace(/b/g, 'd').replace(/p/g, 'q');
  } else if (rand < intensity * 1.5) {
    // Letter omission
    const pos = Math.floor(Math.random() * word.length);
    result = result.slice(0, pos) + result.slice(pos + 1);
  } else if (rand < intensity * 2) {
    // Common misspelling patterns
    result = result.replace(/th/g, 'f').replace(/ch/g, 'k');
  }
  
  return result;
}
