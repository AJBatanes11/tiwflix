import React from 'react';
import LoaderIcon from '../assets/loader.svg';

const Loader = () => {
    return (
        <div className="z-50 mx-auto flex justify-center fixed top-0 left-0 bottom-0 right-0 w-full h-full">
            <div className="max-w-32 md:max-w-40 m-auto h-full z-10">
                <img src={LoaderIcon} alt="loader" className="max-w-16 md:max-w-20 h-full z-10 m-auto animate-pulse" />
            </div>
            <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-secondary bg-opacity-50 backdrop-blur-md"/>
        </div>

    );
}

export default Loader;