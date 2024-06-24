import React, { useEffect, useState } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { FaBed  } from 'react-icons/fa';
// import { FaArrowRightLong } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";

import {AiOutlineFullscreen} from 'react-icons/ai'

function Room({ room, hotelId, roomData }) {
  const { id, type, star, image, bed,size, rating, price, maxPerson, hotelName } = room;

  const [roomDataForHotel, setRoomDataForHotel] = useState(null);

  useEffect(() => {
    // Find room data for the hotel
    const hotel = roomData.find(hotel => hotel.id === hotelId);
    if (hotel) {
      const room = hotel.rooms.find(room => room.id === id);
      setRoomDataForHotel(room);
    }
  }, [hotelId, id, roomData]);

  return (
    <Link to={`/hotel/${hotelId}/room/${id}`} >
      <div className='border p-3 rounded-lg shadow-sm hover:shadow-2xl w-full transition duration-300 my-2 cursor-pointer group'>
        <div className='overflow-hidden rounded-lg'>
          <img src={image} alt={hotelName} className='rounded-lg transform transition-transform duration-300 hover:scale-110' />
        </div>

        <div className='mb-4 flex gap-x-2 text-sm mt-2'>
          <div className='rounded-full px-3 py-1 text-white bg-orange-500'>{star} ⭐</div>
          <div className='rounded-full px-3 py-1 text-white bg-pink-500'>{type}</div>
        </div>

        <div className='text-lg font-semibold mb-2 max-w-[260px] truncate hover:text-orange-600 cursor-pointer'>{hotelName}</div>
        
        <div className='flex items-center justify-between '>
          <div className='flex gap-2 items-center'><BsPeopleFill color='gray' size={20} />{maxPerson}</div>
          <div className='flex gap-2 items-center'><AiOutlineFullscreen  size={20} style={{ fontWeight: 'bold' }} />{size} <span>m<sup>2</sup></span></div>
        </div>

        <div className='flex justify-between items-center mt-2'>
          <div>Rs. {price}</div>
          <div className=''>
          {/* <FaArrowRightLong /> */}
          <GoArrowRight  width={100} className='font-bold group-hover:text-orange-500'/>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Room;
