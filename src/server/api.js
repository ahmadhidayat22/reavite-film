import { apiConfig } from "./apiConfig";
import axios from "axios";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const tmdbApi = {
    getMoviesList: async(type) => {
        
        const url = apiConfig.baseUrl + '/movie/' + movieType[type] + '?page=1' + '&api_key=' + apiConfig.APIKEY;
        const movie = await axios.get(url)
        return movie.data.results;

    }
}
export default tmdbApi;


export const getMovieList = async() =>{
    try {
        const movie = await axios.get(`${apiConfig.baseUrl}/movie/popular?page=1&api_key=${apiConfig.APIKEY}`);
        
        // console.log({ movieList : movie })
        return movie.data.results
    } catch (error) {
        console.log("error : " + error);
    }

}

export const searchMovie = async(q) =>{
    const search =await axios.get(`${import.meta.env.VITE_REACT_APP_BASEURL}/search/movie?query=${q}&page=1&api_key=${import.meta.env.VITE_REACT_APP_APIKEY}`)
    return search.data
}
