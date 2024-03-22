import React from 'react';

const EpisodeSelector = ({
    details,
    seasonDetails,
    season,
    episode,
    handleSeasonChange,
    handleEpisodeChange,
    handlePrevButton,
    handleNextButton,
    hasPreviousEpisode,
    hasPreviousSeason,
    hasNextEpisode,
    hasNextSeason
}) => {
    return (
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
    );
}

export default EpisodeSelector;
