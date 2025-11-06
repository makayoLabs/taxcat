'use client';

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Award, TrendingUp } from 'lucide-react';

interface QuizQuestion {
  id: string;
  questionType: string;
  question: string;
  options?: string[];
  correctAnswer: any;
  explanation?: string;
  points: number;
}

interface QuizEngineProps {
  quiz: {
    title: string;
    description?: string;
    passingScore: number;
    timeLimit?: number;
    questions: QuizQuestion[];
  };
  moduleId: string;
  onComplete?: (result: any) => void;
}

export default function QuizEngine({ quiz, moduleId, onComplete }: QuizEngineProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit || 900); // Default 15 min
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [startTime] = useState(Date.now());

  // Timer
  useEffect(() => {
    if (isSubmitted || !quiz.timeLimit) return;

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
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    try {
      const response = await fetch('/api/education/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId,
          answers,
          timeSpent,
        }),
      });

      const data = await response.json();
      setResult(data.quiz);
      setIsSubmitted(true);

      // Save to localStorage
      const quizResults = JSON.parse(localStorage.getItem('taxcat-quiz-results') || '{}');
      quizResults[moduleId] = {
        ...data.quiz,
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem('taxcat-quiz-results', JSON.stringify(quizResults));

      if (onComplete) {
        onComplete(data);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const allAnswered = quiz.questions.every(q => answers[q.id] !== undefined);

  if (isSubmitted && result) {
    return (
      <div className="max-w-3xl mx-auto">
        {/* Results Header */}
        <div className={`text-center p-12 rounded-2xl mb-8 ${
          result.passed ? 'bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300' : 'bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300'
        }`}>
          <div className="mb-6">
            {result.passed ? (
              <Award className="w-20 h-20 text-green-600 mx-auto" />
            ) : (
              <XCircle className="w-20 h-20 text-red-600 mx-auto" />
            )}
          </div>
          <h2 className="text-4xl font-bold mb-4">
            {result.passed ? '🎉 Congratulations!' : '📚 Keep Learning!'}
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            You scored <strong className={result.passed ? 'text-green-600' : 'text-red-600'}>{result.scorePercentage}%</strong>
          </p>
          <div className="flex items-center justify-center gap-8 text-lg">
            <div>
              <div className="font-bold text-2xl">{result.correctAnswers}/{result.totalQuestions}</div>
              <div className="text-gray-600">Correct</div>
            </div>
            <div>
              <div className="font-bold text-2xl">+{result.pointsAwarded}</div>
              <div className="text-gray-600">Points</div>
            </div>
            <div>
              <div className="font-bold text-2xl">{formatTime(result.timeSpent)}</div>
              <div className="text-gray-600">Time</div>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="ws-card">
          <h3 className="text-2xl font-bold mb-6">Review Your Answers</h3>
          <div className="space-y-6">
            {result.results.map((r: any, idx: number) => (
              <div key={r.questionId} className={`p-6 rounded-lg border-2 ${
                r.isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-lg flex-1">Question {idx + 1}</h4>
                  <div className="flex items-center gap-2">
                    {r.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <span className="font-medium">{r.points} pts</span>
                  </div>
                </div>
                <p className="text-gray-800 mb-4">{r.question}</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Your Answer:</strong>{' '}
                    <span className={r.isCorrect ? 'text-green-700' : 'text-red-700'}>
                      {typeof r.userAnswer === 'boolean' ? (r.userAnswer ? 'True' : 'False') : r.userAnswer}
                    </span>
                  </div>
                  {!r.isCorrect && (
                    <div>
                      <strong>Correct Answer:</strong>{' '}
                      <span className="text-green-700">
                        {typeof r.correctAnswer === 'boolean' ? (r.correctAnswer ? 'True' : 'False') : r.correctAnswer}
                      </span>
                    </div>
                  )}
                  {r.explanation && (
                    <div className="bg-white rounded p-3 mt-3">
                      <strong>Explanation:</strong> {r.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 text-center space-y-4">
          {!result.passed && (
            <p className="text-gray-600">
              You need {result.passingScore}% to pass. Review the lessons and try again!
            </p>
          )}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/learn/modules'}
              className="ws-button ws-button-secondary"
            >
              Back to Modules
            </button>
            {result.passed && (
              <button
                onClick={() => window.location.href = '/learn/dashboard'}
                className="ws-button ws-button-primary"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Quiz Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="ws-display-md">{quiz.title}</h1>
          {quiz.timeLimit && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
              timeLeft < 60 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
            }`}>
              <Clock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
          )}
        </div>
        {quiz.description && (
          <p className="text-gray-600 mb-4">{quiz.description}</p>
        )}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <span>{quiz.questions.length} Questions</span>
          <span>Passing Score: {quiz.passingScore}%</span>
          <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-brand-primary h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="ws-card mb-8">
        <div className="mb-6">
          <span className="text-sm text-gray-600 font-medium">Question {currentQuestion + 1}</span>
          <h2 className="text-2xl font-bold mt-2">{question.question}</h2>
        </div>

        {/* Multiple Choice */}
        {question.questionType === 'MULTIPLE_CHOICE' && question.options && (
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(question.id, idx)}
                className={`w-full text-left p-5 rounded-lg border-2 transition-all ${
                  answers[question.id] === idx
                    ? 'border-brand-primary bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[question.id] === idx
                      ? 'border-brand-primary bg-brand-primary'
                      : 'border-gray-300'
                  }`}>
                    {answers[question.id] === idx && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* True/False */}
        {question.questionType === 'TRUE_FALSE' && (
          <div className="grid grid-cols-2 gap-4">
            {[true, false].map((value) => (
              <button
                key={value.toString()}
                onClick={() => handleAnswer(question.id, value)}
                className={`p-6 rounded-lg border-2 font-medium text-lg transition-all ${
                  answers[question.id] === value
                    ? 'border-brand-primary bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {value ? 'True' : 'False'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className={`px-6 py-3 rounded-lg font-medium ${
            currentQuestion > 0
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Previous
        </button>

        <div className="flex gap-4">
          {!isLastQuestion ? (
            <button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              className="ws-button ws-button-primary"
            >
              Next Question
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`ws-button ${
                allAnswered ? 'ws-button-primary' : 'ws-button-secondary opacity-50 cursor-not-allowed'
              }`}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>

      {/* Answer Status */}
      <div className="mt-6 text-center text-sm text-gray-600">
        {Object.keys(answers).length} of {quiz.questions.length} questions answered
        {!allAnswered && ' - Answer all questions to submit'}
      </div>
    </div>
  );
}
