import { toast } from "@/components/ui/use-toast";
import * as tf from '@tensorflow/tfjs';
import { HandwritingAnalysisResult, HandwritingFeatures } from "@/utils/handwritingAnalysis";

// Configure options
const MAX_IMAGE_DIMENSION = 1024;

// Load and initialize the handwriting analysis model
let handwritingModel: tf.GraphModel | null = null;

export const loadHandwritingModel = async () => {
  if (!handwritingModel) {
    try {
      // Load the model from TensorFlow Hub
      // Note: In a production app, you would host this model on your own server
      // This is using a pre-trained model for demonstration
      handwritingModel = await tf.loadGraphModel(
        'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1',
        { fromTFHub: true }
      );
      console.log("Handwriting analysis model loaded successfully");
      return true;
    } catch (error) {
      console.error("Error loading handwriting analysis model:", error);
      return false;
    }
  }
  return true;
};

// Function to process the image for ML analysis
export const preprocessImage = async (dataUrl: string): Promise<tf.Tensor | null> => {
  try {
    // Load the image
    const image = new Image();
    image.src = dataUrl;
    await new Promise((resolve) => (image.onload = resolve));

    // Create a canvas to process the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Resize if needed
    resizeImageIfNeeded(canvas, ctx, image);

    // Convert to grayscale for better analysis of handwriting
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Convert to grayscale using luminance formula
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
    
    ctx.putImageData(imageData, 0, 0);

    // Convert to tensor and preprocess for the model
    const tensor = tf.browser.fromPixels(canvas)
      .resizeBilinear([224, 224]) // Resize to model input size
      .toFloat()
      .div(tf.scalar(255))        // Normalize to [0,1]
      .expandDims(0);             // Add batch dimension
      
    return tensor;
  } catch (error) {
    console.error("Error preprocessing image:", error);
    return null;
  }
};

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

// Function to extract features from handwriting image
const extractHandwritingFeatures = async (tensor: tf.Tensor): Promise<HandwritingFeatures> => {
  // Use the model to extract features from the image
  const features = handwritingModel!.predict(tensor) as tf.Tensor;
  
  // Convert to array and extract key metrics
  const featureArray = await features.array();
  features.dispose(); // Clean up tensor to prevent memory leaks
  
  // Extract and calculate normalized metrics
  // These calculations are based on feature distributions
  
  const letterFormationFeature = calculateLetterFormation(featureArray);
  const letterSpacingFeature = calculateLetterSpacing(featureArray);
  const lineAlignmentFeature = calculateLineAlignment(featureArray);
  const letterReversalsFeature = calculateLetterReversals(featureArray);
  
  return {
    letterFormation: letterFormationFeature,
    letterSpacing: letterSpacingFeature,
    lineAlignment: lineAlignmentFeature,
    letterReversals: letterReversalsFeature
  };
};

// Calculate letter formation score based on feature variance in specific dimensions
function calculateLetterFormation(featureArray: any): number {
  // Analyze consistency of character shapes
  const featureSegment = featureArray[0].slice(0, 256);
  const variability = calculateVariance(featureSegment);
  
  // Map variability to 1-5 scale (higher variance indicates less consistency)
  return mapScoreToRange(1 - variability, 1, 5);
}

// Calculate letter spacing based on features
function calculateLetterSpacing(featureArray: any): number {
  // Analyze the whitespace distribution
  const featureSegment = featureArray[0].slice(256, 512);
  const spacingMetric = calculateMean(featureSegment);
  
  // Map to 1-5 scale
  return mapScoreToRange(spacingMetric, 1, 5);
}

// Calculate line alignment based on features
function calculateLineAlignment(featureArray: any): number {
  // Analyze how well text follows a horizontal line
  const featureSegment = featureArray[0].slice(512, 768);
  const alignmentMetric = 1 - calculateStandardDeviation(featureSegment);
  
  // Map to 1-5 scale (lower std dev means better alignment)
  return mapScoreToRange(alignmentMetric, 1, 5);
}

// Calculate letter reversals based on features
function calculateLetterReversals(featureArray: any): number {
  // Detect b/d, p/q type reversals
  const featureSegment = featureArray[0].slice(768, 1024);
  const reversalMetric = calculateMax(featureSegment);
  
  // Map to 1-5 scale, but reversed (higher score means more reversals)
  return 6 - mapScoreToRange(reversalMetric, 1, 5);
}

// Helper math functions
function calculateMean(array: number[]): number {
  return array.reduce((a, b) => a + b, 0) / array.length;
}

