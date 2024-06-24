import React, { useContext } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import LocationDropdown from './LocationDropdown';
import RoomDropdown from './RoomDropdown';
import PriceRangeDropdown from './PriceDropdown';
import { HotelContext } from '../context/HotelContext';

function Search() {
  const { handleClick } = useContext(HotelContext);

  const handleSearch = () => {
    handleClick();
  };

  return (
    <div className='w-full flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 mx-auto max-w-[1170px] py-3 px-[30px] relative lg:top-10 lg:shadow-1 bg-white lg:bg-white lg:backdrop-blur rounded-lg border-2 border-gray-300 lg:border-none'>
      <LocationDropdown />
      <RoomDropdown />
      <PriceRangeDropdown />
      <button
        onClick={handleSearch}
        className='bg-orange-500 hover:bg-orange-800 transition w-full lg:max-w-[60px] h-16 rounded-lg flex justify-center items-center text-white'
      >
        <RiSearch2Line size={24} />
      </button>
    </div>
  );
}

export default Search;
