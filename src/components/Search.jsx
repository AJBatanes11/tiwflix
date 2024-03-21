import React, { useEffect, useState } from 'react';
import { PageContainer, ErrorMessage } from './snippets/Snippets';
import { fetchSearch } from './utils/tmdb';
import { Link } from 'react-router-dom';
import Placeholder from '../components/assets/placeholder.jpg'
import Loader from './snippets/Loader';

const Search = () => {
    const [searchString, setSearchString] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loaderStatus, setLoaderStatus] = useState(false);


    useEffect(() => {
        const fetchSearchResults = async () => {
            // setLoaderStatus(true);
            try {
                const searchResultsData = await fetchSearch(searchString);
                setSearchResults(searchResultsData.results);
                setLoaderStatus(true);
            } catch (error) {
                console.error('Error fetching search result:', error);
                setSearchResults(null);
            } finally {
                setLoaderStatus(false);
            }
        };
        fetchSearchResults();
    }, [searchString]);


    const handleInputChange = (event) => {
        setSearchString(event.target.value);
    };

    return (
        <PageContainer>
            <>
                <div className="text-secondary flex flex-col justify-center text-center m-5 mb-10">
                    <label for="search" aria-description="search"></label>
                    <input className="py-1 px-5 w-full md:w-3/4 lg:w-1/2 m-auto" type="text" name="search" id="search" onChange={handleInputChange} placeholder="Search" />
                </div>
                {loaderStatus ? <Loader /> : (searchResults ?
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-5">
                        {searchResults.map(item => (
                            <div key={item.id}>
                                <Link to={`/${item.media_type}/${item.id}${item.media_type === "tv" ? "/season/1/episode/1" : ""}`}>
                                    <div className="cursor-pointer overflow-hidden">
                                        {item.poster_path ? (
                                            <img className="hover:scale-105 transition duration-500" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title || item.name} />
                                        ) : (
                                            <img className="hover:scale-105 transition duration-500" src={Placeholder} alt={item.title || item.name} />
                                        )}
                                    </div>
                                    <div className="text-primary m-2">
                                        <h4 className="font-bold">{item.title || item.name} {item.media_type === 'movie' ? (item.release_date ? `(${item.release_date.substring(0, 4)})` : '') : (item.first_air_date ? `(${item.first_air_date.substring(0, 4)})` : '')}</h4>
                                        <p className="text-neutral capitalize">{item.media_type === 'tv' ? 'TV Show' : 'Movie'}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    : <ErrorMessage />)
                }
            </>
        </PageContainer>
    );
};

export default Search;
