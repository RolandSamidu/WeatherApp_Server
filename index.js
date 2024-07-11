require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use('/api', routes);

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
