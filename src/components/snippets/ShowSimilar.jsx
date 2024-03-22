import React, { useState, useEffect } from 'react';
import { fetchSimilar } from '../utils/tmdb';
import { Link } from 'react-router-dom';
import Placeholder from '../assets/placeholder.jpg';
import { ErrorMessage } from './Snippets';
import Loader from './Loader';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const ShowSimilar = ({ category, id }) => {
    const [similar, setSimilar] = useState([]);
    const [loaderStatus, setLoaderStatus] = useState(false);

    useEffect(() => {
        const fetchSimilarList = async () => {
            setLoaderStatus(true)
            try {
                const similarList = await fetchSimilar(category, id);
                setSimilar(similarList);
            } catch (error) {
                console.error('Error fetching trending data:', error);
                setSimilar(null);
            } finally {
                setLoaderStatus(false);
            }
        }
        fetchSimilarList();
    }, [category, id]);

    console.log(similar);

    var carouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    swipe: true,
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    swipe: true,
                }
            },
        ]
    };

    var carouselStyles = {
        height: "auto",
    };

    return (
        <>
            {similar && similar.results ?
                <Slider {...carouselSettings} style={carouselStyles}>
                    {similar.results.map(item => (
                        <div key={item.id} className="p-2 relative h-auto">
                            <Link to={`/${category}/${item.id}${category === "tv" ? "/season/1/episode/1" : ""}`}>
                                <div className="cursor-pointer overflow-hidden relative">
                                    {item.poster_path ? (
                                        <img className="hover:scale-105 transition duration-500" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title || item.name} />
                                    ) : (
                                        <img className="hover:scale-105 transition duration-500" src={Placeholder} alt={item.title || item.name} />
                                    )}
                                    <div className="absolute bottom-0 left-0">
                                        <div className={`backdrop-blur-3xl rounded-xl m-2 px-2 ${category === 'tv' ? 'bg-blue-500' : 'bg-red-500'} text-${category === 'tv' ? 'blue' : 'red'} bg-opacity-75 flex justify-center items-center text-center align-middle`}>
                                            <small className="m-0">{category === 'tv' ? 'TV' : 'Movie'}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-primary m-2">
                                    <h4 className="font-bold">{item.title || item.name} {category === 'movie' ? (item.release_date ? `(${item.release_date.substring(0, 4)})` : '') : (item.first_air_date ? `(${item.first_air_date.substring(0, 4)})` : '')}</h4>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
                : <ErrorMessage />}
        </>
    );
}

export default ShowSimilar;
