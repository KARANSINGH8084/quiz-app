// ✅ UPDATED: Enhanced with confidence scale
import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, Check, Brain, HelpCircle, X as XIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Quiz, QuizResult, ConfidenceLevel, QuestionAttempt } from '../types';
import { useAuth } from '../context/AuthContext';

interface QuizPageProps {
  quiz: Quiz;
  onComplete: (result: QuizResult) => void;
  onExit: () => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ quiz, onComplete, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  // ✅ NEW: Confidence tracking
  const [confidence, setConfidence] = useState<Record<number, ConfidenceLevel>>({});
  const [timeLeft, setTimeLeft] = useState((quiz.timeLimit || 10) * 60);
  const [startTime] = useState(Date.now());
  const { addQuizResult } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: answerIndex });
  };

  // ✅ NEW: Handle confidence selection
  const handleConfidenceSelect = (level: ConfidenceLevel) => {
    setConfidence({ ...confidence, [currentQuestion]: level });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const totalQuestions = quiz.questions.length;
    const correctAnswers = quiz.questions.filter(
      (q, index) => answers[index] === q.correctAnswer
    ).length;
    
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;

    // ✅ NEW: Calculate confidence statistics
    const attempts: QuestionAttempt[] = quiz.questions.map((q, index) => ({
      questionId: q.id,
      selectedAnswer: answers[index] ?? -1,
      isCorrect: answers[index] === q.correctAnswer,
      confidence: confidence[index] || 'dont-know',
      timeTaken: 0, // Could track per question if needed
    }));

    const confidenceStats = {
      know: Object.values(confidence).filter(c => c === 'know').length,
      notSure: Object.values(confidence).filter(c => c === 'not-sure').length,
      dontKnow: totalQuestions - Object.keys(confidence).length + 
                Object.values(confidence).filter(c => c === 'dont-know').length,
    };

    // ✅ NEW: Generate suggested focus areas
    const incorrectCategories = quiz.questions
      .filter((q, index) => answers[index] !== q.correctAnswer)
      .map(q => q.category);
    
    const categoryCount: Record<string, number> = {};
    incorrectCategories.forEach(cat => {
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });
    
    const suggestedFocusAreas = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category]) => category);

    const result: QuizResult = {
      id: Date.now().toString(),
      quizId: quiz.id,
      quizTitle: quiz.title,
      category: quiz.category,
      score: correctAnswers,
      totalQuestions,
      percentage,
      completedAt: new Date().toISOString(),
      timeTaken: `${minutes}m ${seconds}s`,
      // ✅ NEW: Enhanced result data
      attempts,
      confidenceStats,
      suggestedFocusAreas,
      xpEarned: 0, // Will be calculated in QuizResult
    };

    addQuizResult(result);
    onComplete(result);
  };

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const selectedAnswer = answers[currentQuestion];
  const selectedConfidence = confidence[currentQuestion];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl mb-1">{quiz.title}</h1>
              <p className="text-muted-foreground">{quiz.category}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                timeLeft < 60 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                <Clock className="w-5 h-5" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
              <Button onClick={onExit} variant="outline" size="sm">
                Exit
              </Button>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <span>{answeredCount} / {quiz.questions.length} answered</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 bg-white border-0 shadow-lg mb-6">
          <div className="mb-8">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white">{currentQuestion + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-xl leading-relaxed">{question.question}</p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const optionLetter = String.fromCharCode(65 + index);
                const isSelected = selectedAnswer === index;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {isSelected ? <Check className="w-5 h-5" /> : optionLetter}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ✅ NEW: Confidence Scale */}
          <div className="pt-6 border-t border-gray-200">
            <label className="block text-sm mb-3">
              <Brain className="w-4 h-4 inline mr-2" />
              How confident are you with this answer?
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleConfidenceSelect('know')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedConfidence === 'know'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <div className="text-center">
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    selectedConfidence === 'know' ? 'bg-green-500' : 'bg-gray-100'
                  }`}>
                    <Check className={`w-5 h-5 ${selectedConfidence === 'know' ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <p className={`text-sm ${selectedConfidence === 'know' ? 'font-medium' : ''}`}>
                    I know
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleConfidenceSelect('not-sure')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedConfidence === 'not-sure'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 bg-white hover:border-yellow-300'
                }`}
              >
                <div className="text-center">
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    selectedConfidence === 'not-sure' ? 'bg-yellow-500' : 'bg-gray-100'
                  }`}>
                    <HelpCircle className={`w-5 h-5 ${selectedConfidence === 'not-sure' ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <p className={`text-sm ${selectedConfidence === 'not-sure' ? 'font-medium' : ''}`}>
                    Not sure
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleConfidenceSelect('dont-know')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedConfidence === 'dont-know'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-red-300'
                }`}
              >
                <div className="text-center">
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    selectedConfidence === 'dont-know' ? 'bg-red-500' : 'bg-gray-100'
                  }`}>
                    <XIcon className={`w-5 h-5 ${selectedConfidence === 'dont-know' ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <p className={`text-sm ${selectedConfidence === 'dont-know' ? 'font-medium' : ''}`}>
                    Don't know
                  </p>
                </div>
              </button>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2 width-full justify-center flex-wrap">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg transition-all ${
                  index === currentQuestion
                    ? 'bg-purple-500 text-white'
                    : answers[index] !== undefined
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              Submit Quiz
              <Check className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
