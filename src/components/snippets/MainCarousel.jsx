import React, { useState, useEffect } from 'react';
import { fetchTrending } from '../utils/tmdb';
import { Link } from 'react-router-dom';
import Placeholder from '../assets/placeholder.jpg';
import { ErrorMessage } from './Snippets';
import { FireIcon } from '../assets/Assets';
import Loader from './Loader';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainCarousel = ({ category }) => {
  const [listData, setListData] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState(false);

  useEffect(() => {
    const fetchListData = async () => {
      setLoaderStatus(true);
      try {
        const listData = await fetchTrending(category);
        setListData(listData);
      } catch (error) {
        console.error('Error fetching trending data:', error);
        setListData(null);
      }
      finally {
        setLoaderStatus(false);
      }
    }
    fetchListData();
  }, [category]);

  var carouselSettings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    adaptiveHeight: true,
  };

  var carouselStyles = {
    width: "100%",
    margin: "0",
    height: "auto",
  };

  return (
    <>
      {loaderStatus ? <Loader /> :
        (listData ?
          <div className="slider-container">
            <Slider {...carouselSettings} style={carouselStyles}>
              {listData.map((item, index) => (
                <div key={item.id}>
                  <div className="relative h-full w-auto flex justify-center items-center">

                    <div className=" w-4/5 md:w-3/5 mt-20 mb-10 md:m-20 grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-10 text-center items-center justify-center content-center">
                      <div className="w-full h-auto relative">
                        {item.poster_path ? (
                          <img className="h-auto max-w-full" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title || item.name} />
                        ) : (
                          <img className="h-auto max-w-full" src={Placeholder} alt={item.title || item.name} />
                        )}
                        <div className="absolute bottom-0 left-0">
                          <div className={`backdrop-blur-3xl rounded-xl m-2 px-2 ${item.media_type === 'tv' ? 'bg-blue-500' : 'bg-red-500'} text-${category === 'tv' ? 'blue' : 'red'} bg-opacity-75 flex justify-center items-center text-center align-middle`}>
                            <small className="m-0">{item.media_type === 'tv' ? 'TV Show' : 'Movie'}</small>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-5 w-full h-auto">
                        <div className="flex items-center text-center justify-center gap-2">
                        <FireIcon className="w-5 h-auto fill-tertiary" /><p><b>{`#${index + 1}`}</b> in Trending</p>
                        </div>
                        <h1 className="font-bold text-2xl md:text-4xl">{item.title || item.name} {item.media_type === 'movie' ? (item.release_date ? `(${item.release_date.substring(0, 4)})` : '') : (item.first_air_date ? `(${item.first_air_date.substring(0, 4)})` : '')}</h1>
                        <p>{item.overview}</p>
                        <button className={`${item.media_type === 'tv' ? 'bg-blue-500' : 'bg-red-500'} hover:bg-opacity-75 transition duration-300 ease-in-out rounded-sm py-2 p-3 m-auto w-3/4 md:w-1/2 lg:w-1/4 font-semibold`}>
                          <Link to={`/${item.media_type}/${item.id}${item.media_type === "tv" ? "/season/1/episode/1" : ""}`}>
                            Watch Now
                          </Link>
                        </button>
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 bottom-0 right-0 overflow-hidden -z-10">
                      {item.backdrop_path ? (
                        <img className="h-full w-full object-cover" src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt={item.title || item.name} />
                      ) : (
                        <img className="h-full w-full object-cover" src={Placeholder} alt={item.title || item.name} />
                      )}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-secondary backdrop-blur-sm flex justify-center items-center" />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          : <ErrorMessage />
        )}
    </>
  );
}

export default MainCarousel;