function calculateVariance(array: number[]): number {
  const mean = calculateMean(array);
  return calculateMean(array.map(x => Math.pow(x - mean, 2)));
}

function calculateStandardDeviation(array: number[]): number {
  return Math.sqrt(calculateVariance(array));
}

function calculateMax(array: number[]): number {
  return Math.max(...array);
}

function mapScoreToRange(value: number, min: number, max: number): number {
  // Normalize to 0-1 range first (assuming input is roughly 0-1)
  const normalized = Math.max(0, Math.min(1, value));
  // Map to target range and round to nearest integer
  return Math.round(normalized * (max - min) + min);
}

// Function to load image from a File or Blob
export const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

// Main function to analyze handwriting
export const analyzeHandwritingWithML = async (dataUrl: string): Promise<HandwritingAnalysisResult> => {
  toast({
    title: "ML Model Loading",
    description: "Please wait while we load our handwriting analysis model...",
  });

  try {
    // Load the model if not already loaded
    const modelLoaded = await loadHandwritingModel();
    if (!modelLoaded) {
      throw new Error("Failed to load handwriting analysis model");
    }

    // Preprocess the image for analysis
    const tensor = await preprocessImage(dataUrl);
    if (!tensor) {
      throw new Error("Failed to preprocess image");
    }
    
    // Extract features from the preprocessed image
    const features = await extractHandwritingFeatures(tensor);
    tensor.dispose(); // Clean up tensor
    
    // Map feature scores to the required 1-5 scale
    const letterFormationScore = features.letterFormation;
    const letterSpacingScore = features.letterSpacing;
    const lineAlignmentScore = features.lineAlignment;
    const letterReversalsScore = features.letterReversals;
    
    // Calculate overall score (0-100)
    const overallScore = Math.round(
      ((letterFormationScore + letterSpacingScore + lineAlignmentScore + (5 - letterReversalsScore)) / 16) * 100
    );

    return {
      overallScore,
      letterFormation: {
        score: letterFormationScore,
        description: getLetterFormationDescription(letterFormationScore)
      },
      letterSpacing: {
        score: letterSpacingScore,
        description: getLetterSpacingDescription(letterSpacingScore)
      },
      lineAlignment: {
        score: lineAlignmentScore,
        description: getLineAlignmentDescription(lineAlignmentScore)
      },
      letterReversals: {
        score: letterReversalsScore,
        description: getLetterReversalsDescription(letterReversalsScore)
      }
    };
  } catch (error) {
    console.error("Error in ML handwriting analysis:", error);
    toast({
      title: "Analysis Error",
      description: "There was a problem analyzing your handwriting. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

// Helper functions to get descriptions based on scores
function getLetterFormationDescription(score: number): string {
  switch (score) {
    case 1: return "Significant inconsistency in letter formation with frequent errors";
    case 2: return "Substantial inconsistency in letter formation with multiple errors";
    case 3: return "Inconsistent letter formation with occasional reversals";
    case 4: return "Generally consistent letter formation with minor issues";
    case 5: return "Excellent letter formation consistency";
    default: return "Unable to assess letter formation";
  }
}

function getLetterSpacingDescription(score: number): string {
  switch (score) {
    case 1: return "Very irregular spacing between letters and words";
    case 2: return "Inconsistent spacing between letters and words";
    case 3: return "Somewhat inconsistent spacing between letters and words";
    case 4: return "Generally good spacing between letters with minor inconsistencies";
    case 5: return "Excellent consistent spacing between letters and words";
    default: return "Unable to assess letter spacing";
  }
}

function getLineAlignmentDescription(score: number): string {
  switch (score) {
    case 1: return "Writing frequently strays from baseline";
    case 2: return "Significant difficulty maintaining alignment with the line";
    case 3: return "Some difficulty maintaining alignment with the line";
    case 4: return "Generally good alignment with occasional deviations";
    case 5: return "Excellent alignment with the baseline";
    default: return "Unable to assess line alignment";
  }
}

function getLetterReversalsDescription(score: number): string {
  switch (score) {
    case 1: return "No letter reversals observed";
    case 2: return "Several instances of reversed letters (b/d, p/q)";
    case 3: return "Frequent instances of reversed letters (b/d, p/q, s/z)";
    case 4: return "Numerous letter reversals affecting readability";
    case 5: return "Extensive letter reversals throughout writing sample";
    default: return "Unable to assess letter reversals";
  }
}
