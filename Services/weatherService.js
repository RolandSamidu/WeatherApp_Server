const axios = require('axios');
const config = require('config');

const weatherApiKey = config.get('weatherApiKey');
const weatherBaseUrl = `https://api.openweathermap.org/data/2.5/weather`;

const getWeatherData = async (location) => {
    try {
        const res = await axios.get(`${weatherBaseUrl}?lat=${location.lat}&lon=${location.lon}&appid=${weatherApiKey}`);
        return res.data;
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = { getWeatherData };
