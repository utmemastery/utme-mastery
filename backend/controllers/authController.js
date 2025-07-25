const authService = require('../services/authService');
const emailService = require('../services/emailService');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const logger = require('../utils/logger');

// register
exports.register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);

    // No need to generate code or send email
    res.status(201).json({
      message: 'Registration successful.',
      user: data.user, // optionally return user info
      token: data.token, // if you generate a token on register
    });
  } catch (err) {
    next(err);
  }
};


// login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login({ email, password });
    res.json({
      token: data.token,
      user: { id: data.user.id, email: data.user.email, phoneNumber: data.user.phoneNumber },
    });
  } catch (err) {
    logger.error('Login endpoint failed:', err.message);
    next(err);
  }
};


// verify email code
/*exports.verifyEmailCode = async (req, res, next) => {
  try {   
    const { email, code } = req.body;
    await authService.verifyEmailCode(email, code);
    res.json({ message: 'Email verified successfully.' });
  } catch (err) {
    next(err);
  }
};*/


exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const token = await authService.generatePasswordResetToken(user.id, user.email);
      await emailService.sendPasswordResetEmail(user.email, token);
    }
    res.json({ message: 'If an account exists, a password reset link has been sent.' });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const user = await authService.verifyPasswordResetToken(token);
    await authService.setNewPassword(user.id, newPassword);
    res.json({ message: 'Password reset successful.' });
  } catch (err) {
    next(err);
  }
};