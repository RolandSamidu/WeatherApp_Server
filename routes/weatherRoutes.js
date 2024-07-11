const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// @route   GET api/weather/:userId/:date
// @desc    Get weather data for a user for a given day
router.get('/:userId/:date', weatherController.getWeatherData);

module.exports = router;
