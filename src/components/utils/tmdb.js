import axios from 'axios';

const API_KEY = '65e48ea954cae53bb463f50a980c11a8';

export const fetchTrending = async (value) => {
    try {
        // Valid Value: all, movie, tv, person
        const response = await axios.get(`https://api.themoviedb.org/3/trending/${value}/day?language=en-US&api_key=${API_KEY}`);
        return response.data.results;
    } catch (error) {
        console.error(`Error fetching all trendings:`, error);
        return [];
    }
};

export const fetchListedCategory = async (category, listsType) => {
    // Category: tv, movie
    // ListsType: 
    // airing_today (tv)
    // on_the_air (tv)
    // popular (tv & movie)
    // top_rated (tv & movie
    // now_playing (movie)
    // upcoming (movie)
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/${category}/${listsType}?api_key=${API_KEY}`);
        return response.data.results;
    } catch (error) {
        console.error(`Error fetching ${listsType} ${category}:`, error);
        return [];
    }
};

export const fetchDetails = async (category, id) => {
    // Category: tv, movie
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/${category}/${id}?api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${category} details for ID ${id}:`, error);
        return null;
    }
};

export const fetchSeason = async (category, id, season) => {
    // Category: tv, movie
    try {
        const url = `https://api.themoviedb.org/3/${category}/${id}` + 
                    `${season ? `/season/${season}` : ''}?api_key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${category} details for ID ${id}:`, error);
        return null;
    }
};

export const fetchEpisode = async (category, id, season, episode) => {
    // Category: tv, movie
    try {
        const url = `https://api.themoviedb.org/3/${category}/${id}` + 
                    `${season ? `/season/${season}` : ''}` +
                    `${episode ? `/episode/${episode}` : ''}?api_key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${category} details for ID ${id}:`, error);
        return null;
    }
};

export const fetchCredits = async (category, id) => {
    // Category: tv, movie
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/${category}/${id}/credits?api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching credits for ID ${id}:`, error);
        return null;
    }
};

export const fetchSearch = async (value) => {
    // Category: tv, movie
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${value}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`);
        return response.data
    } catch (error) {
        console.error(`Error fetching search for ${value}:`, error);
        return [];
    }
}

export const fetchSimilar = async (category,id) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/${category}/${id}/similar?api_key=${API_KEY}`);
        return response.data
    } catch (error) {
        console.error(`Error fetching details for ID ${id}:`, error);
        return null;
    }
}