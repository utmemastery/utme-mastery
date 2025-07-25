// middleware/errorHandler.js
const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error(err.message, { stack: err.stack });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({ message });
}

module.exports = { errorHandler };
