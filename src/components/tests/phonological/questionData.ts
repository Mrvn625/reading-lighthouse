
export type Question = {
  id: number;
  instruction: string;
  word: string;
  options: string[];
  correctAnswer: string;
};

// Sample questions for the phonological awareness test
export const sampleQuestions: Question[] = [
  {
    id: 1,
    instruction: "What sound does this word start with?",
    word: "ball",
    options: ["b", "p", "d", "t"],
    correctAnswer: "b"
  },
  {
    id: 2,
    instruction: "What sound does this word end with?",
    word: "dog",
    options: ["g", "k", "d", "t"],
    correctAnswer: "g"
  },
  {
    id: 3,
    instruction: "Which word rhymes with 'cat'?",
    word: "cat",
    options: ["hat", "cow", "dog", "pen"],
    correctAnswer: "hat"
  },
  {
    id: 4,
    instruction: "If you remove the first sound from 'stop', what word do you get?",
    word: "stop",
    options: ["top", "pot", "opt", "sop"],
    correctAnswer: "top"
  },
  {
    id: 5,
    instruction: "What sound is in the middle of the word?",
    word: "bat",
    options: ["a", "b", "t", "e"],
    correctAnswer: "a"
  }
];
