// backend/core/adaptiveQuiz.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const selectNextQuestion = async (userId, subjectId, quizAttemptId) => {
  const recentAttempts = await prisma.questionAttempt.findMany({
    where: { userId, question: { subjectId } },
    orderBy: { attemptedAt: 'desc' },
    take: 10,
  });

  const avgCorrectness = recentAttempts.length
    ? recentAttempts.reduce((sum, attempt) => sum + (attempt.isCorrect ? 1 : 0), 0) / recentAttempts.length
    : 0.5;

  let difficulty = 'MEDIUM';
  if (avgCorrectness > 0.8) difficulty = 'HARD';
  else if (avgCorrectness < 0.4) difficulty = 'EASY';

  const question = await prisma.question.findFirst({
    where: {
      subjectId,
      difficulty,
      NOT: { questionAttempts: { some: { userId, quizAttemptId } } },
    },
    include: { options: true },
  });

  return question;
};

module.exports = { selectNextQuestion };