import React, { useMemo } from 'react';
import { ArrowLeft, Mail, Calendar, Trophy, Target, Award, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAuth } from '../../context/AuthContext';

interface UserDetailsProps {
  userId: string;
  onBack: () => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ userId, onBack }) => {
  const { getAllUsers, getUserResults } = useAuth();

  const userData = useMemo(() => {
    const users = getAllUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return null;

    const results = getUserResults(userId);
    const sortedResults = [...results].sort(
      (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );

    const bestScore = results.length > 0 ? Math.max(...results.map(r => r.percentage)) : 0;
    const totalCorrect = results.reduce((sum, r) => sum + r.score, 0);
    const totalQuestions = results.reduce((sum, r) => sum + r.totalQuestions, 0);
    const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    return {
      user,
      results: sortedResults,
      bestScore,
      accuracy,
      totalCorrect,
      totalQuestions,
    };
  }, [userId, getAllUsers, getUserResults]);

  if (!userData || !userData.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">User not found</p>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  const { user, results, bestScore, accuracy, totalCorrect, totalQuestions } = userData;

  const getGrade = (percentage: number): string => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    return 'D';
  };

  const getScoreColor = (percentage: number): string => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button onClick={onBack} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </Button>

        {/* User Profile Card */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* User Info */}
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-3xl">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <h1 className="text-3xl mb-2">{user.name}</h1>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {user.joined_date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Badge */}
              <div className="text-center">
                <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500">
                  Regular User
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-purple-50">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="text-3xl mb-1">{user.total_attempts || 0}</div>
              <p className="text-sm text-muted-foreground">Total Attempts</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-green-50">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="text-3xl mb-1">{user.average_score}%</div>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-yellow-50">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="text-3xl mb-1">{bestScore}%</div>
              <p className="text-sm text-muted-foreground">Best Score</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-50">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl mb-1">{accuracy}%</div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </CardContent>
          </Card>
        </div>

        {/* Quiz History */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Quiz History ({results.length})</span>
              {totalQuestions > 0 && (
                <span className="text-sm text-muted-foreground">
                  {totalCorrect} / {totalQuestions} correct answers
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No quiz attempts yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Quiz Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg">{result.quizTitle}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {result.category}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(result.completedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{result.timeTaken}</span>
                          </div>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className={`text-3xl ${getScoreColor(result.percentage)}`}>
                            {result.percentage}%
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {result.score}/{result.totalQuestions}
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl">{getGrade(result.percentage)}</div>
                          <p className="text-xs text-muted-foreground">Grade</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
