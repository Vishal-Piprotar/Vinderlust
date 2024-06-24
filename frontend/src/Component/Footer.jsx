import React, { useState } from 'react';
import { FaInstagram, FaTwitter } from 'react-icons/fa';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const footerNavs = [
        {
            label: "Company",
            items: [
                { href: '/no-data', name: 'Blog' },
                { href: '/about', name: 'Team' },
            ],
        },
        {
            label: "Resources",
            items: [
                { href: '/contact', name: 'Contact' },
                { href: '/no-data', name: 'Pricing' },
            ],
        },
        {
            label: "About",
            items: [
                { href: '/no-data', name: 'Privacy' },
                { href: '/about', name: 'About Us' },
            ]
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate sending email
        console.log(`Subscribing email: ${email}`);
        console.log(`Sending to: piprotarvishal20@gmail.com`);
        
        // Simulate a delay
        setTimeout(() => {
            setIsSubscribed(true);
            setEmail('');
            alert(`Thank you for subscribing! A confirmation email has been sent to ${email}`);
        }, 1000);
    };

    return (
        <footer className="text-gray-500 bg-white px-4 py-5 mx-auto md:px-8 border-t p-5">
            <div className="gap-6 justify-between md:flex">
                <div className="flex-1">
                    <div className="max-w-xs">
                        <Link to='/' className='text-3xl font-semibold text-orange-500 '>Vinderlust</Link>
                        <p className="leading-relaxed mt-2 text-[15px]">
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label className="block pt-4 pb-2">
                            Stay up to date
                        </label>
                        <div className="max-w-sm flex items-center border rounded-md p-1">
                            <input 
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-2.5 outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="p-2.5 rounded-md text-white bg-orange-500 outline-none shadow-md focus:shadow-none sm:px-5 hover:bg-orange-600"
                                disabled={isSubscribed}
                            >
                                {isSubscribed ? 'Subscribed' : 'Subscribe'}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex-1 mt-10 space-y-6 items-center justify-between sm:flex md:space-y-0 md:mt-0">
                    {
                        footerNavs.map((item, idx) => (
                            <ul className="space-y-4" key={idx}>
                                <h4 className="text-gray-800 font-medium">
                                    {item.label}
                                </h4>
                                {
                                    item.items.map((el, idx) => (
                                        <li key={idx}>
                                            <Link 
                                                to={el.href}
                                                className="hover:underline hover:text-orange-600"
                                            >
                                                {el.name}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        ))
                    }
                </div>
            </div>
            <div className="mt-5 py-6 border-t items-center justify-between sm:flex">
                <div className="mt-4 sm:mt-0">
                    &copy; 2024 VISHAL PIPROTAR All rights reserved.
                </div>
                <div className="mt-6 sm:mt-0">
                    <ul className="flex items-center space-x-4">
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-orange-100">
                            <Link to="https://github.com/Vishal-Piprotar">
                                <FaGithub color='black' size={20}
                                />
                            </Link>
                        </li>
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-orange-100">
                            <Link to="https://www.instagram.com/mr_vishal_099/">
                                <FaInstagram color='red' size={20}/>
                            </Link>
                        </li>
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-orange-100">
                            <Link to="https://www.linkedin.com/in/vishal-piprotar/">
                                <FaLinkedinIn color='skyblue' size={20}/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;