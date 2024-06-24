import React, { useContext, useEffect } from 'react';
import { HotelContext } from '../context/HotelContext'; // Adjust the path as necessary
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Room from '../Component/Room';

const HotelDetails = () => {
  const { selectedHotels, loading } = useContext(HotelContext);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hotel = selectedHotels.find(hotel => hotel.id === Number(id));


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <>
      <section>
        <div className='relative flex justify-center items-center h-screen'>
          <img src={hotel.img} className='absolute inset-0 w-full h-full object-cover' alt={hotel.name} />
          <div className='absolute inset-0 w-full h-full bg-black opacity-70'></div>
          <h1 className='text-6xl text-white z-20 font-primary text-center'>{hotel.name}</h1>
        </div>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col lg:flex-row h-full py-16 gap-10'>
            <div className='w-full lg:w-3/5 px-6'>
              <h2 className='font-bold text-3xl'>{hotel.name}</h2>
              <p className='mb-2'>{hotel.address}, {hotel.city}</p>
              <p className='mb-10'>+91 {hotel.phoneNo}</p>
            </div>
          </div>
        </div>

        <div className='w-full text-center px-6 mb-2'>
          <h2 className='font-bold text-3xl '>Hotel Rooms</h2>
        </div>
        <div className="container mx-auto pl-5 pr-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-14">
            {hotel.rooms && hotel.rooms.map((room) => (
              <Room key={room.id} room={room} hotelId={hotel.id} roomData={selectedHotels} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelDetails;
