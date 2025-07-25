const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');
const { validateLogin } = require('../middleware/validateInput');

router.post('/register', authController.register);
router.post('/login', authLimiter, validateLogin, authController.login);
//router.post('/verify-email-code', authController.verifyEmailCode);
router.post('/forgot-password', authLimiter, authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
