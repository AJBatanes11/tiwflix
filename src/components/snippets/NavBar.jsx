import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { SearchButton, HamburgerIcon, CloseIcon } from '../assets/Assets';

const NavBar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const hamburgerHandle = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <motion.nav
                className={`fixed top-0 w-full p-4 z-50 ${scrollPosition > 0 ? 'shadow-sm' : ''}`}
                style={{
                    backgroundColor: scrollPosition > 0 ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
                    backdropFilter: scrollPosition > 0 ? 'blur(20px)' : 'none',
                    transition: 'background-color 0.3s ease',
                }}
            >
                <div className="flex justify-between items-center w-full text-primary">
                    <ul className="hidden md:flex space-x-4 items-center">
                        <li className="text-tertiary font-bold text-2xl"><Link to="/">TIWFLIX</Link></li>
                        <li className='font-bold pointer-events-none'>Home</li>
                        <li className="float-left overflow-hidden">
                            <button className="flex items-center">
                                <Link to="/movie">Movies</Link>
                            </button>
                        </li>
                        <li className="float-left overflow-hidden">
                            <button className="flex items-center">
                                <Link to="/tv">TV Shows</Link>
                            </button>
                        </li>
                        <li>
                            <p>|</p>
                        </li>
                        <li className="hidden md:block">
                            <button className="flex items-center">
                                <Link to="/about">About</Link>
                            </button>
                        </li>
                    </ul>
                    <ul className="flex md:hidden space-x-4 justify-center items-center">
                        <li className="flex">
                            <button className="m-auto" onClick={hamburgerHandle}>
                                <HamburgerIcon className="w-5 fill-primary" />
                            </button>
                        </li>
                        <li className="text-tertiary font-bold text-2xl"><Link to="/">TIWFLIX</Link></li>
                    </ul>
                    <ul className="flex space-x-4 items-center relative">
                        <li>
                            <Link to="/search">
                                <SearchButton className="w-5 fill-primary cursor-pointer" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </motion.nav>
            {/* Hamburger menu for mobile */}
            <motion.div
                className={`md:hidden fixed top-0 left-0 w-full h-full bg-secondary z-50 transition-opacity duration-300 ${isOpen ? 'opacity-95 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
            >
                <div className="flex justify-between items-center p-4">
                    <div> {/* Placeholder for possible header or title */}
                        <h1 className="text-tertiary font-bold text-2xl">TIWFLIX</h1>
                    </div>
                    <button onClick={hamburgerHandle}>
                        <CloseIcon className="w-5 fill-primary" />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-normal text-primary text-lg font-semibold gap-2 h-full">
                    <Link to="/movie" className="" onClick={hamburgerHandle}>Movies</Link>
                    <Link to="/tv" className="" onClick={hamburgerHandle}>TV Shows</Link>
                    <Link to="/about" className="" onClick={hamburgerHandle}>About</Link>
                </div>
            </motion.div>
        </>
    );
};

export default NavBar;
