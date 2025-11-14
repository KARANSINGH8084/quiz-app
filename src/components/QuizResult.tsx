// ✅ UPDATED: Enhanced with XP earning, key learning points, and level progression
import React, { useEffect, useState } from 'react';
import { Trophy, Target, Clock, Home, RotateCcw, Zap, TrendingUp, BookOpen, CheckCircle, XCircle, Brain, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { QuizResult as QuizResultType, Quiz } from '../types';
import { useAuth } from '../context/AuthContext';
import { calculateXP, getRankFromXP } from '../data/medicalQuizzes';
import { medicalQuizzes } from '../data/medicalQuizzes';
import { quizzes } from '../data/quizzes';
import { toast } from 'sonner';

interface QuizResultProps {
  result: QuizResultType;
  onGoHome: () => void;
  onRetakeQuiz: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({ result, onGoHome, onRetakeQuiz }) => {
  const { user, addXP } = useAuth();
  const [xpAnimated, setXpAnimated] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const oldXP = user?.xp || 0;
  const oldRank = user?.rank || 'Snake';
  const oldLevel = user?.level || 1;

  // ✅ Calculate XP earned
  const confidenceAccuracy = result.confidenceStats 
    ? ((result.attempts?.filter(a => a.confidence === 'know' && a.isCorrect).length || 0) / 
       Math.max(1, result.confidenceStats.know)) * 100 
    : 70;

  const quizLevel = quiz?.level || 1;
  const xpEarned = calculateXP(result.score, result.totalQuestions, quizLevel, confidenceAccuracy);
  
  const newXP = oldXP + xpEarned;
  const newRank = getRankFromXP(newXP);
  const newLevel = Math.min(6, Math.floor(newXP / 200) + 1);

  // Load quiz data
  useEffect(() => {
    // Find quiz from all sources
    if (result.quizId === 'temp_quiz') {
      const tempQuizData = localStorage.getItem('temp_quiz');
      if (tempQuizData) {
        setQuiz(JSON.parse(tempQuizData));
      }
    } else {
      const foundQuiz = medicalQuizzes.find(q => q.id === result.quizId) || 
                       quizzes.find(q => q.id === result.quizId);
      if (foundQuiz) {
        setQuiz(foundQuiz);
      }
    }
  }, [result.quizId]);

  // ✅ Award XP and check for level up
  useEffect(() => {
    // Animate XP counter
    let currentXP = 0;
    const increment = xpEarned / 50;
    const timer = setInterval(() => {
      currentXP += increment;
      if (currentXP >= xpEarned) {
        currentXP = xpEarned;
        clearInterval(timer);
        
        // Award XP to user
        addXP(xpEarned);
        
        // Check for level up or rank up
        if (newLevel > oldLevel) {
          setTimeout(() => {
            setShowLevelUp(true);
            toast.success(`🎉 Level Up! You've reached Level ${newLevel}!`);
            if (newRank !== oldRank) {
              toast.success(`🏆 Rank Up! You're now a ${newRank}!`);
            }
          }, 500);
        } else if (newRank !== oldRank) {
          setTimeout(() => {
            toast.success(`🏆 Rank Up! You're now a ${newRank}!`);
          }, 500);
        }
      }
      setXpAnimated(Math.floor(currentXP));
    }, 20);

    return () => clearInterval(timer);
  }, []);

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', message: 'Outstanding!', emoji: '🌟', color: 'from-yellow-400 to-orange-400' };
    if (percentage >= 80) return { grade: 'A', message: 'Excellent!', emoji: '🎉', color: 'from-green-400 to-emerald-400' };
    if (percentage >= 70) return { grade: 'B', message: 'Great job!', emoji: '👏', color: 'from-blue-400 to-cyan-400' };
    if (percentage >= 60) return { grade: 'C', message: 'Good effort!', emoji: '👍', color: 'from-purple-400 to-pink-400' };
    return { grade: 'D', message: 'Keep practicing!', emoji: '💪', color: 'from-gray-400 to-gray-500' };
  };

  const gradeInfo = getGrade(result.percentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Level Up Modal */}
        {showLevelUp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in">
            <Card className="p-8 max-w-md mx-4 bg-gradient-to-br from-purple-500 to-blue-500 text-white border-0">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-3xl mb-2">Level Up!</h2>
                <p className="text-xl mb-4">You've reached Level {newLevel}!</p>
                {newLevel < 6 && (
                  <p className="text-sm opacity-90">New challenges unlocked!</p>
                )}
                <Button
                  onClick={() => setShowLevelUp(false)}
                  className="mt-6 bg-white text-purple-600 hover:bg-gray-100"
                >
                  Awesome!
                </Button>
              </div>
            </Card>
          </div>
        )}

        <Card className="p-8 bg-white border-0 shadow-lg mb-6">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${gradeInfo.color} rounded-full mb-4`}>
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground">{gradeInfo.message} {gradeInfo.emoji}</p>
          </div>

          {/* Score Display */}
          <div className={`bg-gradient-to-br ${gradeInfo.color} bg-opacity-20 rounded-2xl p-8 mb-6 text-center`}>
            <div className="text-6xl mb-2">{result.percentage}%</div>
            <div className="text-2xl text-muted-foreground mb-2">Grade: {gradeInfo.grade}</div>
            <p className="text-muted-foreground">
              You scored {result.score} out of {result.totalQuestions} questions correctly
            </p>
          </div>

          {/* XP Earned */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 mb-6 border-2 border-yellow-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">XP Earned</h3>
                  <p className="text-sm text-muted-foreground">Based on score and confidence</p>
                </div>
              </div>
              <div className="text-4xl font-bold text-yellow-600">+{xpAnimated}</div>
            </div>
            {newLevel > oldLevel && (
              <div className="flex items-center gap-2 text-sm bg-white rounded-lg p-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-700">Level {oldLevel} → Level {newLevel}</span>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl mb-1">{result.score}</div>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>

            <div className="bg-red-50 rounded-xl p-4 text-center">
              <Target className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <div className="text-2xl mb-1">{result.totalQuestions - result.score}</div>
              <p className="text-xs text-muted-foreground">Wrong</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl mb-1">{result.timeTaken}</div>
              <p className="text-xs text-muted-foreground">Time</p>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <Brain className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl mb-1">{Math.round(confidenceAccuracy)}%</div>
              <p className="text-xs text-muted-foreground">Confidence</p>
            </div>
          </div>

          {/* Confidence Stats */}
          {result.confidenceStats && (
            <div className="mb-6">
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Confidence Analysis
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                  <div className="text-2xl mb-1">{result.confidenceStats.know}</div>
                  <p className="text-xs text-muted-foreground">I Know</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center border border-yellow-200">
                  <div className="text-2xl mb-1">{result.confidenceStats.notSure}</div>
                  <p className="text-xs text-muted-foreground">Not Sure</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center border border-red-200">
                  <div className="text-2xl mb-1">{result.confidenceStats.dontKnow}</div>
                  <p className="text-xs text-muted-foreground">Don't Know</p>
                </div>
              </div>
            </div>
          )}

          {/* Suggested Focus Areas */}
          {result.suggestedFocusAreas && result.suggestedFocusAreas.length > 0 && (
            <div className="mb-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-lg mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Suggested Focus Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.suggestedFocusAreas.map((area, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onGoHome}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              size="lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <Button
              onClick={onRetakeQuiz}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Retake Quiz
            </Button>
          </div>
        </Card>

        {/* Question Review with Key Points */}
        {quiz && (
          <Card className="p-8 bg-white border-0 shadow-lg">
            <h2 className="text-2xl mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Question Review
            </h2>
            <div className="space-y-6">
              {quiz.questions.map((question, index) => {
                const attempt = result.attempts?.[index];
                const isCorrect = attempt?.isCorrect || false;
                const userAnswer = attempt?.selectedAnswer ?? -1;
                
                return (
                  <div key={question.id} className={`p-6 rounded-xl border-2 ${
                    isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <XCircle className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-3">{index + 1}. {question.question}</p>
                        
                        {/* Options */}
                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optIndex) => {
                            const isUserAnswer = userAnswer === optIndex;
                            const isCorrectAnswer = question.correctAnswer === optIndex;
                            
                            return (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-lg ${
                                  isCorrectAnswer
                                    ? 'bg-green-100 border-2 border-green-500'
                                    : isUserAnswer
                                    ? 'bg-red-100 border-2 border-red-500'
                                    : 'bg-white border border-gray-200'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{String.fromCharCode(65 + optIndex)}.</span>
                                  <span>{option}</span>
                                  {isCorrectAnswer && (
                                    <Badge className="ml-auto bg-green-600">Correct</Badge>
                                  )}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <Badge className="ml-auto bg-red-600">Your Answer</Badge>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Key Learning Point */}
                        {question.keyPoint && (
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-3 rounded">
                            <p className="text-sm font-medium text-blue-900 mb-1">✅ Key Learning Point:</p>
                            <p className="text-sm text-blue-800">{question.keyPoint}</p>
                          </div>
                        )}

                        {/* Reference */}
                        {question.reference && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <BookOpen className="w-4 h-4" />
                            <span className="italic">Reference: {question.reference}</span>
                          </div>
                        )}

                        {/* Confidence Level */}
                        {attempt?.confidence && (
                          <div className="mt-3 flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Your confidence:</span>
                            <Badge className={
                              attempt.confidence === 'know' 
                                ? 'bg-green-100 text-green-700' 
                                : attempt.confidence === 'not-sure'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }>
                              {attempt.confidence === 'know' ? 'I know' : 
                               attempt.confidence === 'not-sure' ? 'Not sure' : 
                               "Don't know"}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
