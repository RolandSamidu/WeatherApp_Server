const Weather = require('../models/weatherModel');

exports.getWeatherData = async (req, res) => {
    const { userId, date } = req.params;
    try {
        const weatherData = await Weather.find({ userId, date: new Date(date) });
        if (!weatherData.length) {
            return res.status(404).json({ msg: 'No weather data found for this date' });
        }
        res.json(weatherData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
