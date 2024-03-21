import React from 'react';
import { AJLogo } from '../assets/Assets';

const Loader = () => {
    return (
        <div className="z-50 mx-auto flex justify-center fixed top-0 left-0 bottom-0 right-0 w-full h-full">
            <div className="max-w-32 md:max-w-40 m-auto h-full z-10">
                <AJLogo className="text-tertiary animate-pulse" />
            </div>
            <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-secondary bg-opacity-50 backdrop-blur-md"/>
        </div>

    );
}

export default Loader;