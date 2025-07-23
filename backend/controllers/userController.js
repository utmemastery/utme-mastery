const userService = require('../services/userService');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.completeOnboarding = async (req, res, next) => {
  try {
    const user = await userService.completeOnboarding(req.user.id, req.body);
    res.json({ message: 'Onboarding complete', user });
  } catch (err) {
    next(err);
  }
};

exports.updatePreferences = async (req, res, next) => {
  try {
    const user = await userService.updatePreferences(req.user.id, req.body);
    res.json({ message: 'Preferences updated', user });
  } catch (err) {
    next(err);
  }
};
