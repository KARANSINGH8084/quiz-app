import React from 'react';
import { Trophy, Clock, Target, TrendingUp, BookOpen, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { Badge } from './ui/badge';
import { quizzes } from '../data/quizzes';

interface HomeProps {
  onStartQuiz: (quizId: string) => void;
  onViewHistory: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStartQuiz, onViewHistory }) => {
  const { user, quizHistory } = useAuth();

  const recentQuizzes = quizHistory.slice(0, 3);
  
  const getBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'medium': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'hard': return 'bg-red-100 text-red-700 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-muted-foreground">Ready to test your knowledge today?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1">Total Attempts</p>
                <p className="text-3xl">{user?.total_attempts || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1">Average Score</p>
                <p className="text-3xl">{user?.average_score || 0}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1">Best Score</p>
                <p className="text-3xl">
                  {quizHistory.length > 0 
                    ? Math.max(...quizHistory.map(q => q.percentage))
                    : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1">Not Attempted</p>
                <p className="text-3xl">
                  {quizzes.length - (user?.total_quizzes || 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        {recentQuizzes.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl">Recent Activity</h2>
              <Button variant="ghost" onClick={onViewHistory}>
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentQuizzes.map((quiz) => (
                <Card key={quiz.id} className="p-6 bg-white border-0 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                      {quiz.category}
                    </Badge>
                    <span className="text-2xl">{quiz.percentage}%</span>
                  </div>
                  <h3 className="mb-2">{quiz.quizTitle}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {quiz.timeTaken}
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {quiz.score}/{quiz.totalQuestions}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Quizzes */}
        <div>
          <h2 className="text-2xl mb-4">Available Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="p-6 bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-xl flex items-center justify-center mb-3">
                    <span className="text-white text-2xl">
                      {quiz.category === 'General' && '🎯'}
                      {quiz.category === 'Science' && '🔬'}
                      {quiz.category === 'History' && '📚'}
                      {quiz.category === 'Technology' && '💻'}
                    </span>
                  </div>
                  <h3 className="mb-2">{quiz.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{quiz.category}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={getBadgeColor(quiz.difficulty)}>
                      {quiz.difficulty}
                    </Badge>
                    <Badge variant="secondary">
                      {quiz.questions.length} questions
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{quiz.timeLimit} min</span>
                  </div>
                </div>

                <Button 
                  onClick={() => onStartQuiz(quiz.id)} 
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  Start Quiz
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};