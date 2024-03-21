import React from 'react';
import { AJLogo } from '../assets/Assets';

const Footer = () => {
    return (
        <footer className="bg-secondary text-primary w-full p-4 my-10">
            <div className="flex justify-center items-center w-full">
                <div className="w-12 h-auto m-2">
                    <AJLogo className="text-primary" />
                </div>
                <p className="text-base">Designed and Built by <a className="hover:underline" href="https://ajbatanes11.github.io/my-portfolio/" target="_blank" rel="noopener noreferrer">AJ Batanes</a> ©2024</p>
            </div>
        </footer>
    );
}

export default Footer;