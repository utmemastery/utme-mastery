const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES_IN = '7d';

exports.signToken = (payload, options = {}) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN, ...options });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
}; 