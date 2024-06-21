// import React from 'react';
import { useState , useEffect , useRef } from "react";
import Carousel from "./HeroCarousel";
import tmdbApi, { movieType } from '../server/api';



const Hero = ({movies}) => {
	
    const [popularMovies, setPopularMovies] = useState([])
    
    useEffect(() => {
            tmdbApi.getMoviesList(movieType.popular).then((res) => {
                      setPopularMovies(res.results);
            })
            
    }, [])

 
	return (
 
       
        <Carousel movies={popularMovies}/>
        
    

    )
};

export default Hero;
