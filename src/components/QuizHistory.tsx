import React from 'react';
import { Clock, Award, Calendar, TrendingUp, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useAuth } from '../context/AuthContext';

interface QuizHistoryProps {
  onBack: () => void;
}

export const QuizHistory: React.FC<QuizHistoryProps> = ({ onBack }) => {
  const { quizHistory } = useAuth();

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'General': 'bg-purple-100 text-purple-700',
      'Science': 'bg-blue-100 text-blue-700',
      'History': 'bg-green-100 text-green-700',
      'Technology': 'bg-orange-100 text-orange-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const totalQuizzes = quizHistory.length;
  const averageScore = totalQuizzes > 0
    ? Math.round(quizHistory.reduce((sum, q) => sum + q.percentage, 0) / totalQuizzes)
    : 0;
  const bestScore = totalQuizzes > 0
    ? Math.max(...quizHistory.map(q => q.percentage))
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl mb-2">Quiz History</h1>
          <p className="text-muted-foreground">Track your progress over time</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Quizzes</p>
                <p className="text-2xl">{totalQuizzes}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl">{averageScore}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Score</p>
                <p className="text-2xl">{bestScore}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quiz History List */}
        {quizHistory.length === 0 ? (
          <Card className="p-12 bg-white border-0 shadow-sm text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="mb-2">No quiz history yet</h3>
            <p className="text-muted-foreground">Start taking quizzes to see your history here</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {quizHistory.map((quiz) => (
              <Card key={quiz.id} className="p-6 bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3>{quiz.quizTitle}</h3>
                      <Badge className={`${getCategoryColor(quiz.category)} hover:${getCategoryColor(quiz.category)}`}>
                        {quiz.category}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(quiz.completedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{quiz.timeTaken}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{quiz.score}/{quiz.totalQuestions} correct</span>
                      </div>
                    </div>
                  </div>

                  <div className={`px-6 py-3 rounded-xl ${getScoreColor(quiz.percentage)}`}>
                    <div className="text-3xl">{quiz.percentage}%</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};