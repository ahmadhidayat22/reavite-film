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
                    console.log(key);

                }
            });

            if (key != 0) {
                const videoSrc =`https://www.youtube.com/embed/${key}?autoplay=1`
                trailer.querySelector('iframe').setAttribute('src', videoSrc);
                
            }
            else{
                alert("tidak ada trailer")

            }
            // console.log(key);


       };
       setTrailer();
    }, [props.category , props.id])

    

    const iframe = useRef(null);
    return (
        <div className='trailer mx-20 flex flex-col mb-96'>
            <div className='ps-4 pb-10 text-4xl font-bold '>
                <h1>Trailer </h1>

            </div>
            <div className='w-full h-[55rem] '>
            <iframe ref={iframe} className='w-full h-full'
                    title='Youtube player'
                    allow='same-origin fullscreen'
                    sandbox='allow-same-origin allow-forms allow-popups  allow-scripts allow-presentation '

                    src=''>
            </iframe>
            </div>
        </div>


    )
}

export default TrailerDetail