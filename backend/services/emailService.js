const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/*const emailTemplate = ({ title, message, buttonText, buttonUrl }) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <img src="https://your-domain.com/assets/logo.png" alt="UTME Mastery Logo" style="width: 150px; display: block; margin: 0 auto 20px;">
    <h2 style="color: #1E88E5; text-align: center;">${title}</h2>
    <p style="color: #666; font-size: 16px; text-align: center;">${message}</p>
    <a href="${buttonUrl}" style="display: block; width: 200px; margin: 20px auto; padding: 10px; background-color: #1E88E5; color: white; text-align: center; text-decoration: none; border-radius: 5px;">
      ${buttonText}
    </a>
    <p style="color: #999; font-size: 14px; text-align: center;">If you didn’t request this, please ignore this email.</p>
  </div>
`;

// send verification email
exports.sendVerificationEmail = async (to, code) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #1E88E5; text-align: center;">Verify Your UTME Mastery Account</h2>
      <p style="color: #666; font-size: 16px; text-align: center;">
        Your verification code is:
      </p>
      <h1 style="text-align: center; font-size: 36px; color: #1E88E5;">${code}</h1>
      <p style="color: #999; font-size: 14px; text-align: center;">This code will expire in 10 minutes.</p>
    </div>
  `;
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: 'Your UTME Mastery Verification Code',
    html,
  });
  logger.info('Verification email sent', { to });
};*/

// send password reset email
exports.sendPasswordResetEmail = async (to, token) => {
  try {
    const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: 'Reset Your UTME Mastery Password',
      html: emailTemplate({
        title: 'Reset Your Password',
        message: 'Click the button below to set a new password for your UTME Mastery account.',
        buttonText: 'Reset Password',
        buttonUrl: url,
      }),
    });
    logger.info('Password reset email sent', { to });
  } catch (error) {
    logger.error('Failed to send password reset email', { to, error: error.message });
    throw error;
  }
};