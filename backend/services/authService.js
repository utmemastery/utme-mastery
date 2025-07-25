const { PrismaClient } = require('@prisma/client');
  const bcrypt = require('bcryptjs');
  const jwt = require('../utils/jwt');
  const prisma = new PrismaClient();
  const logger = require('../utils/logger');

  // register
  exports.register = async ({ email, password, firstName, lastName, phoneNumber }) => {
    logger.info('Attempting registration', { email, phoneNumber, firstName });
  
    if (!email || !password || !firstName || !lastName || !phoneNumber) {
      logger.error('Registration failed: Missing required fields', { email, phoneNumber, firstName });
      throw new Error('Email, first name, last name, phone number, and password are required');
    }
  
    if (password.length < 8 || !/\d/.test(password)) {
      logger.error('Registration failed: Weak password', { email });
      throw new Error('Password must be at least 8 characters and include a number');
    }
  
    const hashed = await bcrypt.hash(password, 10);
  
    try {
      const user = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          phoneNumber,
          password: hashed,
          emailVerified: true, // 👈 force-verified if you're removing email flow
        },
      });
  
      logger.info('User created successfully', { id: user.id, email, firstName: user.firstName, lastName: user.lastName, phoneNumber, onboardingCompleted: user.onboardingCompleted });
  
      const token = jwt.signToken(
        { id: user.id, email: user.email },
        { expiresIn: '7d' }
      );
  
      return { user, token }; // 👈 now returning token too
    } catch (error) {
      logger.error('Registration failed:', { error: error.message, email });
      throw new Error(
        error.code === 'P2002'
          ? 'Email or username already exists'
          : 'Registration failed'
      );
    }
  };
  

  // login
  exports.login = async ({ email, password }) => {
    logger.info('Attempting login', { email });
    if (!email || !password) {
      logger.error('Login failed: Missing required fields', { email });
      throw new Error('Email and password are required');
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      logger.error('Login failed: Invalid credentials', { email });
      throw new Error('Invalid credentials');
    }
    if (!user.emailVerified) {
      logger.error('Login failed: Email not verified', { email });
      throw new Error('Please verify your email before logging in');
    }
    const token = jwt.signToken({ id: user.id, email: user.email }, { expiresIn: '7d' });
    logger.info('Login successful', { id: user.id, email });
    return { token, user };
  };

  // generate email verification code
  /*exports.generateEmailVerificationCode = async (userId, email) => {
    const code = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await prisma.user.update({
      where: { id: userId },
      data: { verificationCode: code, verificationCodeExpiry: expiry },
    });
    logger.info('Verification code generated', { userId, code });
    return code;
  };*/

  // verify email code
  /*exports.verifyEmailCode = async (email, code) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.verificationCode !== code || new Date() > user.verificationCodeExpiry) {
      throw new Error('Invalid or expired verification code');
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, verificationCode: null, verificationCodeExpiry: null },
    });
    logger.info('Email verified via code', { userId: user.id });
    return user;
  };*/


  exports.generatePasswordResetToken = async (id, email) => {
    logger.info('Generating password reset token', { id, email });
    const token = jwt.signToken({ id, email, type: 'reset' }, { expiresIn: '1h' });
    const expiry = new Date(Date.now() + 60 * 60 * 1000);
    await prisma.user.update({
      where: { id },
      data: { resetToken: token, resetTokenExpiry: expiry },
    });
    logger.info('Password reset token generated', { id });
    return token;
  };

  exports.verifyPasswordResetToken = async (token) => {
    logger.info('Verifying password reset token', { token: token.substring(0, 10) + '...' });
    let payload;
    try {
      payload = jwt.verifyToken(token);
    } catch (e) {
      logger.error('Password reset token verification failed:', { error: e.message });
      throw new Error('Invalid or expired token');
    }
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user || user.resetToken !== token || user.resetTokenExpiry < new Date()) {
      logger.error('Password reset token invalid or expired', { userId: payload.id });
      throw new Error('Invalid or expired token');
    }
    logger.info('Password reset token verified', { userId: user.id });
    return user;
  };

  exports.setNewPassword = async (id, newPassword) => {
    logger.info('Setting new password', { id });
    if (newPassword.length < 8 || !/\d/.test(newPassword)) {
      logger.error('Password reset failed: Weak password', { id });
      throw new Error('Password must be at least 8 characters and include a number');
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id },
      data: { password: hashed, resetToken: null, resetTokenExpiry: null },
    });
    logger.info('Password reset successful', { id });
  };