import React from 'react';
import { Trophy, Target, Clock, Home, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { QuizResult as QuizResultType } from '../types';

interface QuizResultProps {
  result: QuizResultType;
  onGoHome: () => void;
  onRetakeQuiz: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({ result, onGoHome, onRetakeQuiz }) => {
  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', message: 'Outstanding!', emoji: '🌟' };
    if (percentage >= 80) return { grade: 'A', message: 'Excellent!', emoji: '🎉' };
    if (percentage >= 70) return { grade: 'B', message: 'Great job!', emoji: '👏' };
    if (percentage >= 60) return { grade: 'C', message: 'Good effort!', emoji: '👍' };
    return { grade: 'D', message: 'Keep practicing!', emoji: '💪' };
  };

  const gradeInfo = getGrade(result.percentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="p-8 bg-white border-0 shadow-lg">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full mb-4 animate-bounce">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground">{gradeInfo.message} {gradeInfo.emoji}</p>
          </div>

          {/* Score Display */}
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 mb-8 text-center">
            <div className="text-6xl mb-2">{result.percentage}%</div>
            <div className="text-2xl text-muted-foreground mb-2">Grade: {gradeInfo.grade}</div>
            <p className="text-muted-foreground">
              You scored {result.score} out of {result.totalQuestions} questions correctly
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl mb-1">{result.score}</div>
              <p className="text-sm text-muted-foreground">Correct Answers</p>
            </div>

            <div className="bg-red-50 rounded-xl p-6 text-center">
              <Target className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl mb-1">{result.totalQuestions - result.score}</div>
              <p className="text-sm text-muted-foreground">Wrong Answers</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl mb-1">{result.timeTaken}</div>
              <p className="text-sm text-muted-foreground">Time Taken</p>
            </div>
          </div>

          {/* Quiz Info */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="mb-2">{result.quizTitle}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Category: {result.category}</span>
              <span>•</span>
              <span>Completed: {new Date(result.completedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onRetakeQuiz}
              variant="outline"
              className="flex-1 bg-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
            <Button
              onClick={onGoHome}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};