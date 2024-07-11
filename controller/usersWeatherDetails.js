const User = require('./models/user');
const weatherService = require('./weatherService');
const emailService = require('./emailService');

// Route to store user details
router.post('/users', async (req, res) => {
    try {
        const { email, location } = req.body;
        const user = new User({ email, location });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to update user's location
router.put('/users/:email/location', async (req, res) => {
    try {
        const { email } = req.params;
        const { location } = req.body;
        const user = await User.findOneAndUpdate({ email }, { location }, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to get weather data for a given day
router.get('/users/:email/weather', async (req, res) => {
    try {
        const { email } = req.params;
        const { date } = req.query;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        const weatherData = user.weatherData.filter(data => new Date(data.date).toDateString() === new Date(date).toDateString());
        res.json(weatherData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});