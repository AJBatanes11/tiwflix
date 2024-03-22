import React, { useEffect, useState } from 'react';
import { PageContainer, convertMinutesToHoursAndMinutes, PreviewDetails, MediaPlayer, ErrorMessage, getYearFromDate } from './snippets/Snippets';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDetails, fetchCredits, fetchSeason, fetchEpisode } from './utils/tmdb';
import Loader from './snippets/Loader';

const ShowDetails = () => {
    const [details, setDetails] = useState(null);
    const [seasonDetails, setSeasonDetails] = useState(null);
    const [episodeDetails, setEpisodeDetails] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loaderStatus, setLoaderStatus] = useState(false);

    const navigate = useNavigate();
    let { id, category, season, episode } = useParams();
    let handlePrevButton, hasPreviousEpisode, hasPreviousSeason;
    let handleSeasonChange, handleEpisodeChange;
    let handleNextButton, hasNextEpisode, hasNextSeason;

    useEffect(() => {
        const fetchData = async () => {
            setLoaderStatus(true);
            try {
                const DetailsFetched = await fetchDetails(category, id);
                if (season) {
                    const SeasonFetched = await fetchSeason(category, id, season);
                    setSeasonDetails(SeasonFetched);
                }
                if (episode) {
                    const EpisodeFetched = await fetchEpisode(category, id, season, episode);
                    setEpisodeDetails(EpisodeFetched);
                }
                const CreditsFetched = await fetchCredits(category, id);
                setDetails(DetailsFetched);
                setCredits(CreditsFetched);
            } catch (error) {
                console.error(`Error fetching ${category} details:`, error);
            } finally {
                setLoaderStatus(false);
            }
        };
        fetchData();
    }, [category, id, season, episode]);


    if (category === "tv") {

        handleSeasonChange = (e) => {
            const seasonNumber = e.target.value;
            const url = `/${category}/${id}/season/${seasonNumber}/episode/1`;
            navigate(url);
        };

        handleEpisodeChange = (e) => {
            const episodeNumber = e.target.value;
            const url = `/${category}/${id}/season/${season}/episode/${episodeNumber}`;
            navigate(url);
        };

        const nextSeasonNumber = parseInt(season, 10) + 1;
        hasNextSeason = details?.seasons.some(season => season.season_number === nextSeasonNumber);

        const nextEpisodeNumber = parseInt(episode, 10) + 1;
        hasNextEpisode = seasonDetails?.episodes.some(episode => episode.episode_number === nextEpisodeNumber);

        handleNextButton = (e) => {
            if (hasNextEpisode) {
                const url = `/${category}/${id}/season/${season}/episode/${nextEpisodeNumber}`;
                navigate(url);
            } else if (hasNextSeason) {
                const nextSeasonNumber = parseInt(season, 10) + 1;
                const url = `/${category}/${id}/season/${nextSeasonNumber}/episode/1`;
                navigate(url);
            } else {
                e.target.disabled = true;
            }
        }

        const previousSeasonNumber = parseInt(season, 10) - 1;
        hasPreviousSeason = details?.seasons.some(season => season.season_number === previousSeasonNumber);

        const previousEpisodeNumber = parseInt(episode, 10) - 1;
        hasPreviousEpisode = seasonDetails?.episodes.some(episode => episode.episode_number === previousEpisodeNumber);

        handlePrevButton = (e) => {
            if (hasPreviousEpisode) {
                const url = `/${category}/${id}/season/${season}/episode/${previousEpisodeNumber}`;
                navigate(url);
            } else if (hasPreviousSeason) {
                const url = `/${category}/${id}/season/${previousSeasonNumber}/episode/1`;
                navigate(url);
            } else {
                e.target.disabled = true;
            }
        }
    }

    const getDirector = () => {
        if (credits) {
            const director = credits.crew.find(member => member.job === 'Director');
            return director ? director.name : '-';
        }
        return '-';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formattedDate = details ? (category === 'movie' ? formatDate(details.release_date) : (getYearFromDate(details?.first_air_date)) + " - " + getYearFromDate(details.last_air_date)) : "-";

    const formattedCasts = credits ? credits.cast && credits.cast.map((actor, index) => (
        <span key={actor.id}>
            {actor.name}
            {index < credits.cast.length - 1 && ", "}
        </span>
    )) : '-';

    const formattedGenres = details ? (details.genres && details.genres.map((genre, index) => (
        <span key={genre.id}>
            {genre.name}
            {index < details.genres.length - 1 && ", "}
        </span>
    ))) : '-';

    return (
        <PageContainer>
            {loaderStatus ? <Loader /> :
                (details ? (
                    <><div className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] gap-5 w-full flex relative flex-col mb-10 bg-quinary">
                        <MediaPlayer category={category} id={id} season={season} episode={episode} />
                        {category === "tv" ?
                            <div className="text-primary flex flex-row flex-wrap sm:flex-nowrap justify-center m-0 md:p-2 text-center gap-3 md:gap-5 lg:gap-10">
                                <div className="w-2/5 order-3 sm:w-1/4 sm:order-1 h-auto flex justify-start">
                                    <button
                                        className="w-full md:py-2 md:px-6 rounded-sm bg-quaternary border border-neutral"
                                        onClick={handlePrevButton}
                                        disabled={!hasPreviousEpisode && !hasPreviousSeason}
                                    >
                                        Prev
                                    </button>
                                </div>
                                <div className="w-full order-1 sm:w-1/2 sm:order-2 flex flex-row justify-center gap-1 md:gap-2">
                                    <label htmlFor="seasons" className="mt-auto mb-auto">Season:</label>
                                    <select
                                        className="bg-quaternary w-full h-full px-2 rounded-sm border border-neutral"
                                        name="seasons"
                                        id="seasons"
                                        value={season}
                                        onChange={handleSeasonChange}
                                    >
                                        {details.seasons.map(season => (
                                            <option key={season.id} value={season.season_number}>
                                                Season {season.season_number}: {season.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-full order-2 sm:w-1/2 sm:order-3 flex flex-row justify-center gap-1 md:gap-2">
                                    <label htmlFor="episodes" className="mt-auto mb-auto">Episode:</label>
                                    <select
                                        className="bg-quaternary w-full h-full px-2 rounded-sm border border-neutral"
                                        name="episodes"
                                        id="episodes"
                                        value={episode}
                                        onChange={handleEpisodeChange}
                                    >
                                        {seasonDetails.episodes.map(episode => (
                                            <option key={episode.id} value={episode.episode_number}>
                                                Episode {episode.episode_number}: {episode.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-2/5 order-4 sm:w-1/4 sm:order-4 h-auto flex justify-end">
                                    <button
                                        className="w-full md:py-2 md:px-6 rounded-sm bg-quaternary border border-neutral"
                                        onClick={handleNextButton}
                                        disabled={!hasNextEpisode && !hasNextSeason}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                            : ""
                        }
                    </div>

                        <div className="flex flex-col md:flex-row gap-10 h-auto relative">
                            {details.poster_path && (
                                <div className="w-full md:sticky top-20 md:left-0 h-fit">
                                    <img className="w-full m-auto" src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`} alt={details.title || details.name} />
                                </div>
                            )}
                            <div className="w-full flex flex-col gap-5">
                                <div className="flex flex-col gap-5">
                                    <h1 className="font-bold text-2xl md:text-4xl">{details.title || details.name}</h1>
                                    <p>{details.overview}</p>
                                </div>
                                <PreviewDetails label={category === 'movie' ? 'Release Date' : 'Air Date'} value={formattedDate} />
                                <PreviewDetails label={category === 'movie' ? 'Runtime' : 'Seasons'} value={category === 'movie' ? `${convertMinutesToHoursAndMinutes(details.runtime)}` : `${details.number_of_seasons}`} />
                                <PreviewDetails label="Genres" value={formattedGenres} />
                                {category === 'movie' && <PreviewDetails label="Director" value={getDirector()} />}
                                <div className="max-h-[4.5rem] overflow-hidden">
                                    <PreviewDetails label="Casts" value={formattedCasts} />
                                </div>
                            </div>
                        </div></>
                )
                    : <ErrorMessage />)
            }
        </PageContainer>
    );
}

export default ShowDetails;