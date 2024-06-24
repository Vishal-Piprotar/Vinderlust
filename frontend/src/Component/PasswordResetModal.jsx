import React, { useState } from 'react';
import { BiX } from "react-icons/bi";
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordResetModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent!');
            setTimeout(() => {
                onClose();
            }, 2500);
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 overflow-hidden">
            <div className="bg-white rounded-lg shadow-lg p-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Reset Password</h2>
                    <button onClick={onClose} className="text-gray-500 focus:outline-none border p-2 rounded-lg hover:bg-orange-500 hover:text-white transition">
                        <BiX size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="input-group overflow-visible">
                        <input
                            type="email"
                            className="input"
                            id="reset-email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                        <label htmlFor="reset-email" className="label">Email</label>
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white font-medium bg-orange-600 hover:bg-orange-500 active:bg-orange-600 rounded-lg duration-150">
                        Send Reset Email
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetModal;
