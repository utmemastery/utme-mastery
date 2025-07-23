const authService = require('../services/authService');
const emailService = require('../services/emailService');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    // Generate and send verification email
    const token = await authService.generateEmailVerificationToken(data.user.id, data.user.email);
    await emailService.sendVerificationEmail(data.user.email, token);
    res.status(201).json({ message: 'Registration successful. Please verify your email.' });
  } catch (err) {
    next(err);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    await authService.verifyEmailToken(token);
    res.json({ message: 'Email verified successfully.' });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const token = await authService.generatePasswordResetToken(user.id, user.email);
    await emailService.sendPasswordResetEmail(user.email, token);
    res.json({ message: 'Password reset email sent.' });
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
