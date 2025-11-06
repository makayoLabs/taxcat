import { NextRequest, NextResponse } from 'next/server';
import taxBasicsModule from '@/data/modules/tax-basics-for-teens.json';

// POST /api/education/quiz/submit - Submit quiz answers and get score
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { moduleId, answers, timeSpent } = body;

    // Validate we have the module
    if (moduleId !== taxBasicsModule.id) {
      return NextResponse.json(
        { success: false, error: 'Module not found' },
        { status: 404 }
      );
    }

    const quiz = taxBasicsModule.quiz;
    if (!quiz) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found for this module' },
        { status: 404 }
      );
    }

    // Calculate score
    let correctAnswers = 0;
    const results = quiz.questions.map((question, index) => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) correctAnswers++;

      return {
        questionId: question.id,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
        points: isCorrect ? question.points : 0,
      };
    });

    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const earnedPoints = results.reduce((sum, r) => sum + r.points, 0);
    const scorePercentage = Math.round((earnedPoints / totalPoints) * 100);
    const passed = scorePercentage >= quiz.passingScore;

    // Calculate points awarded
    let pointsAwarded = earnedPoints;
    if (passed) {
      // Bonus points for passing
      pointsAwarded += 50;
    }
    if (scorePercentage === 100) {
      // Perfect score bonus
      pointsAwarded += 100;
    }

    const result = {
      success: true,
      quiz: {
        moduleId,
        title: quiz.title,
        totalQuestions: quiz.questions.length,
        correctAnswers,
        scorePercentage,
        passed,
        passingScore: quiz.passingScore,
        earnedPoints,
        pointsAwarded,
        timeSpent,
        results,
      },
      badge: passed ? {
        type: 'TAX_BASICS',
        name: 'Tax Basics Master',
        description: 'Completed the Tax Basics for Teens module',
        imageUrl: '/images/badges/tax-basics.png',
      } : null,
    };

    // TODO: Save quiz attempt to database
    console.log('Quiz submitted:', {
      moduleId,
      scorePercentage,
      passed,
      pointsAwarded,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}
