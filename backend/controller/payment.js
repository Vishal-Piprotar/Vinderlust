const instance = require('../razorpayInstance'); // Adjust the path as needed
const crypto = require('crypto');
const Booking = require('../model/Booking.js');

module.exports.Checkout = async (req, res) => {
    // console.log('instance object:', instance); // Add this line
    try {
        const options = {
            amount: Number(req.body.amount), // Amount in smallest currency unit
            currency: "INR"
        };
        const order = await instance.orders.create(options);

        // Save order details to MongoDB
        const newOrder = new Booking({
            razorpay_order_id: order.id,
            amount: options.amount,
            currency: options.currency,
            isPaid: false,
        });
        await newOrder.save();

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

module.exports.PaymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', process.env.YOUR_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        try {
            // Update order as paid in MongoDB
            await Booking.findOneAndUpdate(
                { razorpay_order_id },
                { razorpay_payment_id, razorpay_signature, isPaid: true }
            );

            // Redirect to paymentsuccess page with reference number
            res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`);
        } catch (error) {
            console.error("Error updating order:", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: "Invalid signature",
        });
    }
};
