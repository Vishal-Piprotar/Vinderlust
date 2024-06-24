import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaGithub, FaLinkedin, FaWhatsapp, FaJava } from 'react-icons/fa';
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiMongodb, SiMysql, SiPhp, SiFirebase, SiExpress, SiVercel, SiNetlify, SiNodedotjs } from 'react-icons/si';
import vishal from '../assets/vishal.jpeg'

const socialLinks = [
    {
        to: "https://www.instagram.com/mr_vishal_099/",
        icon: <FaInstagram className="w-8 h-8 text-pink-600" />,
        name: "Instagram"
    },
    {
        to: "https://github.com/Vishal-Piprotar",
        icon: <FaGithub className="w-8 h-8 text-gray-800" />,
        name: "GitHub"
    },
    {
        to: "https://www.linkedin.com/in/vishal-piprotar/",
        icon: <FaLinkedin className="w-8 h-8 text-blue-600" />,
        name: "LinkedIn"
    },
    {
        to: "https://wa.me/+916352497433",
        icon: <FaWhatsapp className="w-8 h-8 text-green-500" />,
        name: "WhatsApp"
    },
];

const techStack = [
    { name: "HTML5", icon: <SiHtml5 className="text-orange-600" /> },
    { name: "CSS3", icon: <SiCss3 className="text-blue-500" /> },
    { name: "Tailwind CSS", icon: <SiReact className="text-teal-500" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" /> },
    { name: "Java", icon: <FaJava className="text-yellow-500" /> },
    { name: "React", icon: <SiReact className="text-blue-400" /> },
    { name: "Node.Js", icon: <SiNodedotjs className="text-green-700" /> },
    { name: "Express.js", icon: <SiExpress className="text-gray-600" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
    { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
    { name: "PHP", icon: <SiPhp className="text-indigo-600" /> },
    { name: "Firebase", icon: <SiFirebase className="text-yellow-600" /> },
    { name: "Vercel", icon: <SiVercel className="text-black" /> },
    { name: "Netlify", icon: <SiNetlify className="text-gray-700" /> },
];

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 25)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-12 px-4 sm:px-6 lg:px-8 pt-40 font-lato">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col md:flex-row items-center mb-10"
                    >
                        {/* Project Photo */}
                        <motion.div
                            className="w-48 h-48 mb-6 md:mb-0 md:mr-8"
                            initial={{ opacity: 0, x: -100, rotate: -180 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{
                                duration: 1,
                                ease: "easeOut",
                                delay: 0.2
                            }}
                        >
                            <img
                                src={vishal}
                                alt="Project"
                                className="rounded-full object-cover w-full h-full border-4 border-orange-300 shadow-lg"
                            />
                        </motion.div>

                        {/* Developer Details */}
                        <motion.div
                            className="flex-1 text-center md:text-left"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className="text-4xl font-extrabold mb-4 font-poppins">
                                <span className="text-gray-800">Hi, I'm</span>
                                <span className="text-orange-500"> Vishal Piprotar</span>
                            </h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                As a third-year IT student at LD College of Engineering, I'm driven by a passion for web development. My expertise lies in cutting-edge technologies like Firebase, Firestore, React, Vite, Razorpay, and Tailwind CSS. I thrive on creating efficient, user-friendly web applications that tackle real-world challenges and make a difference.
                            </p>
                            <div className="flex justify-center md:justify-start space-x-6">
                                {socialLinks.map((link) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.to}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-orange-500 transition-colors duration-300"
                                        whileHover={{ scale: 1.8, rotate: 5 }}
                                    >
                                        {link.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Project Description */}
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <motion.h2
                            className="text-3xl font-bold mb-4 text-orange-500 font-poppins"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            Viderlust - Hotel Booking App
                        </motion.h2>
                        <motion.p
                            className="text-gray-600 mb-4 leading-relaxed"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            Viderlust is an innovative hotel booking application designed to simplify the process of finding and booking accommodations worldwide. Built with authentication using Firebase, secure data management with Firestore, and a lightning-fast development environment powered by React and Vite.
                        </motion.p>
                        <motion.p
                            className="text-gray-600 mb-4 leading-relaxed"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            Our app integrates seamless payment processing through Razorpay, ensuring secure transactions for users. The modern and responsive UI is crafted with Tailwind CSS, offering a delightful user experience across various devices.
                        </motion.p>
                        <motion.p
                            className="text-gray-600 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            Whether you're planning a vacation or a business trip, Viderlust provides a comprehensive solution with personalized search options and real-time availability, ensuring a hassle-free booking experience tailored to your needs.
                        </motion.p>
                    </motion.div>

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold mb-6 text-center text-orange-500 font-poppins">Tech Stack</h2>
                        <motion.div
                            className="flex flex-wrap justify-center items-center gap-6"
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                            initial="hidden"
                            animate="show"
                        >
                            {techStack.map((tech) => (
                                <motion.div
                                    key={tech.name}
                                    className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        show: { opacity: 1, y: 0 }
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: [0, -5, 5, -5, 0],
                                        transition: {
                                            duration: 0.3,
                                            rotate: {
                                                repeat: Infinity,
                                                repeatType: "loop",
                                                duration: 0.5
                                            }
                                        }
                                    }}
                                >
                                    {tech.icon}
                                    <span className="text-gray-700 font-medium font-poppins">{tech.name}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;