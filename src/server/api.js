import { apiConfig } from "./apiConfig";
import axios from "axios";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated',
    now_playing: 'now_playing'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}


const tmdbApi = {
    getMoviesList: async(type, page) => {
        let url = ''
        if (page === undefined) {
            url = apiConfig.baseUrl + '/movie/' + movieType[type] + '?page=1' + '&api_key=' + apiConfig.APIKEY;
            
        }
        else{
            url = apiConfig.baseUrl + '/movie/' + movieType[type] + '?page='+ page + '&api_key=' + apiConfig.APIKEY;

        }
        const movie = await axios.get(url)
        return movie.data;

    },
    getTvList: async(type, page) => {
        let url = ''
        if (page === undefined) {
            url = apiConfig.baseUrl + '/tv/' + tvType[type] + '?page=1' + '&api_key=' + apiConfig.APIKEY;
            
        }
        else{
            url = apiConfig.baseUrl + '/tv/' + tvType[type] + '?page=' +page + '&api_key=' + apiConfig.APIKEY;

        }
        const tv = await axios.get(url);
        return tv.data;
    },
    getVideos: async(cat,id) => {
        const url = apiConfig.baseUrl + '/'+ category[cat] +'/' + id + '/videos' + '?api_key=' + apiConfig.APIKEY;
        const video = await axios.get(url)
        // console.log(video);
        return video.data
    },
    credit: async(cat,id) => {
        // console.log(cat,id);
        const url = apiConfig.baseUrl + '/' + category[cat] + '/' + id + '/credits' + '?api_key=' + apiConfig.APIKEY;
        const credits = await axios.get(url)
        // console.log(credits.data);
        return credits.data

    },
    similiar: async(cat,id) => {
     
        const url = apiConfig.baseUrl + '/'+ category[cat] +'/' + id + '/similar' + '?api_key=' + apiConfig.APIKEY ;
        const similiar = await axios.get(url)
        return similiar.data

    },
    detail : async(cat, id) => {
        // console.log("api",cat,id);
        const url = apiConfig.baseUrl + '/'+ category[cat] +'/' + id + '?' + 'api_key=' + apiConfig.APIKEY ;
        const detail = await axios.get(url);
        // console.log(detail);
        return detail.data

    },
    search :async (cat, key , page) => {
        // console.log(cat,key,page);
        let url = ''
        if(page === undefined ){

           url = apiConfig.baseUrl + '/search/'+ cat +'?api_key=' + apiConfig.APIKEY + "&query=" + key + '&page=1' ;
        }else{
            url = apiConfig.baseUrl + '/search/'+ cat+ '?api_key=' + apiConfig.APIKEY + "&query=" + key + '&page='+ page ;

        }
        const search = await axios.get(url);
        return search.data

    }


}
export default tmdbApi;


// export const getMovieList = async() =>{
//     try {
//         const movie = await axios.get(`${apiConfig.baseUrl}/movie/popular?page=1&api_key=${apiConfig.APIKEY}`);
        
//         // console.log({ movieList : movie })
//         return movie.data.results
//     } catch (error) {
//         console.log("error : " + error);
//     }

// }

// export const searchMovie = async(q) =>{
//     const search =await axios.get(`${import.meta.env.VITE_REACT_APP_BASEURL}/search/movie?query=${q}&page=1&api_key=${import.meta.env.VITE_REACT_APP_APIKEY}`)
//     return search.data
// }

const domain_vidsrc = ["vidsrc.net", "vidsrc.in", "vidsrc.pm", "vidsrc.xyz", ]

export const vidsrcApi = {
    embed : async (cat, movieId) => {
        const url = `https://${domain_vidsrc[0]}/embed/${cat}?tmdb=${movieId}&ds_lang=id`
        // const response = await axios.get(url);

        return url
    }
}