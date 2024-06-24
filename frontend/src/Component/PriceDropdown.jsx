import React, { useContext, useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { HotelContext } from '../context/HotelContext';
import { RiMoneyRupeeCircleFill } from 'react-icons/ri'; // Correct import for TiCoinRupee

function PriceRangeDropdown() {
  const { price, setPrice } = useContext(HotelContext);
  const [isOpen, setIsOpen] = useState(false);

  const prices = [
    'Price range (any)',
    '₹600 - ₹799',
    '₹800 - ₹999',
    '₹1000 - ₹1199',
    '₹1200 - ₹1399',
    '₹1400 - ₹1599',
    '₹1600 - ₹1799',
    '₹1800 - ₹1999',
    '₹2000 - ₹2499',
    '₹2500 - ₹2999',
    '₹3000 and above'
  ];

  return (
    <Menu as='div' className='dropdown relative'>
      <MenuButton className='dropdown-btn w-full text-left' onClick={() => setIsOpen(!isOpen)}>
      <RiMoneyRupeeCircleFill className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-medium leading-tight'>{price}</div>
        
          <div className='text-[13px]'> Select Price Range</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className='dropdown-icon-secondary' />
        ) : (
          <RiArrowDownSLine className='dropdown-icon-secondary' />
        )}
      </MenuButton>
      <MenuItems className='dropdown-menu absolute w-full bg-white shadow-lg rounded-md py-2 mt-1'>
        {prices.map((priceRange, index) => (
          <MenuItem key={index} as='div' className='px-4 py-2 hover:border hover:border-orange-500 hover:rounded-lg cursor-pointer hover:text-orange-500 transition' onClick={() => { setPrice(priceRange); setIsOpen(false); }}>
            {priceRange}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default PriceRangeDropdown;
