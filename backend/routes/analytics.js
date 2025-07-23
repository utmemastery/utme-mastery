const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/progress', analyticsController.getProgress); // User mastery by subject/topic
router.get('/activity', analyticsController.getActivity); // Study streaks, XP, attempts
router.get('/mastery-map', analyticsController.getMasteryMap); // Subject-wise strength/weakness map

module.exports = router;
