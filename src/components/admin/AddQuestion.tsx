import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Quiz, Question } from '../../types';
import { quizzes } from '../../data/quizzes';

interface AddQuestionProps {
  quiz: Quiz;
  question?: Question | null;
  onClose: () => void;
}

export const AddQuestion: React.FC<AddQuestionProps> = ({ quiz, question, onClose }) => {
  const [selectedQuizId, setSelectedQuizId] = useState(quiz.id);
  const [questionText, setQuestionText] = useState(question?.question || '');
  const [category, setCategory] = useState(question?.category || '');
  const [options, setOptions] = useState<string[]>(
    question?.options || ['', '', '', '']
  );
  const [correctAnswer, setCorrectAnswer] = useState(
    question?.correctAnswer !== undefined ? question.correctAnswer : 0
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedQuiz = quizzes.find(q => q.id === selectedQuizId);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    if (options.length < 6) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      if (correctAnswer >= newOptions.length) {
        setCorrectAnswer(newOptions.length - 1);
      }
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!questionText.trim()) {
      newErrors.question = 'Question text is required';
    }

    if (!category.trim()) {
      newErrors.category = 'Category is required';
    }

    const filledOptions = options.filter(opt => opt.trim());
    if (filledOptions.length < 2) {
      newErrors.options = 'At least 2 options are required';
    }

    options.forEach((opt, index) => {
      if (!opt.trim()) {
        newErrors[`option_${index}`] = 'Option cannot be empty';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }

    const newQuestion: Question = {
      id: question?.id || `q_${Date.now()}`,
      question: questionText,
      category,
      options,
      correctAnswer,
    };

    // In a real app, this would save to backend/localStorage
    alert(
      question
        ? 'Question updated successfully! (Demo mode - changes not persisted)'
        : 'Question added successfully! (Demo mode - changes not persisted)'
    );

    console.log('Saved question:', newQuestion);
    console.log('To quiz:', selectedQuizId);

    onClose();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Button onClick={onClose} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Questions
        </Button>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>
              {question ? 'Edit Question' : 'Add New Question'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quiz Selection */}
            <div className="space-y-2">
              <Label htmlFor="quiz">Quiz</Label>
              <Select value={selectedQuizId} onValueChange={setSelectedQuizId}>
                <SelectTrigger id="quiz">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {quizzes.map(q => (
                    <SelectItem key={q.id} value={q.id}>
                      {q.title} ({q.difficulty})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <Label htmlFor="question">
                Question <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="question"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter your question here..."
                rows={3}
                className={errors.question ? 'border-red-500' : ''}
              />
              {errors.question && (
                <p className="text-sm text-red-500">{errors.question}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Geography, Science, History"
                className={errors.category ? 'border-red-500' : ''}
              />
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>
                  Options <span className="text-red-500">*</span>
                </Label>
                {options.length < 6 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddOption}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Option
                  </Button>
                )}
              </div>

              {errors.options && (
                <p className="text-sm text-red-500">{errors.options}</p>
              )}

              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={correctAnswer === index}
                          onChange={() => setCorrectAnswer(index)}
                          className="w-4 h-4 text-green-600"
                        />
                        <span className="text-sm text-muted-foreground min-w-[20px]">
                          {String.fromCharCode(65 + index)}.
                        </span>
                      </div>
                      <div className="flex-1">
                        <Input
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className={errors[`option_${index}`] ? 'border-red-500' : ''}
                        />
                        {errors[`option_${index}`] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[`option_${index}`]}
                          </p>
                        )}
                      </div>
                    </div>
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveOption(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground">
                Select the correct answer by clicking the radio button next to it
              </p>
            </div>

            {/* Preview */}
            {questionText && (
              <div className="border-t pt-6">
                <Label className="mb-4 block">Preview</Label>
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100">
                  <h3 className="mb-4">{questionText}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {options.map((option, index) => (
                      option && (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            index === correctAnswer
                              ? 'bg-green-100 border-green-300'
                              : 'bg-white border-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 rounded-full bg-white border flex items-center justify-center text-xs">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-sm">{option}</span>
                            {index === correctAnswer && (
                              <span className="ml-auto text-green-600">✓</span>
                            )}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                <Save className="w-4 h-4 mr-2" />
                {question ? 'Update Question' : 'Save Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
