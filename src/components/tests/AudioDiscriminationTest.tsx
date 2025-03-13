
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Play, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AudioTestQuestion {
  id: number;
  firstSound: string;
  secondSound: string;
  areSame: boolean;
  audioFiles: string[];
}

// Sample questions with different phonemes that are challenging for people with dyslexia
const audioQuestions: AudioTestQuestion[] = [
  {
    id: 1,
    firstSound: "ba",
    secondSound: "da",
    areSame: false,
    audioFiles: ["/audio/ba.mp3", "/audio/da.mp3"]
  },
  {
    id: 2,
    firstSound: "pa",
    secondSound: "pa",
    areSame: true,
    audioFiles: ["/audio/pa.mp3", "/audio/pa.mp3"]
  },
  {
    id: 3,
    firstSound: "ta",
    secondSound: "ka",
    areSame: false,
    audioFiles: ["/audio/ta.mp3", "/audio/ka.mp3"]
  },
  {
    id: 4,
    firstSound: "ga",
    secondSound: "ga",
    areSame: true,
    audioFiles: ["/audio/ga.mp3", "/audio/ga.mp3"]
  },
  {
    id: 5,
    firstSound: "ma",
    secondSound: "na",
    areSame: false,
    audioFiles: ["/audio/ma.mp3", "/audio/na.mp3"]
  }
];

interface AudioDiscriminationTestProps {
  onComplete: (score: number) => void;
}

const AudioDiscriminationTest: React.FC<AudioDiscriminationTestProps> = ({ onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleStartTest = () => {
    setShowIntro(false);
  };

  const playAudio = (index: number) => {
    // Create audio context on first user interaction
    if (!window.AudioContext && !window.webkitAudioContext) {
      console.error("Web Audio API not supported in this browser");
    }
    
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      audioRef.current.onplay = () => {
        setIsPlaying(true);
        setPlayingIndex(index);
      };
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setPlayingIndex(null);
      };
      
      audioRef.current.onerror = () => {
        console.error("Error playing audio");
        setIsPlaying(false);
        setPlayingIndex(null);
        
        // Fall back to text-to-speech if audio file fails
        useTTSFallback(index);
      };
    }
    
    try {
      audioRef.current.src = audioQuestions[currentQuestionIndex].audioFiles[index];
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio play failed:", error);
          // Fall back to text-to-speech
          useTTSFallback(index);
        });
      }
    } catch (error) {
      console.error("Error setting up audio:", error);
      useTTSFallback(index);
    }
  };
  
  const useTTSFallback = (index: number) => {
    const sound = index === 0 ? 
      audioQuestions[currentQuestionIndex].firstSound : 
      audioQuestions[currentQuestionIndex].secondSound;
      
    // Use speech synthesis API as fallback
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(sound);
      utterance.rate = 0.8; // Slightly slower for clarity
      utterance.pitch = 1.2; // Slightly higher pitch for better phoneme distinction
      
      speechSynthesis.speak(utterance);
      
      setIsPlaying(true);
      setPlayingIndex(index);
      
      utterance.onend = () => {
        setIsPlaying(false);
        setPlayingIndex(null);
      };
    } else {
      // If speech synthesis is not available, show toast
      toast({
        title: "Playing Sound",
        description: `The sound is "${sound}"`,
      });
      
      setIsPlaying(true);
      setPlayingIndex(index);
      
      setTimeout(() => {
        setIsPlaying(false);
        setPlayingIndex(null);
      }, 1000);
    }
  };

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < audioQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore(newAnswers);
    }
  };

  const calculateScore = (finalAnswers: boolean[]) => {
    let correctCount = 0;
    
    audioQuestions.forEach((question, index) => {
      if (finalAnswers[index] === question.areSame) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / audioQuestions.length) * 100);
    onComplete(score);
  };

  if (showIntro) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Audio Discrimination Test</h2>
          
          <div className="mb-6">
            <p className="mb-4">
              This test assesses your ability to distinguish between similar sounds, which is an important skill for reading and phonological processing.
            </p>
            
            <div className="bg-dyslexai-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-dyslexai-blue-700 mb-2">Instructions:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>You will hear two sounds played one after the other.</li>
                <li>Listen carefully to determine if the sounds are the same or different.</li>
                <li>Click "Same" if the sounds are identical or "Different" if they are not.</li>
                <li>There are {audioQuestions.length} questions in total.</li>
              </ol>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 flex items-center">
                <Volume2 className="mr-2 h-4 w-4" />
                Please make sure your sound is turned on and at a comfortable volume.
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleStartTest} 
            className="w-full dyslexai-btn-primary"
          >
            Start Test
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Hidden audio element for playing sounds
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            Question {currentQuestionIndex + 1} of {audioQuestions.length}
          </h2>
          
          <p className="mb-6 text-center">
            Listen to both sounds and decide if they are the same or different.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button
              onClick={() => playAudio(0)}
              className="h-24 text-lg"
              variant="outline"
              disabled={isPlaying}
            >
              {playingIndex === 0 ? (
                <Volume2 className="mr-2 h-6 w-6 animate-pulse" />
              ) : (
                <Play className="mr-2 h-6 w-6" />
              )}
              Sound 1
            </Button>
            
            <Button
              onClick={() => playAudio(1)}
              className="h-24 text-lg"
              variant="outline"
              disabled={isPlaying}
            >
              {playingIndex === 1 ? (
                <Volume2 className="mr-2 h-6 w-6 animate-pulse" />
              ) : (
                <Play className="mr-2 h-6 w-6" />
              )}
              Sound 2
            </Button>
          </div>
          
          <div className="flex space-x-4">
            <Button
              onClick={() => handleAnswer(true)}
              className="flex-1 h-16 text-lg"
              disabled={isPlaying}
            >
              Same
            </Button>
            
            <Button
              onClick={() => handleAnswer(false)}
              className="flex-1 h-16 text-lg"
              disabled={isPlaying}
            >
              Different
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioDiscriminationTest;
