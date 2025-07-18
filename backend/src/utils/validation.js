const validateRegistration = (req, res, next) => {
  const { email, username, password, firstName, lastName } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email, username, and password are required.'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  // Username validation (alphanumeric, 3-20 characters)
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      success: false,
      message: 'Username must be 3-20 characters long and contain only letters, numbers, and underscores.'
    });
  }

  // Password validation (minimum 8 characters)
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long.'
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.'
    });
  }

  next();
};

const validatePagination = (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
    return res.status(400).json({
      success: false,
      message: 'Invalid pagination parameters. Page must be >= 1, limit must be between 1 and 100.'
    });
  }

  req.pagination = {
    page: pageNum,
    limit: limitNum,
    skip: (pageNum - 1) * limitNum
  };

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validatePagination
}; 