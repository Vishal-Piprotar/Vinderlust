import React, { useContext, useState, useEffect } from 'react';
import { RiHotelBedLine, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { HotelContext } from '../context/HotelContext';

function RoomDropdown() {
  const { selectedHotel, setSelectedHotel, hotels } = useContext(HotelContext);
  const [roomTypes, setRoomTypes] = useState(['Room type (any)']);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const types = new Set();
    hotels.forEach(hotel => {
      hotel.rooms.forEach(room => {
        types.add(room.type);
      });
    });
    setRoomTypes(['Room type (any)', ...Array.from(types)]);
  }, [hotels]);

  return (
    <Menu as='div' className='dropdown relative'>
      <MenuButton className='dropdown-btn w-full text-left' onClick={() => setIsOpen(!isOpen)}>
        <RiHotelBedLine className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-medium leading-tight'>{selectedHotel}</div>
          <div className='text-[13px]'>Select Room Type</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className='dropdown-icon-secondary' />
        ) : (
          <RiArrowDownSLine className='dropdown-icon-secondary' />
        )}
      </MenuButton>
      <MenuItems className='dropdown-menu absolute w-full bg-white shadow-lg rounded-md py-2 mt-1'>
        {roomTypes.map((type, index) => (
          <MenuItem key={index} as='div' className='px-4 py-2 hover:border hover:border-orange-500 hover:rounded-lg cursor-pointer hover:text-orange-500 transition' onClick={() => { setSelectedHotel(type); setIsOpen(false); }}>
            {type}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default RoomDropdown;
