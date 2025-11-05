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