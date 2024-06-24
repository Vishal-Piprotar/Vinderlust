import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { db } from '../firebase/firebase'; // Import Firestore
import { doc, setDoc } from 'firebase/firestore';

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 10); // Scroll to the top of the page
  }, []);

  if (!bookingDetails) {
    navigate('/');
    return null;
  }

  const saveDataToFirestore = async (paymentId, orderId, paymentStatus, paymentType, paymentMethod, userLocation, paymentTime, cardDetails) => {
    try {
      const bookingId = paymentId; // Assuming paymentId is used as bookingId
      await setDoc(doc(db, 'bookings', bookingId), {
        ...bookingDetails,
       
        paymentStatus,
        paymentType,
        paymentMethod,
        userLocation, // Store user's location
        paymentTime, // Store payment time
        cardDetails, // Store card details
      });

      // Assuming you want to store user details
      await setDoc(doc(db, 'users', bookingDetails.email), {
        name: bookingDetails.name,
        email: bookingDetails.email,
        mobileNumber: bookingDetails.mobileNumber,
        aadharNumber: bookingDetails.aadharNumber
      });

      // Assuming you want to store hotel details
      await setDoc(doc(db, 'hotels', bookingDetails.hotelDetails.id), {
        name: bookingDetails.hotelDetails.name,
        address: bookingDetails.hotelDetails.address,
        city: bookingDetails.hotelDetails.city,
      });

      // Assuming you want to store room details
      await setDoc(doc(db, 'rooms', bookingDetails.roomDetails.id), {
        ...bookingDetails.roomDetails
      });

    } catch (error) {
      console.error("Error saving data to Firestore:", error);
      setError("There was an error saving the booking details. Please try again.");
    }
  };

  const checkoutHandler = async (amount) => {
    setLoading(true);
    setError(null);
    try {
      const { data: { key } } = await axios.get('https://vinderlust-backend.onrender.com/api/getKey');
      const { data: { order } } = await axios.post('https://vinderlust-backend.onrender.com/api/checkout', { amount });

      // Fetch user's location using Geolocation API
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        // Fetch location name using reverse geocoding
        const locationName = await getLocationName(latitude, longitude);

        const paymentTime = new Date(); // Store current time as payment time

        const options = {
          key,
          amount: order.amount,
          currency: "INR",
          name: bookingDetails.hotelDetails.name,
          description: "Test Transaction",
          "image":bookingDetails.roomDetails.image,
          order_id: order.id,
          callback_url: "https://vbook-backend.onrender.com/api/paymentverification",
          prefill: {
            name: bookingDetails.name,
            email: bookingDetails.email,
            contact: bookingDetails.mobileNumber
          },
          handler: async function (response) {
            const { razorpay_payment_id, razorpay_order_id } = response;
            // Assuming payment status is successful
            const paymentStatus = 'success';
            const paymentType = 'Razorpay'; // Assuming payment method is Razorpay
            // Call the verification API
            
              // Save data to Firestore
              await saveDataToFirestore(
                razorpay_payment_id,
                order.id,
                paymentStatus,
                paymentType,
                'Online', // Payment method (assuming it's online)
                locationName, // Pass location name
                paymentTime, // Pass payment time
                'Card details here' // Replace with actual card details
              );
              // On successful verification, navigate to the success page
              navigate(`/paymentsuccess?reference=${razorpay_payment_id}`);
            
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            }
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }, (error) => {
        console.error("Error fetching user's location:", error);
        setError("Error fetching user's location. Please make sure you have enabled location services.");
        setLoading(false);
      });
    } catch (error) {
      console.error("There was an error processing the checkout:", error);
      setError("There was an error processing the checkout. Please try again.");
      setLoading(false);
    }
  };

  // const handlePayment = () => {
  //   const amount = bookingDetails.price * 100; 
  //   // Convert the price to paise
  //   const extractedNumber = amount.toString().replace(/\D/g, '');
  //   console.log("Extracted Number:", extractedNumber);
  //   checkoutHandler(amount);
  // };

  const handlePayment = () => {
    // Example string
    const priceString = bookingDetails.price;
    
    // Extract numeric part as string
    const extractedNumber = priceString.match(/\d+\.\d+/)[0];
  
    // Convert extractedNumber to a number
    const amount = parseFloat(extractedNumber) * 100; // Convert to paise
  
    
  
    checkoutHandler(amount); // Pass the full amount to your checkout handler
  };
  

  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`);
      const addressComponents = response.data.results[0].address_components;
      let locationName = '';
      // Loop through address components to find the locality or city
      addressComponents.forEach(component => {
        if (component.types.includes('locality') || component.types.includes('administrative_area_level_1')) {
          locationName = component.long_name;
        }
      });
      return locationName;
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Unknown";
    }
  };

  return (
    <div className='mb-20'>
      <div className="bg-gray-100 min-h-screen flex justify-center items-center px-4 pt-32">
        <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-6 text-center">Booking Details</h1>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="mb-6 lg:flex lg:justify-between">
            <div className="w-full lg:w-2/3 pr-0 lg:pr-8 mb-10 p-5 lg:p-0">
              <h2 className="text-xl font-bold mb-2 underline">Room Details</h2>
              <p><strong>Hotel Name:</strong> {bookingDetails.hotelDetails.name}</p>
              <p><strong>Address:</strong> {bookingDetails.hotelDetails.address}</p>
              <p><strong>City:</strong> {bookingDetails.hotelDetails.city}</p>
              <p><strong>Number of Adults:</strong> {bookingDetails.numAdults}</p>
              <p><strong>Number of Kids:</strong> {bookingDetails.numKids}</p>
              <p><strong>Check-In Date:</strong> {bookingDetails.checkInDate}</p>
              <p><strong>Check-Out Date:</strong> {bookingDetails.checkOutDate}</p>
              <p><strong>Price per Night:</strong> {bookingDetails.price}</p>
            </div>
            <div className="w-full lg:w-7/10 pl-0 lg:pl-8">
              {bookingDetails.roomDetails.image && (
                <img src={bookingDetails.roomDetails.image} alt="Room" className="mb-4 rounded-lg w-full" />
              )}
            </div>
          </div>

          <div className="mb-6 p-5 lg:p-0">
            <h2 className="text-xl font-bold mb-2 underline">User Details</h2>
            <p><strong>Name:</strong> {bookingDetails.name}</p>
            <p className='flex gap-1 lg:gap-4 items-center'><strong>Aadhar Number:</strong> {bookingDetails.aadharNumber} <FaCheck className="p-1 border rounded-full bg-green-500 text-white" size={20} /></p>
            <p className='flex gap-1 lg:gap-4 items-center'><strong>Mobile Number:</strong> {bookingDetails.mobileNumber}<FaCheck className="p-1 border rounded-full bg-green-500 text-white" size={20} /></p>
            <p><strong>Email:</strong> {bookingDetails.email}</p>
          </div>

          <div>
            <button
              onClick={handlePayment}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
