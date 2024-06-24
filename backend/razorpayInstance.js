// razorpayInstance.js
const Razorpay = require('razorpay');

const instance = new Razorpay({
    key_id: process.env.YOUR_KEY_ID,
    key_secret: process.env.YOUR_KEY_SECRET,
});

module.exports = instance;
