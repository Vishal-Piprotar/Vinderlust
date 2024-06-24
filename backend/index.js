const express = require('express');
require('dotenv/config');
const cors = require('cors');
const connectDB = require('./config/db.js');
const paymentRoute = require('./route/payment.js'); // Ensure this path is correct

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("Working Backend");
});

app.get('/api/getKey', (req, res) => res.status(200).json({ key: process.env.YOUR_KEY_ID }));

// Payment Route
app.use('/api', paymentRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
