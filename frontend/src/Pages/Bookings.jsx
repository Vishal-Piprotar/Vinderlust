import React, { useEffect, useState, useContext } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0,10)
    
    const fetchBookings = async () => {
      if (!currentUser) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'bookings'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        let bookingsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Sort bookings by checkInDate in descending order
        bookingsData.sort((a, b) => new Date(b.checkInDate) - new Date(a.checkInDate));
        
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentUser]);

  const getBookingStatus = (checkInDate) => {
    const currentDate = new Date();
    const bookingDate = new Date(checkInDate);

    if (bookingDate >= currentDate.setHours(0, 0, 0, 0)) {
      return "Upcoming";
    } else {
      return "Past";
    }
  };

  const handleBookingClick = (booking) => {
    if (booking.status === 'Cancelled') {
      alert('This booking has been cancelled.');
      return;
    }
    navigate(`/paymentsuccess?reference=${booking.id}`);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, {
        status: 'Cancelled'
      });
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
        )
      );
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setError('Failed to cancel booking.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>{error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 pt-40">
      <div className="max-w-5xl mx-auto px-4 ">
        <h1 className="text-3xl font-semibold mb-6 text-center">Your Bookings</h1>
        {bookings.map(booking => (
          <div 
            key={booking.id} 
            className="bg-white flex flex-col lg:flex-row p-6 rounded-lg shadow-xl mb-6 cursor-pointer border border-orange-600"
            onClick={() => handleBookingClick(booking)}
          >
            <div className="lg:w-1/3">
              <img 
                src={booking.roomDetails.image} 
                alt={booking.hotelDetails.name} 
                className="w-full h-auto max-h-40 object-cover rounded-lg mb-4 lg:mb-0 lg:rounded-l-lg"
              />
            </div>
            <div className="lg:w-2/3 lg:pl-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">{booking.hotelDetails.name}</h2>
                <p className="mb-2"><strong>Check-In Date:</strong> {format(new Date(booking.checkInDate), 'PPP')}</p>
                <p className="mb-2"><strong>Check-Out Date:</strong> {format(new Date(booking.checkOutDate), 'PPP')}</p>
                <p className="mb-2"><strong>Total Amount:</strong> Rs. {booking.price}</p>
                <p className="mb-2"><strong>Payment ID:</strong> {booking.id}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className={`text-sm font-semibold ${getBookingStatus(booking.checkInDate) === 'Upcoming' ? 'text-green-500 px-3 py-2 border border-green-500 rounded-lg' : 'text-red-500 px-3 py-2 border border-red-500 rounded-lg'}`}>
                  {booking.status === 'Cancelled' ? 'Cancelled' : getBookingStatus(booking.checkInDate)}
                </span>
                <div className='flex flex-col lg:flex-row gap-2'>
                  {booking.status !== 'Cancelled' && (
                    <button 
                      className="text-orange-500 px-3 py-1 border border-orange-500 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer transition mr-2"
                      onClick={() => handleBookingClick(booking)}
                    >
                      View Booking
                    </button>
                  )}
                  {getBookingStatus(booking.checkInDate) === 'Upcoming' && booking.status !== 'Cancelled' && (
                    <button 
                      className="text-red-500 px-3 py-1 border border-red-500 rounded-md hover:bg-red-500 hover:text-white cursor-pointer transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelBooking(booking.id);
                      }}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
