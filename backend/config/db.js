const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // Increase the socket timeout
            // socketTimeoutMS: 30000, // 30 seconds
            // // Increase the connection timeout
            // connectTimeoutMS: 30000, // 30 seconds
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);  // Exit process with failure
    }
};