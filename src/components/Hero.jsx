// import React from 'react';
import { useState , useEffect , useRef } from "react";
import Carousel from "./HeroCarousel";
import { star , half_star, play_button } from "../assets";
import tmdbApi, { category, movieType ,tvType } from '../server/api';

import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();



const Hero = ({movies}) => {
	const handleVideoClick = () => {
		// Logika untuk menampilkan video
        const url_yt = "https://www.youtube.com/embed/"

		// console.log("Video clicked");
	};
    const [popularMovies, setPopularMovies] = useState([])
    
    // useEffect(() => {
    //         tmdbApi.getMoviesList(movieType.popular).then((res) => {
    //                   setPopularMovies(res);
    //         })
            
    // }, [])

    // console.log(popularMovies);



    // const movie = popularMovies[0]
    

    // let rating = movie.vote_average;
    const rating = 5;
    // const title = movie.original_title;
    const title = "p";
    const detail = "ll";
    // const detail = movie.overview;
    // // const fullStars = Math.floor(rating);
    const remainingStars = rating % 1 ? true: false;
    
    const starItem= []
    for(let i = 1 ; i < rating; i++){
        // console.log(i)
        starItem.push(
            <span key={i}>
                <img 
                    key={i}
                    src={star}
                    alt= "rating"
                    className="w-5"
                />
                
            </span>
        )   
    }
    if (remainingStars){
                starItem.push(
                    <span key={0}>
                    <img 
                        key= '0'
                        src={half_star}
                        alt= "rating"
                        className="w-5"
            />
            
        </span> 
        )
    }
    const path = "/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg";
    // const path = movie.backdrop_path;
	const picture ="https://image.tmdb.org/t/p/original/" + path;

    const slides = [
        "https://image.tmdb.org/t/p/original/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
        "https://image.tmdb.org/t/p/original/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
        "https://image.tmdb.org/t/p/original/gRApXuxWmO2forYTuTmcz5RaNUV.jpg",

    ]

	return (
		 
        // <div className='w-full relative flex h-screen  justify-start  border-box '>
        //     <div className="absolute inset-0 -z-10">
        //         <img
        //             src={picture}
        //             alt="Background"
        //             className="w-full h-full object-cover object-center brightness-50"
                    
        //         />
        //     </div>
        //     <div className="relative bg-gradient-to-r from-black z-0 text-white h-full flex items-start flex-col w-3/5  text-start justify-center px-28 lg:px-16  gap-5">
            
        //             <h1 className="text-6xl lg:text-4xl uppercase font-mono font-extrabold ">{title}</h1>
        //             <div className="flex justify-start items-center gap-1">
        //                 {starItem}
        //                 <span className="text-white font-medium py-1 px-2 ms-2 rounded-md bg-yellow-500 ">
        //                     <p>Rating</p>
        //                 </span>    
        //             </div>

        //             <div className="border w-3/5 lg:w-11/12">
        //                 <p className="text-lg lg:text-base">
        //                     {detail}
        //                 </p>
        //             </div>
        //             <div>
        //                 <p className="font-mono text-lg"><span className="text-green-400">Genres</span> apwdlaw </p>
        //                 <p className="font-mono text-lg"><span className="text-green-400">Tags</span> apwdlaw </p>
                    
        //             </div>
        //             <button className="rounded-lg shadow-md bg-white text-black px-3 py-2 " onClick={handleVideoClick}>Watch Trailer</button>
                

        //     </div>
            
        //     <div className="flex items-center ms-32">
        //         <button 
        //             className="hover:-rotate-12 hover:scale-125 transition-transform duration-300 "
        //             onClick={handleVideoClick}
        //         >
        //         <img 
        //             src={play_button} 
        //             alt="play"
        //             className="w-28 "
                    
        //             />
        //         </button>
                
        //     </div>
        // </div>
        <div className="w-full">
            <Carousel>
                {slides.map((s) =>(
                    <>
                        <h1>aowjdiaj</h1>
                        
                        <img src={s} alt="" />
                        
                    </>
                   
                   
                ))}
            </Carousel>
        </div>

    )
};

export default Hero;