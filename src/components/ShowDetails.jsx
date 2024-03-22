import React, { useEffect, useState } from 'react';
import { PageContainer, convertMinutesToHoursAndMinutes, PreviewDetails, MediaPlayer, ErrorMessage, getYearFromDate, RichText } from './snippets/Snippets';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDetails, fetchCredits, fetchSeason } from './utils/tmdb';
import Loader from './snippets/Loader';
import ShowSimilar from './snippets/ShowSimilar';
import EpisodeSelector from './snippets/EpisodeSelector';

const ShowDetails = () => {
    const [details, setDetails] = useState(null);
    const [seasonDetails, setSeasonDetails] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loaderStatus, setLoaderStatus] = useState(false);

    const navigate = useNavigate();
    let { id, category, season, episode } = useParams();

    let handlePrevButton, hasPreviousEpisode, hasPreviousSeason, handleSeasonChange, handleEpisodeChange, handleNextButton, hasNextEpisode, hasNextSeason;

    useEffect(() => {
        const fetchData = async () => {
            setLoaderStatus(true);
            try {
                const DetailsFetched = await fetchDetails(category, id);
                if (season) {
                    const SeasonFetched = await fetchSeason(category, id, season);
                    setSeasonDetails(SeasonFetched);
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
        
        const previousSeasonNumber = parseInt(season, 10) - 1;
        hasPreviousSeason = details?.seasons.some(season => season.season_number === previousSeasonNumber);
        const previousEpisodeNumber = parseInt(episode, 10) - 1;
        hasPreviousEpisode = seasonDetails?.episodes.some(episode => episode.episode_number === previousEpisodeNumber);

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

    const formattedDate = details ? (category === 'movie' ? formatDate(details.release_date) : (getYearFromDate(details.first_air_date)) + " - " + getYearFromDate(details.last_air_date)) : "-";

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
            {loaderStatus ? (
                <Loader />
            ) : (
                details ? (
                    <>
                        <div className="h-auto gap-5 w-full flex flex-col mb-10 bg-quinary">
                            <MediaPlayer category={category} id={id} season={season} episode={episode} />
                            {category === "tv" && seasonDetails ? (
                                <EpisodeSelector
                                    details={details}
                                    seasonDetails={seasonDetails}
                                    season={season}
                                    episode={episode}
                                    handleSeasonChange={handleSeasonChange}
                                    handleEpisodeChange={handleEpisodeChange}
                                    handlePrevButton={handlePrevButton}
                                    handleNextButton={handleNextButton}
                                    hasPreviousEpisode={hasPreviousEpisode}
                                    hasPreviousSeason={hasPreviousSeason}
                                    hasNextEpisode={hasNextEpisode}
                                    hasNextSeason={hasNextSeason}
                                />
                            ) : null}
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
                        </div>
                        <div className="mt-10 h-auto relative">
                            <RichText heading="You may also like" />
                            <ShowSimilar category={category} id={id} />
                        </div>
                    </>
                ) : (
                    <ErrorMessage />
                )
            )}
        </PageContainer>
    );
    
}

export default ShowDetails;