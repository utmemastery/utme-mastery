const authService = require('../services/authService');

// Register new user
const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      data: result
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    
    res.json({
      success: true,
      message: 'Login successful.',
      data: result
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await authService.getUserProfile(req.user.id);
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const updatedUser = await authService.updateUserProfile(req.user.id, req.body);
    
    res.json({
      success: true,
      message: 'Profile updated successfully.',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile.'
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
}; 