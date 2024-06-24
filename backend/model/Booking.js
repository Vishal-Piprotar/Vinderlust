const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    razorpay_order_id: String,
    razorpay_payment_id: String, 
    razorpay_signature: String,
    amount: Number,
    currency: String,
    isPaid: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;