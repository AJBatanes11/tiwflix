import React, { useState } from 'react';
import LoaderIcon from '../assets/loader.svg';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

export const PageContainer = ({ children }) => {
    return (
        <div className="px-10 py-16 relative md:py-20 h-full w-full">
            {children}
        </div>
    );
};

export const formatDate = (dateString) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [year, month, day] = dateString.split("-");
    const monthName = months[parseInt(month, 10) - 1];
    return `${monthName} ${parseInt(day, 10)}, ${year}`;
};

export const convertMinutesToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
};


export const getYearFromDate = (dateString) => {
    if (dateString) {
        return dateString.split("-")[0];
    } else {
        return ""
    }
};

export const PreviewDetails = ({ label, value }) => {
    return (
        <p className="leading-6"><span className="text-neutral">{label}: </span>{value}</p>
    );
};

export const MediaPlayer = ({ category, id, season, episode }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoad = () => {
        setLoading(false);
    };

    const handleError = () => {
        setError(true);
    };

    return (
        <div className="h-full w-full flex relative">
            {error && (
                <div className="flex flex-col items-center justify-center w-full h-full p-4">
                    <h1 className="">Error loading video player</h1>
                </div>
            )}
            {loading && !error && (
                <div className="animate-pulse flex flex-col items-center justify-center w-full h-full p-4">
                    <img src={LoaderIcon} alt="loader" className="w-16 h-auto m-5 animate-pulse" />
                    <h1 className=''>Loading video player. This might take a while.</h1>
                </div>
            )}
            {!error && (
                <iframe
                    title="Embedded Video"
                    className={`w-full h-full ${loading ? 'hidden' : 'block'}`}
                    // src={category && `https://vidsrc.to/embed/${category}/${id}`} ${category === "tv" ? `/${season}/${episode}` : ""}
                    src={category && id && `https://vidsrc.to/embed/${category}/${id}${category === "tv" ? `/${season}/${episode}` : ""}`}
                    onLoad={handleLoad}
                    onError={handleError}
                    allowFullScreen
                />
            )}
        </div>
    );
};

export const ErrorMessage = () => {
    return (
        <div className="m-auto flex flex-col items-center justify-center text-center py-10 px-20 w-2/3">
            <h1 className="text-2xl md:text-4xl text-tertiary font-bold mb-4">
                Oops! Something went wrong while loading the page.
            </h1>
            <p className="text-lg">
                Please try refreshing the page or check your internet connection.
            </p>
        </div>
    );
};

export const RichText = ({ heading, subheading, className }) => {
    return (
        <div className={className}>
            <div className="font-bold text-lg md:text-2xl my-4">{heading}</div>
            <div className="my-4">{subheading}</div>
        </div>
    )
}