import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { HotelContext } from '../context/HotelContext';
import { AuthContext } from '../context/AuthContext';
import { TbAirConditioning } from "react-icons/tb";
import { AiOutlineDesktop } from "react-icons/ai";
import { IoWifi } from "react-icons/io5";
import { PiCookingPotFill } from "react-icons/pi";
import { MdElectricMeter } from "react-icons/md";
import { FiSpeaker } from "react-icons/fi";
import { FaParking, FaHotTub, FaUserCircle, FaCheck } from "react-icons/fa";
import { GiElevator } from "react-icons/gi";
import { FaCreditCard } from "react-icons/fa6";
import { PiSecurityCameraFill } from "react-icons/pi";
import { CiCircleCheck } from "react-icons/ci";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterModal from '../Component/RegisterModal';
import LoginModal from '../Component/LoginModal';

const RoomDetails = () => {
  const { selectedHotels } = useContext(HotelContext);
  const { currentUser } = useContext(AuthContext);
  const { hotelId, roomId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numAdults, setNumAdults] = useState(1);
  const [numKids, setNumKids] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const parsedHotelId = Number(hotelId);
    const parsedRoomId = Number(roomId);

    const foundHotel = selectedHotels.find(hotel => hotel.id === parsedHotelId);
    if (!foundHotel) {
      toast.error('Hotel not found');
      return;
    }

    const foundRoom = foundHotel.rooms ? foundHotel.rooms.find(room => room.id === parsedRoomId) : null;
    if (!foundRoom) {
      toast.error('Room not found');
      return;
    }

    setHotel(foundHotel);
    setRoom(foundRoom);
  }, [hotelId, roomId, selectedHotels]);

  // Add this function to fetch reviews
  const fetchReviews = async () => {
    try {
      const q = query(collection(db, 'reviews'), where('roomId', '==', roomId));
      const querySnapshot = await getDocs(q);
      const fetchedReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [roomId]);

  if (!hotel || !room) {
    return <div>Loading...</div>;
  }

  const amenities = [
    { icon: <TbAirConditioning size={30} />, name: 'AC' },
    { icon: <AiOutlineDesktop size={30} />, name: 'TV' },
    { icon: <IoWifi size={30} />, name: 'Free Wifi' },
    { icon: <PiCookingPotFill size={30} />, name: 'Kitchen' },
    { icon: <MdElectricMeter size={30} />, name: 'Power backup' },
    { icon: <FiSpeaker size={30} />, name: 'Geyser' },
    { icon: <FaParking size={30} />, name: 'Parking facility' },
    { icon: <FaHotTub size={30} />, name: 'Room Heater' },
    { icon: <GiElevator size={30} />, name: 'Elevator' },
    { icon: <FaCreditCard size={30} />, name: 'Card payment' },
    { icon: <PiSecurityCameraFill size={30} />, name: 'CCTV cameras' },
    { icon: <CiCircleCheck size={30} />, name: 'Reception' },
    { icon: <CiCircleCheck size={30} />, name: 'Security' }
  ];

  const amenitiesToShow = showMore ? amenities : amenities.slice(0, 6);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReview.trim()) {
      const newReviewObj = {
        roomId: roomId,
        text: newReview,
        user: currentUser ? currentUser.displayName : 'Anonymous',
        photoURL: currentUser ? currentUser.photoURL : null,
        timestamp: new Date()
      };
      try {
        await addDoc(collection(db, 'reviews'), newReviewObj);
        setNewReview('');
        fetchReviews(); // Fetch reviews again to include the new review
        toast.success('Review added successfully!');
      } catch (error) {
        console.error('Error adding review:', error);
        toast.error('Error adding review');
      }
    }
  };

  const handleAdultsChange = (change) => {
    setNumAdults((prev) => Math.max(1, prev + change));
  };

  const handleKidsChange = (change) => {
    setNumKids((prev) => Math.max(0, prev + change));
  };

  const totalPrice = () => {
    let basePrice = Number(room.price) || 0;
    let extraAdults = Math.max(0, numAdults - 2);
    let kidsPrice = numKids * 500;

    // Calculate total price for the first day
    let totalPriceFirstDay = basePrice + (extraAdults * 1000) + kidsPrice;

    // If booking is for more than 1 day, calculate total price for additional days
    let numDays = 1; // Default to 1 day if check-in and check-out are the same day
    if (checkInDate && checkOutDate) {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      const timeDiff = endDate.getTime() - startDate.getTime();
      numDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Calculate number of days
    }

    let totalPrice = totalPriceFirstDay * numDays;

    // Apply a 10% discount if booking is for more than 1 day
    if (numDays > 1) {
      totalPrice *= 0.9; // Apply a 10% discount
    }

    // console.log(totalPrice);
    return totalPrice;
  };


  const formatPrice = (priceFunc) => {
    try {
      const total = priceFunc();
      // console.log('Total Price:', total);
      return `Rs ${total.toFixed(2)} for ${checkInDate && checkOutDate ? `${(new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 3600 * 24)} night(s)` : '1 night'}`;
    } catch (error) {
      console.error('Error calculating total price:', error);
      return 'Price not available';
    }
  };
  

  const handleBookNow = (e) => {
    e.preventDefault();

    if (currentUser) {
      const roomData = {
        hotelName: hotel.name,
        description: room.description,
        address: hotel.address,
        city: hotel.city,
        imageLg: room.imageLg,
        image: room.image,
        price: room.price,
      };

      navigate(`/hotel/${hotelId}/room/${roomId}/bookRoom`, {
        state: {
          numAdults,
          numKids,
          checkInDate,
          checkOutDate,
          formattedTotalPrice: formatPrice(totalPrice),
          roomData,
        },
      });
      toast.success('Booking room...');
    } else {
      toast.info('Please register or log in to book a room.', {
        position: "top-right",
      });
      setTimeout(() => {
        setShowLoginModal(true);
      }, 1000);
      // navigate('/')
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isFormValid = () => {
    return checkInDate && checkOutDate && (new Date(checkInDate) < new Date(checkOutDate));
  };

  return (
    <>
      <ToastContainer />
      <section>
        <div className='relative flex justify-center items-center h-screen'>
          <img src={room.image} className='absolute inset-0 w-full h-full object-cover' alt='' />
          <div className='absolute inset-0 w-full h-full bg-black opacity-70'></div>
          <h1 className='text-6xl text-white z-20 font-primary text-center'>{hotel.name}</h1>
        </div>

        <div className='container mx-auto px-4'>
          <div className='flex flex-col lg:flex-row h-full py-16 gap-10'>
            <div className='w-full lg:w-3/5 px-6'>
              <h2 className='font-bold text-3xl'>{hotel.name}</h2>
              <p className='mb-8'>{hotel.address}, {hotel.city}</p>
              <img className='mb-8 rounded-lg w-full max-w-[800px]' src={room.imageLg} alt='' />
              <div className='mt-8'>
                <h3 className='mb-3 font-semibold text-3xl'>Room Facilities</h3>
                <p className='mb-12'>{room.description}</p>
                <h3 className='mb-3 font-semibold text-3xl'>Amenities</h3>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mb-12'>
                  {amenitiesToShow.map((item, index) => (
                    <div key={index} className='flex items-center gap-2'>
                      {item.icon}
                      {item.name}
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowMore(!showMore)} className='px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-800'>
                  {showMore ? 'Show Less' : 'Show More'}
                </button>
              </div>

              {/* Review Section */}
              <div className="mt-10">
                <h3 className="text-3xl font-semibold mb-4">Reviews</h3>
                <div className="mb-6">
                  {currentUser ? (
                    <form onSubmit={handleReviewSubmit} className="flex items-center">
                      <input
                        type="text"
                        placeholder="Write a review..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        className="flex-grow mr-2 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <button
                        type="submit"
                        className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600 transition-colors duration-300"
                      >
                        Submit
                      </button>
                    </form>
                  ) : (
                    <p>Please log in to write a review.</p>
                  )}
                </div>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-gray-100 p-4 rounded-md">
                        <div className="flex items-center mb-2">
                          {review.photoURL ? (
                            <img
                              src={review.photoURL}
                              alt="Profile"
                              className="w-5 h-5 rounded-full mr-4"
                            />
                          ) : (
                            <FaUserCircle className="text-gray-500 mr-2" />
                          )}
                          <span className="font-semibold">{review.user}</span>
                        </div>
                        <p>{review.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            </div>

            <div className='w-full lg:w-2/5 mt-10 lg:mt-20 sm:p-10'>
              {/* Booking Section */}
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-3xl font-semibold mb-6'>Book Your Stay</h3>
                <form className='flex flex-col gap-4'>
                  <div>
                    <label className='block text-lg font-medium'>Adults</label>
                    <div className='flex items-center gap-2'>
                      <button
                        type='button'
                        onClick={() => handleAdultsChange(-1)}
                        className='px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-800'
                      >
                        -
                      </button>
                      <span>{numAdults}</span>
                      <button
                        type='button'
                        onClick={() => handleAdultsChange(1)}
                        className='px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-800'
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className='block text-lg font-medium'>Kids</label>
                    <div className='flex items-center gap-2'>
                      <button
                        type='button'
                        onClick={() => handleKidsChange(-1)}
                        className='px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-800'
                      >
                        -
                      </button>
                      <span>{numKids}</span>
                      <button
                        type='button'
                        onClick={() => handleKidsChange(1)}
                        className='px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-800'
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor='checkin' className='block text-lg font-medium'>Check-in Date</label>
                    <input
                      type='date'
                      min={getCurrentDate()}
                      id='checkin'
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300 focus:border-orange-500'
                    />
                  </div>
                  <div>
                    <label htmlFor='checkout' className='block text-lg font-medium'>Check-out Date</label>
                    <input
                      type='date'
                      min={getCurrentDate()}
                      id='checkout'
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300 focus:border-orange-500'
                    />
                  </div>
                  <button
                    type='submit'
                    title={isFormValid() ? 'Book Now' : 'Fill All Details Above to Book'}
                    onClick={handleBookNow}
                    className={`w-full py-3 mt-4 ${isFormValid() ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 cursor-not-allowed'} text-white rounded-lg transition`}
                    disabled={!isFormValid()}
                  >
                    Book Now
                  </button>
                </form>
                <div className='mt-4 text-2xl font-semibold'>
                  Total Price: {formatPrice(totalPrice)}
                </div>
                {isDiscountApplied && (
                  <div className="text-green-500 mb-4">
                    A 10% discount has been applied to your booking!
                  </div>
                )}
              </div>

              {/* Hotel Rules Section */}
              <div className='mt-10 lg:mt-10 p-10'>
                <h3 className='text-3xl font-semibold'>Hotel Rules</h3>
                <p className='mb-6'>Lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque</p>
                <ul className='flex flex-col gap-y-4'>
                  <li className='flex items-center gap-x-4'>
                    <FaCheck className='text-accent' color='green' />
                    Check-in : 3:00 PM - 9:00 PM
                  </li>
                  <li className='flex items-center gap-x-4'>
                    <FaCheck className='text-accent' color='green' />
                    Check-out : 10:30 AM
                  </li>
                  <li className='flex items-center gap-x-4'>
                    <FaCheck className='text-accent' color='green' />
                    No Pets
                  </li>
                  <li className='flex items-center gap-x-4'>
                    <FaCheck className='text-accent' color='green' />
                    No Smoking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <RegisterModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
        />
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
        <ToastContainer />
      </section>
    </>
  );
};

export default RoomDetails;
