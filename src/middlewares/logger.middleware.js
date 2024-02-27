// Import the necessary modules here
import winston from 'winston';

// Configure winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'logs.txt' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

export const loggerMiddleware = async (req, res, next) => {
  // Log request information
  logger.info({
    timestamp: new Date().toISOString(),
    originalUrl: req.originalUrl,
    requestBody: req.body,
  });

  // Call the next middleware or route handler
  next();
};

export default loggerMiddleware;
