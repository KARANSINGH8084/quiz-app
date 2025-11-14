export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joined_date: string;
  total_quizzes: number;
  average_score: number;
  total_attempts?: number;
  not_attempted?: number;
  role?: 'user' | 'admin';
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  image?: string;
  imageTitle?: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  questions: Question[];
  timeLimit?: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  timeTaken: string;
}

// ✅ UPDATED: Enhanced with gamification features

export type Rank = 'Snake' | 'Lion' | 'Prince' | 'King';
export type ConfidenceLevel = 'know' | 'not-sure' | 'dont-know';
export type QuestionDifficulty = 1 | 2 | 3 | 4 | 5 | 6;

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joined_date: string;
  total_quizzes: number;
  average_score: number;
  total_attempts?: number;
  not_attempted?: number;
  role?: 'user' | 'admin';
  // ✅ NEW: Gamification fields
  xp?: number;
  rank?: Rank;
  selectedAvatar?: string; // emoji like 🐍, 🦁, 👑, 🏆
  level?: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  // ✅ NEW: Enhanced question fields
  difficulty?: QuestionDifficulty; // 1-6 levels
  keyPoint?: string; // Key learning point
  reference?: string; // Reference source
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  questions: Question[];
  timeLimit?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  // ✅ NEW: Level-based quiz
  level?: QuestionDifficulty;
}

export interface QuestionAttempt {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  confidence: ConfidenceLevel;
  timeTaken?: number;
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  timeTaken: string;
  // ✅ NEW: Enhanced result fields
  xpEarned?: number;
  attempts?: QuestionAttempt[];
  confidenceStats?: {
    know: number;
    notSure: number;
    dontKnow: number;
  };
  suggestedFocusAreas?: string[];
}

// ✅ NEW: Challenge mode types
export interface Challenge {
  id: string;
  creatorId: string;
  creatorName: string;
  title: string;
  quizId: string;
  level: QuestionDifficulty;
  numberOfQuestions: number;
  participants: ChallengeParticipant[];
  status: 'waiting' | 'in-progress' | 'completed';
  createdAt: string;
  startTime?: string;
  endTime?: string;
}

export interface ChallengeParticipant {
  userId: string;
  userName: string;
  score?: number;
  accuracy?: number;
  timeTaken?: string;
  rank?: number;
}

// ✅ NEW: XP and Rank progression
export const XP_THRESHOLDS = {
  Snake: 0,
  Lion: 500,
  Prince: 2000,
  King: 5000,
};

export const AVATAR_EMOJIS = {
  Snake: '🐍',
  Lion: '🦁',
  Prince: '👑',
  King: '🏆',
};

export const RANK_NAMES = ['Snake', 'Lion', 'Prince', 'King'] as const;
