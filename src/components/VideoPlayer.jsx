import React, { useEffect, useState, useRef } from "react";
import { vidsrcApi } from "../server/api";

const VideoPlayer = ({ category,id }) => {
    useEffect(() => {
        const getMovie = async() => {
            const divMovie = document.querySelector('#movie')
            const movie = await vidsrcApi.embed(category,id);
            console.log(movie);
            divMovie.querySelector('iframe').setAttribute('src', movie)
            
        }

        getMovie();
    }, [id])

    const iframe = useRef(null);
    return (
       <div id='movie' className='movie mx-8 md:mx-20  flex flex-col mb-32 md:mb-96'>
            <div className='pb-5 md:pb-10 sm:text-4xl text-2xl font-bold '>
                <h1>Movie</h1>

            </div>
            <div id='movie_body' className='md:w-[50rem] xl:w-[80rem] w-[20rem] sm:w-[30rem] h-[10rem] sm:h[13rem] md:h-[40rem] self-center'>
            <iframe ref={iframe} className='w-full h-full'
                    title='vidsrc player'
                    width="460" height="360"
                    allow='same-origin; fullscreen;encrypted-media;'
                    mozallowfullscreen="mozallowfullscreen" 
                    msallowfullscreen="msallowfullscreen" 
                    oallowfullscreen="oallowfullscreen" 
                    webkitallowfullscreen="webkitallowfullscreen"
                    // referrerpolicy="origin"
                    src=''>
            </iframe>
            </div>

            

        </div>

  );
};

export default VideoPlayer;
