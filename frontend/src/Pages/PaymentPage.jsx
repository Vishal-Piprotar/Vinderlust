import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
    const location = useLocation();
    const bookingDetails = location.state;

    const [cardNumber, setCardNumber] = useState('1234567890123456'); // Dummy card number
    const [expiryDate, setExpiryDate] = useState('05/24'); // Dummy expiry date
    const [cvv, setCvv] = useState('181'); // Dummy CVV
    const [nameOnCard, setNameOnCard] = useState('VISHAL PIPROTAR'); // Dummy name on card
    const [errors, setErrors] = useState({});
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!validateCardNumber(cardNumber)) {
            validationErrors.cardNumber = 'Invalid card number';
        }
        if (!validateExpiryDate(expiryDate)) {
            validationErrors.expiryDate = 'Invalid expiry date';
        }
        if (!validateCvv(cvv)) {
            validationErrors.cvv = 'Invalid CVV';
        }
        if (!validateNameOnCard(nameOnCard)) {
            validationErrors.nameOnCard = 'Name on card is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setShowConfirmationPopup(true);
        }
    };

    const validateCardNumber = (number) => {
        const regex = /^[0-9]{16}$/;
        return regex.test(number);
    };

    const validateExpiryDate = (date) => {
        const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        return regex.test(date);
    };

    const validateCvv = (cvv) => {
        const regex = /^[0-9]{3,4}$/;
        return regex.test(cvv);
    };

    const validateNameOnCard = (name) => {
        return name.trim() !== '';
    };

    const handleConfirm = () => {
        // Simulate payment processing
        setShowConfirmationPopup(false);
        const isPaymentSuccessful = true; // Change this based on actual payment processing result
        setPaymentStatus(isPaymentSuccessful ? 'success' : 'failure');
    };

    return (
        <div className='pt-40 mb-20'>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-xl mt-12">
                <h1 className="text-2xl font-bold mb-6">Payment Page</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="cardNumber" className="block text-lg font-medium">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300 focus:border-orange-500"
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                    </div>
                    <div>
                        <label htmlFor="expiryDate" className="block text-lg font-medium">Expiry Date</label>
                        <input
                            type="text"
                            id="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300 focus:border-orange-500"
                        />
                        {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                    </div>
                    <div>
                        <label htmlFor="cvv" className="block text-lg font-medium">CVV</label>
                        <input
                            type="text"
                            id="cvv"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300 focus:border-orange-500"
                        />
                        {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                    </div>
                    <div>
                        <label htmlFor="nameOnCard" className="block text-lg font-medium">Name on Card</label>
                        <input
                            type="text"
                            id="nameOnCard"
                            value={nameOnCard}
                            onChange={(e) => setNameOnCard(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300 focus:border-orange-500"
                        />
                        {errors.nameOnCard && <p className="text-red-500 text-sm">{errors.nameOnCard}</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors mt-4"
                        >
                            Submit Payment
                        </button>
                    </div>
                </form>
            </div>

            {showConfirmationPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Confirm Payment</h2>
                        <p>Booking Details: {JSON.stringify(bookingDetails)}</p>
                        <p>Card Number: {cardNumber}</p>
                        <p>Expiry Date: {expiryDate}</p>
                        <p>CVV: {cvv}</p>
                        <p>Name on Card: {nameOnCard}</p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                onClick={() => setShowConfirmationPopup(false)}
                                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {paymentStatus === 'success' && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Payment Successful</h2>
                        <p>Your payment has been processed successfully!</p>
                        <button
                            onClick={() => setPaymentStatus(null)}
                            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {paymentStatus === 'failure' && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Payment Failed</h2>
                        <p>There was an error processing your payment. Please try again.</p>
                        <button
                            onClick={() => setPaymentStatus(null)}
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentPage;
