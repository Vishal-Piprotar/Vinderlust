import React, { useContext, useState } from 'react';
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { HotelContext } from '../context/HotelContext';

function LocationDropdown() {
  const { city, setCity, cities } = useContext(HotelContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as='div' className='dropdown relative'>
      <MenuButton className='dropdown-btn w-full text-left' onClick={() => setIsOpen(!isOpen)}>
        <RiMapPinLine className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-medium leading-tight'>{city}</div>
          <div className='text-[13px]'>Select Your Place</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className='dropdown-icon-secondary' />
        ) : (
          <RiArrowDownSLine className='dropdown-icon-secondary' />
        )}
      </MenuButton>
      <MenuItems className='dropdown-menu absolute w-full bg-white shadow-lg rounded-md py-2 mt-1'>
        {cities.map((cityOption, index) => (
          <MenuItem key={index} as='div' className='px-4 py-2 hover:border hover:border-orange-500 hover:rounded-lg cursor-pointer hover:text-orange-500 transition hover:bg-gray-100' onClick={() => { setCity(cityOption); setIsOpen(false); }}>
            {cityOption}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default LocationDropdown;
