const { body } = require('express-validator');

// Validation for onboarding completion
const completeOnboardingValidator = [
  body('selectedSubjects')
    .isArray({ min: 1 }).withMessage('selectedSubjects must be a non-empty array'),
  body('aspiringCourse')
    .optional().isString().withMessage('aspiringCourse must be a string'),
  body('goalScore')
    .optional().isInt({ min: 0 }).withMessage('goalScore must be a positive integer'),
  body('learningStyle')
    .optional().isString().withMessage('learningStyle must be a string'),
];

// Validation for updating preferences (allow partial updates)
const updatePreferencesValidator = [
  body('selectedSubjects')
    .optional().isArray({ min: 1 }).withMessage('selectedSubjects must be a non-empty array'),
  body('aspiringCourse')
    .optional().isString().withMessage('aspiringCourse must be a string'),
  body('goalScore')
    .optional().isInt({ min: 0 }).withMessage('goalScore must be a positive integer'),
  body('learningStyle')
    .optional().isString().withMessage('learningStyle must be a string'),
  body('avgResponseTime')
    .optional().isFloat({ min: 0 }).withMessage('avgResponseTime must be a positive number'),
];

module.exports = {
  completeOnboardingValidator,
  updatePreferencesValidator,
}; 