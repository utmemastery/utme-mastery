const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendVerificationEmail = async (to, token) => {
  const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: 'Verify your email',
    html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`
  });
};

exports.sendPasswordResetEmail = async (to, token) => {
  const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: 'Reset your password',
    html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`
  });
};
