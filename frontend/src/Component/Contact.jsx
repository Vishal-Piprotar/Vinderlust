import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        company: '',
        message: ''
    });

    const contactMethods = [
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            ,
            contact: "piprotarvishal20@gmail.com"
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
            ,
            contact: "+91 6352497433"
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
            ,
            contact: "Bhanvad, DevBhoomi Dwarka , 360-510"
        },
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "contacts"), formData);
            console.log("Document written with ID: ", docRef.id);
            // Clear the form
            setFormData({
                fullname: '',
                email: '',
                company: '',
                message: ''
            });
            toast.success('Form submitted successfully!');
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <motion.main 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8 pt-40"
        >
            <ToastContainer />
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
                    <motion.div 
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-lg space-y-3"
                    >
                        <h3 className="text-orange-600 font-semibold text-4xl font-poppins">
                            Contact
                        </h3>
                        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Let us know how we can help
                        </p>
                        <p className="text-gray-800">
                            We're here to help and answer any question you might have. We look forward to hearing from you! Please fill out the form, or use the contact information below.
                        </p>
                        <div>
                            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                                {contactMethods.map((item, idx) => (
                                    <motion.li 
                                        key={idx} 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 * idx }}
                                        className="flex items-center gap-x-3"
                                    >
                                        <div className="flex-none text-orange-500">
                                            {item.icon}
                                        </div>
                                        <p className="text-gray-800">{item.contact}</p>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                    <motion.div 
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex-1 mt-12 sm:max-w-lg lg:max-w-md"
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {['Full name', 'Email', 'Company'].map((label, idx) => (
                                <motion.div 
                                    key={label}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.5 + 0.1 * idx }}
                                    className="relative"
                                >
                                    <fieldset className="border border-orange-300 rounded-md px-3 pb-3 pt-1 bg-white bg-opacity-50">
                                        <legend className="text-sm px-3 font-[300] text-orange-600">{label}</legend>
                                        <input
                                            type={label === 'Email' ? 'email' : 'text'}
                                            required
                                            className="w-full bg-transparent outline-none text-gray-700"
                                            value={formData[label.toLowerCase().replace(' ', '')]}
                                            onChange={(e) => setFormData({...formData, [label.toLowerCase().replace(' ', '')]: e.target.value})}
                                        />
                                    </fieldset>
                                </motion.div>
                            ))}
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.8 }}
                                className="relative"
                            >
                                <fieldset className="border border-orange-300 rounded-md px-3 pb-3 pt-1 bg-white bg-opacity-50">
                                    <legend className="text-sm px-3 text-orange-600">Message</legend>
                                    <textarea 
                                        required 
                                        className="w-full h-36 bg-transparent resize-none outline-none text-gray-700"
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    ></textarea>
                                </fieldset>
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.9 }}
                            >
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white font-medium bg-orange-600 hover:bg-orange-500 active:bg-orange-700 rounded-lg duration-150"
                                >
                                    Submit
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </motion.main>
    )
}

export default Contact;