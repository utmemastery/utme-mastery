// Load environment variables
require('dotenv').config();
const logger = require('./utils/logger');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const flashcardRoutes = require('./routes/flashcard');
const quizRoutes = require('./routes/quiz');
const analyticsRoutes = require('./routes/analytics');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Configure CORS with allowed origin from .env
app.use(cors({
  origin: process.env.FRONTEND_URL, // e.g., http://192.168.132.67:8081
  credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/api/ping', (req, res) => {
    logger.info('Ping endpoint hit');
    res.json({ message: 'Backend is alive' });
  });
// Global error handler
app.use(errorHandler);

module.exports = app;
