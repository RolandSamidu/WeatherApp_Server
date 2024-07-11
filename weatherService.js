const axios = require('axios');
const User = require('./models/user');

const getWeatherData = async (lat, lon) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await axios.get(url);
    return response.data;
};

const updateWeatherData = async () => {
    const users = await User.find();
    for (const user of users) {
        const weatherData = await getWeatherData(user.location.lat, user.location.lon);
        user.weatherData.push({ date: new Date(), data: weatherData });
        await user.save();
    }
};

// Schedule weather data updates every 3 hours
setInterval(updateWeatherData, 3 * 60 * 60 * 1000);

module.exports = { getWeatherData };
