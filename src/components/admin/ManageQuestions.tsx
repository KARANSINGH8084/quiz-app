import React, { useState } from 'react';
import { Plus, Edit, Trash2, FileQuestion, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { quizzes } from '../../data/quizzes';
import { Question, Quiz } from '../../types';
import { AddQuestion } from './AddQuestion';

export const ManageQuestions: React.FC = () => {
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all questions from all quizzes
  const allQuestions = quizzes.flatMap(quiz =>
    quiz.questions.map(q => ({ ...q, quizTitle: quiz.title, quizId: quiz.id }))
  );

  // Filter questions based on search
  const filteredQuestions = allQuestions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.quizTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setSelectedQuiz(quizzes[0]);
    setShowAddQuestion(true);
  };

  const handleEditQuestion = (question: Question & { quizId: string }) => {
    const quiz = quizzes.find(q => q.id === question.quizId);
    if (quiz) {
      setSelectedQuiz(quiz);
      setEditingQuestion(question);
      setShowAddQuestion(true);
    }
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      // In a real app, this would update the backend
      alert('Question deletion is simulated. In production, this would remove the question from the database.');
    }
  };

  const handleClose = () => {
    setShowAddQuestion(false);
    setEditingQuestion(null);
    setSelectedQuiz(null);
  };

  if (showAddQuestion && selectedQuiz) {
    return (
      <AddQuestion
        quiz={selectedQuiz}
        question={editingQuestion}
        onClose={handleClose}
      />
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <FileQuestion className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl">Manage Questions</h1>
            </div>
            <p className="text-muted-foreground">
              Add, edit, or delete quiz questions
            </p>
          </div>
          <Button
            onClick={handleAddQuestion}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="text-3xl mb-1">{quizzes.length}</div>
              <p className="text-sm text-muted-foreground">Total Quizzes</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="text-3xl mb-1">{allQuestions.length}</div>
              <p className="text-sm text-muted-foreground">Total Questions</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="text-3xl mb-1">
                {quizzes.filter(q => q.difficulty === 'easy').length}
              </div>
              <p className="text-sm text-muted-foreground">Easy Quizzes</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="text-3xl mb-1">
                {quizzes.filter(q => q.difficulty === 'hard').length}
              </div>
              <p className="text-sm text-muted-foreground">Hard Quizzes</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6 border-0 shadow-md">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search questions by text, category, or quiz..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Questions List */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>
              All Questions ({filteredQuestions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <FileQuestion className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  {searchQuery ? 'No questions found matching your search' : 'No questions available'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.map((question, index) => {
                  const quiz = quizzes.find(q => q.id === question.quizId);
                  return (
                    <div
                      key={question.id}
                      className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col gap-4">
                        {/* Question Header */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge variant="secondary">{question.quizTitle}</Badge>
                              <Badge variant="outline">{question.category}</Badge>
                              {quiz && (
                                <Badge className={getDifficultyColor(quiz.difficulty)}>
                                  {quiz.difficulty}
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-lg mb-3">{question.question}</h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditQuestion(question as any)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteQuestion(question.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-3 rounded-lg border ${
                                optIndex === question.correctAnswer
                                  ? 'bg-green-50 border-green-300 text-green-700'
                                  : 'bg-gray-50 border-gray-200'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <span className="w-6 h-6 rounded-full bg-white border flex items-center justify-center text-xs">
                                  {String.fromCharCode(65 + optIndex)}
                                </span>
                                <span className="text-sm">{option}</span>
                                {optIndex === question.correctAnswer && (
                                  <span className="ml-auto">✓</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
