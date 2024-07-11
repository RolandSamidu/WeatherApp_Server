const nodemailer = require('nodemailer');
const User = require('./models/user');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendWeatherReport = async () => {
    const users = await User.find();
    for (const user of users) {
        const latestWeather = user.weatherData.slice(-1)[0];
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Hourly Weather Report',
            text: `The latest weather report for your location is: ${JSON.stringify(latestWeather.data)}`
        };
        await transporter.sendMail(mailOptions);
    }
};

// Schedule weather report emails every 3 hours
setInterval(sendWeatherReport, 3 * 60 * 60 * 1000);

module.exports = { sendWeatherReport };
