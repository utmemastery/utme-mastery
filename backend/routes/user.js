const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { completeOnboardingValidator, updatePreferencesValidator } = require('../validators/userValidator');
const { validationResult } = require('express-validator');

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

router.put('/preferences', updatePreferencesValidator, handleValidationErrors, userController.updatePreferences); // Update goals, study times
router.get('/me', userController.getProfile); // Retrieve user profile
router.post('/setup', completeOnboardingValidator, handleValidationErrors, userController.completeOnboarding); // Complete initial onboarding

module.exports = router;
