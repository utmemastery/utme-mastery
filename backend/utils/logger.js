const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Log info and above (info, warn, error)
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }), // Include stack traces for errors
    winston.format.json() // Output logs in JSON for structured logging
  ),
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorize logs for readability
        winston.format.simple() // Simple format for console
      ),
    }),
    // File transport for errors
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error', // Only log errors to this file
    }),
    // File transport for all logs
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

// Create logs directory if it doesn't exist
const fs = require('fs');
const logsDir = 'logs';
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

module.exports = logger;