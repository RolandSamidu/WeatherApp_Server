const express = require('express');
const connectDB = require('./db/connect');
// const cron = require('node-cron');
// const weatherService = require('../services/weatherService');
// const emailService = require('../services/emailService');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
