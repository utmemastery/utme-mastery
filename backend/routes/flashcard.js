const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashcardController');

router.get('/daily', flashcardController.getDailyReviewSet); // Today’s review set
router.post('/submit', flashcardController.submitAnswer); // Submit answer & record feedback
router.get('/stats', flashcardController.getStats); // Progress and spaced repetition stats

module.exports = router;
