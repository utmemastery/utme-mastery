const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProfile = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
      onboardingDone: true,
      selectedSubjects: true,
      aspiringCourse: true,
      goalScore: true,
      learningStyle: true,
      avgResponseTime: true,
      createdAt: true,
      updatedAt: true,
      role: true
    }
  });
};

exports.completeOnboarding = async (userId, data) => {
  return prisma.user.update({
    where: { id: userId },
    data: { ...data, onboardingDone: true }
  });
};

exports.updatePreferences = async (userId, data) => {
  return prisma.user.update({
    where: { id: userId },
    data
  });
};
