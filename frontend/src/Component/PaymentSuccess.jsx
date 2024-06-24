import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FaCheck } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get('reference');
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const bookingRef = doc(db, 'bookings', paymentId);
        const bookingSnap = await getDoc(bookingRef);
        if (bookingSnap.exists()) {
          setBookingDetails(bookingSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    if (paymentId) {
      fetchBookingDetails();
    }
  }, [paymentId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownloadInvoice = () => {
    if (!bookingDetails) return;

    const { name } = bookingDetails;
    const hotelName = bookingDetails.hotelDetails.name;
    const firstName = name.trim().split(' ')[0];
    const fileName = `${firstName}_${hotelName}_${paymentId}.pdf`;

    const opt = {
      margin: 1,
      filename: fileName,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a2', orientation: 'portrait' },
    };

    html2pdf().from(document.body).set(opt).save();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mx-auto px-4 max-w-7xl w-full">
        <div className="bg-white p-8 rounded-lg shadow-lg mb-10 mt-32 text-center">
          <h1 className="text-3xl font-semibold mb-6 text-green-600">Payment Successful!</h1>
          <p className="text-lg mb-4">Your payment has been processed successfully.</p>
          <h1 className="text-sm font-semibold mb-6 text-green-600 flex justify-center gap-2 items-center">
            Booking Successful! <FaCheck className="p-1 border rounded-full bg-green-500 text-white" size={20} />
          </h1>
          <p className="text-sm text-gray-600 mb-6">Payment ID: {paymentId}</p>

          <div className='flex flex-col sm:flex-row justify-center items-center gap-2 mb-6'>
            <Link to="/" className="text-orange-500 px-2 py-1 border border-orange-500 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer transition mb-2 sm:mb-0">
              Go back to Home
            </Link>
            <Link to="/bookings" className="text-orange-500 px-2 py-1 border border-orange-500 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer transition">
              Bookings
            </Link>
          </div>

          <div className='justify-start text-start overflow-x-auto' id="invoice-content">
            {bookingDetails && (
              <div className="bg-white rounded-lg shadow-2xl p-5">
                <h1 className="text-3xl font-semibold mb-6 text-center">Booking Details</h1>
                <div className="mb-6 lg:flex lg:justify-between">
                  <div className="w-full lg:w-2/3 mb-10">
                    <h2 className="text-xl font-bold mb-2 underline">User Details</h2>
                    <p><strong>Name:</strong> {bookingDetails.name}</p>
                    <p className='flex gap-1 lg:gap-4 items-center'>
                      <strong>Aadhar Number:</strong> {bookingDetails.aadharNumber}
                      <FaCheck className="p-1 border rounded-full bg-green-500 text-white" size={20} />
                    </p>
                    <p className='flex gap-1 lg:gap-4 items-center'>
                      <strong>Mobile Number:</strong> {bookingDetails.mobileNumber}
                      <FaCheck className="p-1 border rounded-full bg-green-500 text-white" size={20} />
                    </p>
                    <p><strong>Email:</strong> {bookingDetails.email}</p>

                    <div className='mt-10'>
                      <h2 className="text-xl font-bold mb-2 underline">Room Details</h2>
                      <p><strong>Hotel Name:</strong> {bookingDetails.hotelDetails.name}</p>
                      <p><strong>Address:</strong> {bookingDetails.hotelDetails.address}</p>
                      <p><strong>City:</strong> {bookingDetails.hotelDetails.city}</p>
                      <p><strong>Number of Adults:</strong> {bookingDetails.numAdults}</p>
                      <p><strong>Number of Kids:</strong> {bookingDetails.numKids}</p>
                      <p><strong>Check-In Date:</strong> {bookingDetails.checkInDate}</p>
                      <p><strong>Check-Out Date:</strong> {bookingDetails.checkOutDate}</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-2/2 pl-0 lg:pl-8">
                    {bookingDetails.roomDetails.image && (
                      <img src={bookingDetails.roomDetails.image} alt="Room" className="mb-4 rounded-lg w-full" />
                    )}
                  </div>
                </div>

                <div className="mb-2 lg:mb-0">
                  <h2 className="text-xl font-bold mb-2 underline">Payment Details:</h2>
                  <p><strong>Total Amount:</strong> Rs. {bookingDetails.price}</p>
                  <p><strong>Payment Method:</strong> {bookingDetails.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> {bookingDetails.paymentStatus}</p>
                  <p><strong>Payment Time:</strong> {bookingDetails.paymentTime && bookingDetails.paymentTime.toDate().toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>

          <div className='w-full flex items-center justify-center mt-5'>
            {bookingDetails && (
              <button
                onClick={handleDownloadInvoice}
                className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
              >
                Download Invoice
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
