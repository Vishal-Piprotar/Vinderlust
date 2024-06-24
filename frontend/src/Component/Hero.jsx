import React from 'react';
import bg from '../assets/Bg.mp4';
import Search from '../Component/Search';
const Hero = () => {
    return (
        <section className="relative w-full h-screen ">
            <video
                src={bg}
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover"
            ></video>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
                <h1 className='text-4xl lg:text-6xl font-semibold leading-tight mb-6 text-white mt-64 lg:mt-0'>
                    <span className='text-orange-500'>Book</span> Your Dream Hotel With Us
                </h1>
                <p className='max-w-lg mb-8 text-white text-base lg:text-lg'>
                    Discover the perfect hotel for your next vacation. Enjoy luxurious accommodations, exceptional service, and unforgettable experiences.
                </p>
                <div className="w-full max-w-4xl mt-24 lg:mt-10">
                    <Search />
                </div>
            </div>
            
        </section>
    );
};

export default Hero;
