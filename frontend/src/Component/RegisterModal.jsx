import React, { useState, useEffect } from 'react';
import { BiX } from "react-icons/bi";
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEyeSlash, FaEye } from "react-icons/fa";

import { auth, db } from '../firebase/firebase';
import LoginModal from './LoginModal'; // Assuming you have a separate LoginModal component

const RegisterModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
      setFormData({ fullName: '', email: '', password: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the password field is empty
    if (!formData.password) {
      toast.error('Password is required');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        fullName: formData.fullName,
        email: formData.email
      });

      // Send email verification
      toast.success("Registration successful! Please check your email for verification.");
      await sendEmailVerification(user);
      onClose();
      // setShowLoginModal(true);
      toggleLoginModal();


    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
    }
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Sign Up</h2>
          <button onClick={onClose} className="text-gray-500 focus:outline-none border p-2 rounded-lg hover:bg-orange-500 hover:text-white transition">
            <BiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="input-group overflow-visible">
            <input
              type="text"
              className="input"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <label htmlFor="fullName" className="label">Full Name</label>
          </div>
          <div className="input-group overflow-visible">
            <input
              type="email"
              className="input"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <label htmlFor="email" className="label">Email</label>
          </div>
          <div className='input-group overflow-visible'>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <label className="label">Password</label>
            </div>
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white font-medium bg-orange-600 hover:bg-orange-500 active:bg-orange-600 rounded-lg duration-150">
            Sign up
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-500">Already have an account?</span>
            <button
              className="text-orange-400 hover:text-orange-600 hover:underline ml-2"
              onClick={toggleLoginModal}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={toggleLoginModal}
      />

    </div>
  );
};

export default RegisterModal;