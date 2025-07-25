// src/utils/logger.js
const logger = {
    error: (message, error) => {
      console.error(`[ERROR] ${message}`, error);
      // TODO: Integrate with a logging service (e.g., Sentry) for production
    },
    info: (message) => {
      console.log(`[INFO] ${message}`);
    },
  };
  
  export { logger };