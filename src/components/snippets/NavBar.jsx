import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const NavBar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

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
        <motion.nav
            className={`fixed top-0 w-full p-4 z-50 ${scrollPosition > 0 ? 'shadow-sm' : ''}`}
            style={{
                backgroundColor: scrollPosition > 0 ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
                backdropFilter: scrollPosition > 0 ? 'blur(20px)' : 'none',
                transition: 'background-color 0.3s ease',
            }}
        >
            <div className="flex justify-between items-center w-full">
                <ul className="flex space-x-4 items-center">
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
                </ul>
                <ul className="flex space-x-4 items-center relative">
                    <li><Link to="/search">Search</Link></li>
                </ul>
            </div>
        </motion.nav>
    );
};

export default NavBar;
