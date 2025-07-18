const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../config/database');

// Register new user
const registerUser = async (userData) => {
  const { email, username, password, firstName, lastName } = userData;

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username }
      ]
    }
  });

  if (existingUser) {
    throw new Error('User with this email or username already exists.');
  }

  // Hash password
  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash,
      firstName,
      lastName
    },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true
    }
  });

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { user, token };
};

// Login user
const loginUser = async (credentials) => {
  const { email, password } = credentials;

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password.');
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // Return user data (excluding password)
  const { passwordHash, ...userData } = user;

  return { user: userData, token };
};

// Get user profile
const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      studyStreak: {
        select: {
          currentStreak: true,
          longestStreak: true,
          lastStudyDate: true
        }
      },
      learningProfile: {
        select: {
          learningStyle: true,
          avgResponseTime: true,
          confidenceLevel: true
        }
      }
    }
  });

  if (!user) {
    throw new Error('User not found.');
  }

  return user;
};

// Update user profile
const updateUserProfile = async (userId, updateData) => {
  const { firstName, lastName } = updateData;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      firstName,
      lastName
    },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      role: true,
      updatedAt: true
    }
  });

  return updatedUser;
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
}; 