const express = require('express');
const connectDB = require('./db/connect');
const cron = require('node-cron');
const weatherService = require('./Services/weatherService');
const emailService = require('./Services/emailService');
const User = require('./models/userModel');

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Schedule the cron job to send emails every 3 hours
cron.schedule('0 */3 * * *', async () => {
    try {
        const users = await User.find();
        for (let user of users) {
            const weatherData = await weatherService.getWeatherData(user.location);
            const weatherText = `Current weather in ${user.location}: ${weatherData.weather[0].description}`;
            emailService.sendEmail(user.email, '3 Hourly Weather Report', weatherText);
        }
    } catch (err) {
        console.error(err.message);
    }
});