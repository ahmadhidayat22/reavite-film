import React, { useEffect, useRef, useState } from 'react'
import tmdbApi from '../server/api';

const TrailerDetail = (props) => {
    // console.log(props);

    const [videos, setVideos] = useState([]);

    
    useEffect(() => {
        
       const setTrailer= async () => {
            const trailer = document.querySelector('.trailer')
            let videos = await tmdbApi.getVideos(props.category,props.id);
            videos = videos.results
            let key = 0;

            videos.map((item) => {
                if(item.type == "Trailer"){
                    key = item.key
                    // console.log(key);

                }
            });

            if (key != 0) {
                const videoSrc =`https://www.youtube.com/embed/${key}?autoplay=0`
                trailer.querySelector('iframe').setAttribute('src', videoSrc);
                
            }
            else{
                // alert("tidak ada trailer")
                trailer.classList.add('hidden')

            }
            // console.log(key);


       };
       setTrailer();
    }, [props.category , props.id])

    

    const iframe = useRef(null);
    return (
        <div id='trailer' className='trailer mx-8 md:mx-20  flex flex-col mb-32 md:mb-96'>
            <div className=' pb-5 md:pb-10 text-4xl font-bold '>
                <h1>Trailer</h1>

            </div>
            <div id='trailer_body' className='w-full h-[15rem] md:h-[55rem] '>
            <iframe ref={iframe} className='w-full h-full'
                    title='Youtube player'
                    width="560" height="315"
                    allow='same-origin; fullscreen;encrypted-media;'
                    mozallowfullscreen="mozallowfullscreen" 
                    msallowfullscreen="msallowfullscreen" 
                    oallowfullscreen="oallowfullscreen" 
                    webkitallowfullscreen="webkitallowfullscreen"
                    src=''>
            </iframe>
            </div>

            

        </div>


    )
}

export default TrailerDetail