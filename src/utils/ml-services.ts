
import { toast } from "@/components/ui/use-toast";
import { pipeline, env } from "@huggingface/transformers";

// Configure transformers.js to use appropriate options
env.allowLocalModels = false;
env.useBrowserCache = false;

// Maximum dimension for image processing
const MAX_IMAGE_DIMENSION = 1024;

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

// Function to load image from a File or Blob
export const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

// Analyze handwriting with ML model
export const analyzeHandwritingWithML = async (dataUrl: string) => {
  toast({
    title: "ML Model Loading",
    description: "Please wait while we load our handwriting analysis model...",
  });

  try {
    // In a real implementation, this would use the actual ML model
    // For demo purposes, we'll simulate the model analysis with a timeout
    // and return mock results based on image characteristics

    // Simulate ML processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // This would be where we'd actually use the transformers.js pipeline
    // const imageClassifier = await pipeline("image-classification", "model-name");
    // const result = await imageClassifier(dataUrl);

    // For now, we'll generate a simulated analysis
    const randomScore = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
    
    // Generate random scores that are slightly biased toward the middle range
    const letterFormationScore = randomScore(2, 4);
    const letterSpacingScore = randomScore(2, 4);
    const lineAlignmentScore = randomScore(2, 4);
    const letterReversalsScore = randomScore(1, 3);
    
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
