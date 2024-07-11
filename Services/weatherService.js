const axios = require('axios');
const config = require('config');

const weatherApiKey = config.get('weatherApiKey');
const weatherBaseUrl = `http://api.openweathermap.org/data/2.5/weather`;

const getWeatherData = async (location) => {
    try {
        const res = await axios.get(`${weatherBaseUrl}?q=${location}&appid=${weatherApiKey}`);
        return res.data;
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = { getWeatherData };
