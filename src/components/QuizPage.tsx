import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Quiz, QuizResult } from '../types';
import { useAuth } from '../context/AuthContext';

interface QuizPageProps {
  quiz: Quiz;
  onComplete: (result: QuizResult) => void;
  onExit: () => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ quiz, onComplete, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
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
    const correctAnswers = quiz.questions.filter(
      (q, index) => answers[index] === q.correctAnswer
    ).length;

    const percentage = Math.round((correctAnswers / quiz.questions.length) * 100);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const timeTakenFormatted = `${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s`;

    const result: QuizResult = {
      id: Date.now().toString(),
      quizId: quiz.id,
      quizTitle: quiz.title,
      category: quiz.category,
      score: correctAnswers,
      totalQuestions: quiz.questions.length,
      percentage,
      completedAt: new Date().toISOString(),
      timeTaken: timeTakenFormatted
    };

    addQuizResult(result);
    onComplete(result);
  };

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onExit}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Exit Quiz
            </Button>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl">{quiz.title}</h2>
              <span className="text-muted-foreground">
                {answeredCount}/{quiz.questions.length} answered
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 bg-white border-0 shadow-sm mb-6">
          <div className="mb-6">
            <span className="text-muted-foreground mb-2 block">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <h3 className="text-2xl">{currentQ.question}</h3>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                  answers[currentQuestion] === index
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50'
                }`}
              >
                <span>{option}</span>
                {answers[currentQuestion] === index && (
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="bg-white"
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
                    : 'bg-white text-gray-400 border border-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={answeredCount < quiz.questions.length}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              Submit Quiz
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