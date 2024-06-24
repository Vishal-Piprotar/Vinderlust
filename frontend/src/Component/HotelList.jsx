  import React, { useContext } from 'react';
  import { HotelContext } from '../context/HotelContext';
  import Hotel from './Hotel';
  import { Link } from 'react-router-dom';

  function HotelList() {
    const { selectedHotels, loading } = useContext(HotelContext);

    return (
      <section className="mb-10 lg:mb-2 mt-60 lg:mt-5 mx-auto w-full px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-14">
              {Array(8).fill(0).map((_, index) => (
                <div key={index} className="border p-4 rounded-lg shadow-md">
                  <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                  <div className="p-2">
                    <div className="h-6 bg-gray-300 mb-2"></div>
                    <div className="h-4 bg-gray-300 mb-1"></div>
                    <div className="h-4 bg-gray-300 mb-1"></div>
                    <div className="h-4 bg-gray-300 mb-1"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : selectedHotels.length < 1 ? (
            <div className="flex justify-center items-center">
              <h2 className="text-2xl">No hotels found</h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-14">
              {selectedHotels.map((hotel) => (
                <Link key={hotel.id} to={`/hotel/${hotel.id}`}>
                  <Hotel hotel={hotel} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  export default HotelList;
