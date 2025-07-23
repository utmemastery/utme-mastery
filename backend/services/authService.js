const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const prisma = new PrismaClient();

exports.register = async ({ email, password }) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, emailVerified: false }
  });
  return { user };
};

exports.generateEmailVerificationToken = async (userId, email) => {
  const token = jwt.signToken({ userId, email, type: 'verify' }, { expiresIn: '1d' });
  await prisma.user.update({ where: { id: userId }, data: { verificationToken: token } });
  return token;
};

exports.verifyEmailToken = async (token) => {
  let payload;
  try {
    payload = jwt.verifyToken(token);
  } catch (e) {
    throw new Error('Invalid or expired token');
  }
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user || user.verificationToken !== token) throw new Error('Invalid token');
  await prisma.user.update({ where: { id: user.id }, data: { emailVerified: true, verificationToken: null } });
  return user;
};

exports.generatePasswordResetToken = async (userId, email) => {
  const token = jwt.signToken({ userId, email, type: 'reset' }, { expiresIn: '1h' });
  const expiry = new Date(Date.now() + 60 * 60 * 1000);
  await prisma.user.update({ where: { id: userId }, data: { resetToken: token, resetTokenExpiry: expiry } });
  return token;
};

exports.verifyPasswordResetToken = async (token) => {
  let payload;
  try {
    payload = jwt.verifyToken(token);
  } catch (e) {
    throw new Error('Invalid or expired token');
  }
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user || user.resetToken !== token || user.resetTokenExpiry < new Date()) throw new Error('Invalid or expired token');
  return user;
};

exports.setNewPassword = async (userId, newPassword) => {
  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: userId }, data: { password: hashed, resetToken: null, resetTokenExpiry: null } });
};
