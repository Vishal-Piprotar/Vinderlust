import React, { useContext, useState } from 'react';
import Hero from '../Component/Hero';
import HotelList from '../Component/HotelList';
import RoomList from '../Component/RoomList';
import { HotelContext } from '../context/HotelContext';

function Home() {
  

  const { searchClicked } = useContext(HotelContext);

  

  return (
    <>
      <div className='min-h-[1800px]'>
        <Hero />
        {searchClicked ? <RoomList /> : <HotelList />}
          
       
      </div>
    </>
  );
}

export default Home;
