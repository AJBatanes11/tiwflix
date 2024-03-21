import React from 'react';

export const FireIcon = ({className}) => {
    return (
        <div className={className}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z" /></svg>
        </div>
    );
};

export const AJLogo = ({ className }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%" viewBox="0 0 100 100">
            <polygon points="25,5 75,5 95,25 95,75 75,95 25,95 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="3" />
            <text x="50%" y="40%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="currentColor">AJ</text>
            <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="currentColor">CB</text>
        </svg>
    );
}

export const DropDownIcon = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className={className}
        >
            <path
                fillRule="evenodd"
                d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7l-5 5z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export const LoaderSvg = () => {
    const svgStyle = {
        margin: "auto",
        background: "none",
        display: "block",
        shapeRendering: "auto"
    };
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={svgStyle} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#E50914" strokeWidth="5" r="47" strokeDasharray="216.76989309769573 74.25663103256524">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.9174311926605504s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>
        </svg>
    );
};