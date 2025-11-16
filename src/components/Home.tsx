// ✅ UPDATED: Removed Medical Quizzes section, added level progression and skeleton loaders
import React, { useState } from 'react';
import { Trophy, Clock, Target, TrendingUp, BookOpen, Award, Zap, Star, Play, Users, Lock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Skeleton } from './ui/skeleton';
import { quizzes } from '../data/quizzes';
import { generateLevelBasedQuiz } from '../data/medicalQuizzes';
import { AVATAR_EMOJIS, XP_THRESHOLDS } from '../types';
import { toast } from 'sonner';

interface HomeProps {
  onStartQuiz: (quizId: string) => void;
  onViewHistory: () => void;
  onStartChallenge?: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStartQuiz, onViewHistory, onStartChallenge }) => {
  const { user, quizHistory } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [loading, setLoading] = useState(false);

  const recentQuizzes = quizHistory.slice(0, 3);
  console.log(quizzes, ' quizzes')
  const currentXP = user?.xp || 0;
  const currentRank = user?.rank || 'Snake';
  const currentLevel = user?.level || 1;
  const ranks = ['Snake', 'Lion', 'Prince', 'King'] as const;
  const currentRankIndex = ranks.indexOf(currentRank);
  const nextRank = currentRankIndex < ranks.length - 1 ? ranks[currentRankIndex + 1] : null;
  const currentThreshold = XP_THRESHOLDS[currentRank];
  const nextThreshold = nextRank ? XP_THRESHOLDS[nextRank] : currentThreshold;
  const progressToNext = nextRank ? ((currentXP - currentThreshold) / (nextThreshold - currentThreshold)) * 100 : 100;

  // ✅ UPDATED: Level data with unlocking logic
  const levels = [
    { level: 1, name: 'Beginner', difficulty: 'Easy', color: 'from-green-400 to-green-500', unlocked: true },
    { level: 2, name: 'Novice', difficulty: 'Easy-Medium', color: 'from-blue-400 to-blue-500', unlocked: currentLevel >= 2 },
    { level: 3, name: 'Intermediate', difficulty: 'Medium', color: 'from-purple-400 to-purple-500', unlocked: currentLevel >= 3 },
    { level: 4, name: 'Advanced', difficulty: 'Medium-Hard', color: 'from-orange-400 to-orange-500', unlocked: currentLevel >= 4 },
    { level: 5, name: 'Expert', difficulty: 'Hard', color: 'from-red-400 to-red-500', unlocked: currentLevel >= 5 },
    { level: 6, name: 'Master', difficulty: 'Very Hard', color: 'from-pink-400 to-pink-500', unlocked: currentLevel >= 6 },
  ];

  const getBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'medium': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'hard': return 'bg-red-100 text-red-700 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStartLevelQuiz = () => {
    if (!selectedLevel) {
      toast.error('Please select a level first');
      return;
    }

    setLoading(true);

    // Simulate loading time
    setTimeout(() => {
      const quiz = generateLevelBasedQuiz(selectedLevel, questionCount);
      if (quiz) {
        localStorage.setItem('temp_quiz', JSON.stringify(quiz));
        toast.success(`Starting Level ${selectedLevel} quiz with ${questionCount} questions! 🎯`);
        onStartQuiz('temp_quiz');
      } else {
        toast.error('Not enough questions available for this level');
      }
      setLoading(false);
    }, 500);
  };

  const handleLevelSelect = (level: number, unlocked: boolean) => {
    if (!unlocked) {
      const nextLevelXP = (level - 1) * 200;
      toast.warning(`🔒 Level ${level} is locked! Earn ${nextLevelXP - currentXP} more XP to unlock.`);
      return;
    }
    setSelectedLevel(level);
    toast.info(`Level ${level} selected! Choose number of questions and start.`);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section with Rank */}
        <div className="mb-8 flex flex-col md:flex-row items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl">Welcome back, {user.name}! </h1>
            </div>
            <p className="text-muted-foreground">Ready to level up your medical knowledge?</p>
          </div>

          {/* Quick XP Display */}
          <div className="p-4 flex flex-col gap-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white border-0 min-w-[200px]">
            <div className="flex items-center justify-between">
              <span className="text-lg flex opacity-90">Rank : {currentRank}</span>
              <Zap className="w-4 h-4" />
            </div>
            {nextRank && (
              <>
                <Progress value={progressToNext} className="h-2 bg-white/20" />
                <p className="text-sm opacity-90">{nextThreshold - currentXP} XP to {nextRank}</p>
              </>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1">Total Attempts</p>
                <p className="text-3xl">{user.total_attempts || 0}</p>
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
                <p className="text-3xl">{user.average_score || 0}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1">Current Level</p>
                <p className="text-3xl">Level {currentLevel}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1">Total XP</p>
                <p className="text-3xl">{currentXP}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Level Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white border-0 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h2 className="text-2xl mb-1">Choose Your Challenge</h2>
                  <p className="text-muted-foreground">Select a level and number of questions</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>

              {/* Level Selection Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-0">
                {levels.map((level) => (
                  <button
                    key={level.level}
                    onClick={() => handleLevelSelect(level.level, level.unlocked)}
                    className={`p-4 rounded-xl border-2 transition-all relative ${level.unlocked
                      ? selectedLevel === level.level
                        ? `bg-gradient-to-br ${level.color} text-white border-transparent shadow-lg scale-105`
                        : 'bg-green-100 text-green-700 hover:scale-105 border-gray-200 hover:border-gray-300'
                      : 'bg-gray-100 opacity-60 cursor-not-allowed border-gray-200'
                      }
                    `}
                  >
                    {!level.unlocked && (
                      <div className="absolute top-2 right-2">
                        <Lock className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                    <div className="text-center">
                      <div className={`text-3xl mb-2 ${selectedLevel === level.level ? 'text-white' : ''}`}>
                        {level.level}
                      </div>
                      <p className={`font-medium mb-1 ${selectedLevel === level.level ? 'text-white' : ''}`}>
                        Level {level.level}
                      </p>
                      <p className={`text-xs ${selectedLevel === level.level ? 'text-white/90' : 'text-muted-foreground'}`}>
                        {level.difficulty}
                      </p>
                      {!level.unlocked && (
                        <p className="text-xs text-gray-500 mt-1">
                          {((level.level - 1) * 200)} XP needed
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Question Count Selection */}
              {selectedLevel && (
                <div className="space-y-4 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
                  <div>
                    <label className="text-sm mb-2 block font-medium">Number of Questions: {questionCount}</label>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      step="5"
                      value={questionCount}
                      onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>5</span>
                      <span>10</span>
                      <span>15</span>
                      <span>20</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleStartLevelQuiz}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Generating Quiz...
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Start Level {selectedLevel} Quiz
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Card>

            {/* Challenge Mode */}
            <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse">
                  <Users className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-1 flex items-center gap-2">
                    Challenge Mode
                    <Badge className="bg-green-500 text-white animate-pulse">NEW!</Badge>
                  </h3>
                  <p className="text-sm opacity-90">Compete with other medical students in real-time!</p>
                </div>
                <Button
                  variant="outline"
                  className="bg-white text-orange-600 hover:bg-gray-100"
                  onClick={() => {
                    if (onStartChallenge) {
                      toast.success('Starting Challenge Mode! 🎮');
                      onStartChallenge();
                    }
                  }}
                >
                  Enter Arena 🏆
                </Button>
              </div>
            </Card>

            {/* Practice Quizzes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Practice Quizzes</h2>
                <Badge className="bg-blue-100 text-blue-700">Medical Science</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizzes?.map((quiz) => (
                  <Card key={quiz.id} className="p-6 bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg mb-1">{quiz.title}</h3>
                        <p className="text-sm text-muted-foreground">{quiz.category}</p>
                      </div>
                      <Badge className={`${getBadgeColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {quiz.questions.length} Questions
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {quiz.timeLimit} min
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        toast.success(`Starting ${quiz.title}! Good luck! 📚`);
                        onStartQuiz(quiz.id);
                      }}
                      className="w-full"
                      variant="outline"
                    >
                      Start Quiz
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="p-6 bg-white border-0 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xl">Recent Activity</h3>
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
              {recentQuizzes.length > 0 ? (
                <div className="space-y-3">
                  {recentQuizzes.map((quiz) => (
                    <div key={quiz.id} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium line-clamp-1">{quiz.quizTitle}</p>
                        <Badge className={quiz.percentage >= 70 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                          {quiz.percentage}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(quiz.completedAt).toLocaleDateString()}</span>
                        {quiz.xpEarned && (
                          <>
                            <span>•</span>
                            <Zap className="w-3 h-3 text-yellow-500" />
                            <span>+{quiz.xpEarned} XP</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={onViewHistory}
                    variant="outline"
                    className="w-full mt-2"
                    size="sm"
                  >
                    View All History
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No quizzes taken yet</p>
                  <p className="text-xs mt-1">Start your first quiz to see results here!</p>
                </div>
              )}
            </Card>

            {/* Level Progress */}
            <Card className="p-6 bg-white border-0 shadow-sm">
              <h3 className="text-xl">Level Progress</h3>
              <div className="space-y-3">
                {levels.map((level) => (
                  <div
                    key={level.level}
                    className={`p-3 rounded-xl ${level.unlocked ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${level.unlocked ? 'text-green-700' : 'text-gray-500'}`}>
                        Level {level.level} - {level.name}
                      </span>
                      {level.unlocked ? (
                        <Award className="w-4 h-4 text-green-600" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {level.unlocked ? 'Unlocked' : `Requires ${(level.level - 1) * 200} XP`}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
