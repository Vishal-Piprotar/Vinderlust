import React, { useState, createContext, useEffect } from 'react';
import { roomData } from '../Data/data'; // Adjust the path as necessary

export const HotelContext = createContext();

const HotelContextProvider = ({ children }) => {
  const [hotels, setHotels] = useState(roomData);
  const [city, setCity] = useState('Location (any)');
  const [cities, setCities] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('Room type (any)');
  const [selectedHotels, setSelectedHotels] = useState(roomData);
  const [price, setPrice] = useState('Price range (any)');
  const [loading, setLoading] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    const allCities = [...new Set(roomData.map(hotel => hotel.city))];
    setCities(['City (any)', ...allCities]);
  }, []);

  const handleClick = () => {
    setLoading(true);
    setSearchClicked(true);
    const isDefault = (str) => str.split(' ').includes('(any)');

    let minPrice = 0;
    let maxPrice = Infinity;

    if (!isDefault(price)) {
      const priceRange = price.split(' ');
      minPrice = parseInt(priceRange[0].replace('₹', ''));
      maxPrice = parseInt(priceRange[2].replace('₹', '')) || Infinity;
    }

    const newHotels = roomData.filter(hotel => {
      const matchesCity = isDefault(city) || hotel.city === city;
      const matchesType = isDefault(selectedHotel) || hotel.rooms.some(room => room.type === selectedHotel);
      const matchesPrice = hotel.rooms.some(room => {
        const roomPrice = parseInt(room.price);
        return roomPrice >= minPrice && roomPrice <= maxPrice;
      });

      return matchesCity && matchesType && matchesPrice;
    });

    setSelectedHotels(newHotels);
    setLoading(false);
  };

  return (
    <HotelContext.Provider value={{
      city,
      setCity,
      cities,
      hotels,
      setHotels,
      price,
      setPrice,
      selectedHotel,
      setSelectedHotel,
      selectedHotels,
      setSelectedHotels,
      loading,
      setLoading,
      handleClick,
      searchClicked
    }}>
      {children}
    </HotelContext.Provider>
  );
};

export default HotelContextProvider;
