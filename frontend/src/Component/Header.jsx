import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiMenuAltRight, BiX } from "react-icons/bi";
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import defaultProfileImage from '../assets/userImg.png';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RxExit } from "react-icons/rx";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Use navigate hook

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleRegisterModal = () => {
    setIsRegisterModalOpen(!isRegisterModalOpen);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLogout = async () => {
    try {
      toast.success('Logout successful');
      setTimeout(() => {
        logout();
        navigate('/'); // Navigate to home page after logout
      }, 2000);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    if (isMenuOpen || isRegisterModalOpen || isLoginModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen, isRegisterModalOpen, isLoginModalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { label: "Profile", path: "/profile" },
    { label: "Settings", path: "/" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleDropDown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleDropDown);
    return () => {
      document.removeEventListener("click", handleDropDown);
    };
  }, []);

  return (
    <header className={`py-6 mb-12 fixed w-full z-50 transition-all ${hasScrolled ? 'bg-white shadow-lg backdrop-blur' : 'bg-transparent'}`}>
      <div className='container flex justify-between items-center mx-auto px-4 relative'>
        <Link to='/' className={`text-3xl font-semibold text-orange-500`}>Vinderlust</Link>
        <div className='flex items-center gap-6'>
          <button onClick={toggleMenu} className='relative block md:hidden focus:outline-none'>
            {isMenuOpen ? <BiX size={30} color={hasScrolled ? 'black' : 'white'} /> : <BiMenuAltRight size={30} color={hasScrolled ? 'black' : 'white'} />}
          </button>
          <div className={`absolute top-16 right-0 w-full h-auto p-10 pt-10 md:pt-0 md:p-0 lg:pt-0 md:relative md:top-0 md:w-auto md:flex md:flex-row items-center gap-6 bg-white md:bg-transparent ${isMenuOpen ? 'flex flex-col items-center' : 'hidden'}`}>
            {currentUser && currentUser.emailVerified ? (
              <>
                <Link to='/bookings' className={`px-4 py-2 border-2 border-orange-500 rounded-lg hover:text-orange-500 transition ${hasScrolled ? "text-black hover:text-orange-500" : "text-orange-500 hover:text-orange-500"}`}>My Bookings</Link>
                <div className='relative'>
                  <button
                    ref={profileRef}
                    className="w-10 h-10 outline-none rounded-full relative"
                    onClick={() => setIsOpen(!isOpen)}
                    onMouseEnter={() => setIsTooltipVisible(true)}
                    onMouseLeave={() => setIsTooltipVisible(false)}
                  >
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <img
                        src={defaultProfileImage}
                        alt="Default Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    {isTooltipVisible && (
                      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded px-2 py-1">
                        {currentUser.displayName || "User"}
                      </div>
                    )}
                  </button>
                  {isOpen && (
                    <ul className="bg-white absolute top-14 right-0 mt-6 space-y-2 border rounded-md w-52 shadow-md">
                      {menuItems.map((item, index) => (
                        <li key={index}>
                          <Link
                            className="block text-gray-600 text-center hover:text-orange-500 p-3"
                            to={item.path}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button onClick={handleLogout} className="flex gap-2 justify-center items-center w-full text-center text-gray-600 hover:text-orange-500 border-t py-3 p-3">
                          Logout <RxExit color='orange' />
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <>
                <button onClick={toggleLoginModal} className={`px-4 py-2 border-2 border-orange-500 rounded-lg hover:text-orange-500 transition ${hasScrolled ? "text-black hover:text-orange-500" : "text-orange-500 hover:text-orange-500"}`}>Log in</button>
                <button onClick={toggleRegisterModal} className='px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-800 transition'>Sign up</button>
              </>
            )}
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={toggleRegisterModal} />
      <ToastContainer />
    </header>
  );
};

export default Header;
