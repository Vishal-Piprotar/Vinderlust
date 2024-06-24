import React, { useContext } from 'react';
import { HotelContext } from '../context/HotelContext';
import Room from '../Component/Room';
import { Link } from 'react-router-dom';
// import RoomDropDown from '../Component/RoomDropdown'; // Adjust the import path as necessary

const RoomList = () => {
  const { selectedHotels, loading, selectedHotel, price } = useContext(HotelContext);

  // Log the selectedHotels object for debugging
  console.log('Selected Hotels:', selectedHotels);

  // Function to check if the price range is default
  const isDefaultPriceRange = (str) => str === 'Price range (any)';

  // Function to get min and max price from the price range
  const getPriceRange = (price) => {
    if (isDefaultPriceRange(price)) return [0, Infinity];
    const priceRange = price.split(' ');
    const minPrice = parseInt(priceRange[0].replace('₹', ''));
    const maxPrice = priceRange[2] ? parseInt(priceRange[2].replace('₹', '')) : Infinity;
    return [minPrice, maxPrice];
  };

  // Extract min and max price from the selected price range
  const [minPrice, maxPrice] = getPriceRange(price);

  // Filter rooms based on the selected room type and price range
  const filterRooms = (rooms) => {
    return rooms.filter(room => {
      const roomPrice = parseInt(room.price);
      const matchesType = selectedHotel === 'Room type (any)' || room.type === selectedHotel;
      const matchesPrice = roomPrice >= minPrice && roomPrice <= maxPrice;
      return matchesType && matchesPrice;
    });
  };

  // Check if no rooms were found after filtering
  const noRoomsFound = selectedHotels.every(hotel => filterRooms(hotel.rooms).length === 0);

  return (
    <section className="mb-10 lg:mb-2 mt-60 lg:mt-5 mx-auto w-full px-4  ">
      <div className="container mx-auto">
        {/* <RoomDropDown /> */}
        {loading ? (
          <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-14">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-md">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <div className='flex items-center justify-between '>
                  <div className='flex gap-2 items-center'></div>
                  <div className='flex gap-2 items-center'></div>
                </div>
                <div className="p-2">
                  <div className="h-6 bg-gray-300 mb-2"></div>
                  <div className="h-4 bg-gray-300 mb-1"></div>
                  <div className="h-4 bg-gray-300 mb-1"></div>
                  <div className="h-4 bg-gray-300 mb-1"></div>
                </div>
              </div>
            ))}
          </div>
        ) : noRoomsFound ? (
          <div className="flex justify-center items-center">
            <h2 className="text-2xl">No rooms found</h2>
          </div>
        ) : (
          <>
            {selectedHotels.map(hotel => (
              <div key={hotel.id} className="mb-8 lg:mb-12">
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 lg:mb-4 text-center text-orange-500 relative pb-2">
                    {hotel.name}
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-b-2 border-orange-500"
                      style={{ width: `${Math.min(hotel.name.length * 10, 100)}%`, height: '3px' }}>
                    </span>
                  </h2>
                </div>
                <p className="text-gray-600 mb-4 lg:mb-6 text-sm sm:text-base text-center">{hotel.city}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-14">
                  {filterRooms(hotel.rooms).map(room => (
                    <Link key={room.id} to={`/hotel/${hotel.id}/room/${room.id}`}>
                      <Room
                        room={room}
                        hotelId={hotel.id}
                        roomData={selectedHotels}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default RoomList;
