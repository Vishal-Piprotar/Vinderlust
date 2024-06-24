import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { HotelContext } from '../context/HotelContext';
import { AuthContext } from '../context/AuthContext';
import { FaCheck } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { selectedHotels } = useContext(HotelContext);
  const location = useLocation();
  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numKids, setNumKids] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [name, setName] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [formattedTotalPrice, setFormattedTotalPrice] = useState('');
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [aadharVerified, setAadharVerified] = useState(false);


  
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 20);
    }, 20); // Slight delay to ensure component is fully rendered
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }
    const parsedHotelId = Number(hotelId);
    const parsedRoomId = Number(roomId);

    const foundHotel = selectedHotels.find(hotel => hotel.id === parsedHotelId);
    // console.log('Found Hotel:', foundHotel);
    if (!foundHotel) {
      console.error('Hotel not found:', parsedHotelId);
      toast.error('Hotel not found');
      return;
    }

    const foundRoom = foundHotel.rooms ? foundHotel.rooms.find(room => room.id === parsedRoomId) : null;
    // console.log('Found Room:', foundRoom);
    if (!foundRoom) {
      console.error('Room not found:', parsedRoomId);
      toast.error('Room not found');
      return;
    }

    setHotel(foundHotel);
    setRoom(foundRoom);
  }, [hotelId, roomId, selectedHotels]);

  useEffect(() => {
    if (location.state) {
      setNumAdults(location.state.numAdults || 1);
      setNumKids(location.state.numKids || 0);
      setCheckInDate(location.state.checkInDate || '');
      setCheckOutDate(location.state.checkOutDate || '');
      setFormattedTotalPrice(location.state.formattedTotalPrice || '');
    }
  }, [location.state]);

  if (!hotel || !room) {
    return <div>Loading...</div>;
  }

  const handleSendOTP = () => {
    const generatedOTP = '123456';
    setOtp(generatedOTP);
    setOtpSent(true);
    toast.info('OTP sent to your mobile number.');
  };

  const handleVerifyOTP = () => {
    if (otp === enteredOtp) {
      setAadharVerified(true);
      toast.success('Mobile Number verified successfully!');
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const handleAadharChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedAadhar = input.match(/.{1,4}/g)?.join('-') || '';
    setAadharNumber(formattedAadhar);
  };

  const handleMobileChange = (e) => {
    let formattedMobileNumber = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (formattedMobileNumber.length > 0 && formattedMobileNumber[0] !== '9') {
      formattedMobileNumber = '+91' + formattedMobileNumber;
    }
    formattedMobileNumber = formattedMobileNumber.slice(0, 12); // Limit length to 12 characters (including '+91')
    setMobileNumber(formattedMobileNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!aadharVerified) {
      toast.error('Please verify Aadhar before proceeding.');
      return;
    }

    const bookingDetails = {
      userId: currentUser?.uid,
      roomId: room.id,
      hotelDetails: hotel,

      numAdults,
      numKids,
      checkInDate,
      checkOutDate,
      name,
      price:formattedTotalPrice,
      aadharNumber,
      mobileNumber,
      email: currentUser?.email,
      roomDetails: room,
    };

    navigate('/details', { state: bookingDetails });
  };

  return (
    <>
      <div className='pt-40 lg:pt-25 relative mb-20'>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-xl ">
          <ToastContainer />
          <h1 className="text-2xl font-bold mb-6">Booking Form</h1>
          {room && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Room Details</h2>
              <p><strong>Hotel Name:</strong> {hotel.name}</p>
              <p><strong>Address:</strong> {hotel.address}</p>
              <p><strong>City:</strong> {hotel.city}</p>
              <p><strong>Number of Adults:</strong> {numAdults}</p>
              <p><strong>Number of Kids:</strong> {numKids}</p>
              <p><strong>Check-In Date:</strong> {checkInDate}</p>
              <p><strong>Check-Out Date:</strong> {checkOutDate}</p>
              {currentUser && (
                <p><strong>Email:</strong> {currentUser.email}</p>
              )}
              <p><strong>Price per Night:</strong> Rs. {formattedTotalPrice}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor='name' className='block text-lg font-medium'>Name</label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300 focus:border-orange-500'
              />
            </div>
            <div>
              <label htmlFor='aadhar' className='block text-lg font-medium'>Aadhar Number</label>
              <input
                type='text'
                id='aadhar'
                value={aadharNumber}
                onChange={handleAadharChange}
                maxLength="14"
                placeholder="XXXX-XXXX-XXXX"
                className='w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300 focus:border-orange-500'
              />
            </div>
            <div>
              <label htmlFor='mobile' className='block text-lg font-medium'>Registered Mobile Number</label>
              <input
                type='text'
                id='mobile'
                value={mobileNumber}
                onChange={handleMobileChange}
                className='w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300 focus:border-orange-500'
              />
            </div>
            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={!aadharNumber || !mobileNumber}
                className={`w-full py-2 px-4 rounded-md mt-4 transition-colors ${aadharNumber && mobileNumber ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Send OTP
              </button>
            ) : (
              <div>
                <div className="relative flex items-center">
                  <input
                    type='text'
                    placeholder='Enter OTP 123456'
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    disabled={aadharVerified}
                    className={`w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300 focus:border-orange-500 mt-4 ${aadharVerified ? 'bg-gray-100' : ''}`}
                  />
                  {aadharVerified && (
                    <FaCheck className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-500 bg-green-200 rounded-full p-1 mt-2" size={20} />
                  )}
                </div>
                 <div> <p>** <b>use 123456</b>  </p></div>

                {!aadharVerified && (
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={!enteredOtp}
                    className={`w-full py-2 px-4 rounded-md mt-4 transition-colors ${enteredOtp ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    Verify OTP
                  </button>
                )}
              </div>
            )}
            {aadharVerified && (
              <div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors mt-4"
                >
                  Proceed to Payment
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
