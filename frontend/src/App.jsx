import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Header from './Component/Header';
import Footer from './Component/Footer';
import RoomDetails from './Pages/RoomDetails';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './context/AuthContext';
import Error from './Pages/Error'
import DetailsPage from './Component/DetailsPage';
import PaymentSuccess from './Component/PaymentSuccess';
import HotelDetails from './Pages/HotelDetails';
import BookingForm from './Component/BookingForm'
import Bookings from './Pages/Bookings';
import Profile from './Component/Profile';
import About from './Component/About';
import Contact from './Component/Contact';
import NoData from './Component/NoData';

function App() {
  return (
    <>
      <AuthProvider>

        <div className='bg-white'>
          <BrowserRouter>
            <Header  />
            <ToastContainer />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/about' element={<About/>} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/no-data' element={<NoData />} />
              <Route path='/bookings' element={<Bookings />} />
              <Route path='/hotel/:id' element={<HotelDetails />} />
              <Route path="/hotel/:hotelId/room/:roomId" element={<RoomDetails />} />
              <Route path="/hotel/:hotelId/room/:roomId/bookRoom" element={<BookingForm />} />
              <Route path="/details" element={<DetailsPage />} />
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
              <Route path='*' element={<Error />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </>
  )
}

export default App