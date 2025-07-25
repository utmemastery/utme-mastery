const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const { completeOnboardingValidator, updatePreferencesValidator } = require('../validators/userValidator');
const { validationResult } = require('express-validator');

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

router.put('/preferences', authMiddleware, updatePreferencesValidator, handleValidationErrors, userController.updatePreferences); // Update goals, study times
router.get('/me', authMiddleware, userController.getProfile); // Retrieve user profile
router.post('/setup', authMiddleware, completeOnboardingValidator, handleValidationErrors, userController.completeOnboarding); // Complete initial onboarding

module.exports = router;
