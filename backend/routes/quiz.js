const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/generate', quizController.generateQuiz); // Generate quiz
router.post('/submit', quizController.submitQuiz); // Submit quiz answers
router.get('/result/:id', quizController.getQuizResult); // Retrieve result detail

module.exports = router;
