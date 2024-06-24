import React, { useState, useEffect } from 'react';
import { BiX } from "react-icons/bi";
import { FaEyeSlash, FaEye, FaGoogle } from "react-icons/fa";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Corrected import
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import RegisterModal from './RegisterModal';
import PasswordResetModal from './PasswordResetModal';

const LoginModal = ({ isOpen, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({ ...formData, [name]: value }));
    };

    const toggleRegisterModal = () => {
        setIsRegisterModalOpen(!isRegisterModalOpen);
    };

    const toggleResetModal = () => {
        setIsResetModalOpen(!isResetModalOpen);
    };

    useEffect(() => {
        if (isOpen) {
            window.scrollTo(0, 0);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                toast.error('Please verify your email before logging in.');
            } else {
                // Get user's full name from Firestore
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef); // Corrected function call
                const fullName = userDoc.data()?.fullName || '';

                // Store user data in Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    fullName: fullName,
                    // Add any additional user data you want to store
                });

                toast.success(`Welcome ${fullName || 'User'}! Login successful!`);
                setTimeout(() => {
                    onClose();
                }, 1000)
            }
        } catch (error) {
            toast.error(`Login failed: ${error.message}`);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (!user.emailVerified) {
                toast.error('Please verify your email before logging in.');
            } else {
                // Get user's full name from Firestore
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef); // Corrected function call
                const fullName = userDoc.data()?.fullName || '';

                // Store user data in Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    fullName: user.displayName,
                    // Add any additional user data you want to store
                });

                toast.success(`Welcome ${fullName || 'User'} ! Login with Google successful!`);
                setTimeout(() => {
                    onClose();
                }, 1000)
            }
        } catch (error) {
            toast.error(`Login with Google failed: ${error.message}`);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 overflow-hidden">
            <div className="bg-white rounded-lg shadow-lg p-10 ">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Log In</h2>
                    <button onClick={onClose} className="text-gray-500 focus:outline-none border p-2 rounded-lg hover:bg-orange-500 hover:text-white transition">
                        <BiX size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="input-group overflow-visible">
                        <input
                            type="text"
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
                        Sign in
                    </button>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150 flex items-center justify-center"
                    >
                        <FaGoogle className="mr-2" /> Sign in with Google
                    </button>
                    <div className="text-center">
                        <button
                            className="hover:text-orange-600"
                            onClick={toggleResetModal}
                        >
                            Forgot password?
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <span className="text-gray-500">Don't have an account?</span>
                        <button
                            className="text-orange-400 hover:text-orange-600 hover:underline ml-2"
                            onClick={toggleRegisterModal}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={toggleRegisterModal}
            />
            <PasswordResetModal
                isOpen={isResetModalOpen}
                onClose={toggleResetModal}
            />
        </div>
    );
};

export default LoginModal;