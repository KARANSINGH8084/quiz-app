import React, { useMemo } from 'react';
import { Users, FileQuestion, Trophy, TrendingUp, Award, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from '../../context/AuthContext';
import { quizzes } from '../../data/quizzes';

export const Dashboard: React.FC = () => {
  const { getAllUsers, getUserResults } = useAuth();

  const stats = useMemo(() => {
    const users = getAllUsers();
    const totalUsers = users.length;
    
    // Calculate total quiz attempts across all users
    let totalAttempts = 0;
    let totalScores: number[] = [];
    let totalCorrectAnswers = 0;
    let totalQuestions = 0;

    users.forEach(user => {
      const results = getUserResults(user.id);
      totalAttempts += results.length;
      results.forEach(result => {
        totalScores.push(result.percentage);
        totalCorrectAnswers += result.score;
        totalQuestions += result.totalQuestions;
      });
    });

    const averageScore = totalScores.length > 0 
      ? Math.round(totalScores.reduce((a, b) => a + b, 0) / totalScores.length)
      : 0;

    const bestScore = totalScores.length > 0 
      ? Math.max(...totalScores)
      : 0;

    const totalQuizzes = quizzes.length;
    const totalQuestionsAvailable = quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0);

    const accuracy = totalQuestions > 0
      ? Math.round((totalCorrectAnswers / totalQuestions) * 100)
      : 0;

    return {
      totalUsers,
      totalAttempts,
      totalQuizzes,
      totalQuestionsAvailable,
      averageScore,
      bestScore,
      accuracy,
    };
  }, [getAllUsers, getUserResults]);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Quiz Attempts',
      value: stats.totalAttempts,
      icon: Target,
      color: 'from-purple-400 to-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Average Score',
      value: `${stats.averageScore}%`,
      icon: TrendingUp,
      color: 'from-green-400 to-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Best Score',
      value: `${stats.bestScore}%`,
      icon: Trophy,
      color: 'from-yellow-400 to-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
  ];

  const quizStats = [
    {
      title: 'Total Quizzes',
      value: stats.totalQuizzes,
      icon: FileQuestion,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Total Questions',
      value: stats.totalQuestionsAvailable,
      icon: FileQuestion,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      title: 'Overall Accuracy',
      value: `${stats.accuracy}%`,
      icon: Award,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your Quiz App statistics and user activity
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                  </div>
                  <div className="text-3xl mb-1">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quiz Statistics */}
        <Card className="mb-8 border-0 shadow-md">
          <CardHeader>
            <CardTitle>Quiz System Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quizStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl">{stat.value}</div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quiz Categories Overview */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Available Quiz Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100"
                >
                  <h3 className="mb-2">{quiz.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>📝 {quiz.questions.length} Questions</div>
                    <div>⏱️ {quiz.timeLimit} minutes</div>
                    <div className="flex items-center space-x-1">
                      <span>
                        {quiz.difficulty === 'easy' ? '🟢' : quiz.difficulty === 'medium' ? '🟡' : '🔴'}
                      </span>
                      <span className="capitalize">{quiz.difficulty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
