const express = require('express');
const { Checkout, PaymentVerification } = require('../controller/payment.js');

const router = express.Router();

// Route to initiate checkout
router.post('/checkout', Checkout);

// Route to handle payment verification
router.post('/paymentverification', PaymentVerification);

module.exports = router;
