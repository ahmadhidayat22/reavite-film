import { useState ,useEffect ,useRef } from "react";
import {ChevronLeft , ChevronRight} from "react-feather";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { star , half_star, play_button } from "../assets";
import MyModal , { ModalContent } from "./Modal"; 
import tmdbApi, { category, movieType ,tvType } from '../server/api';

import { genres, genres2 } from "../constant";

const HeroSlideItem = props => {    
    const item = props.movie;
    

    let rating = item.vote_average;
    const remainingStars = rating % 1 ? true: false;
    
    const starItem= []
    for(let i = 1 ; i < Math.floor(rating); i++){
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

    const setModalActive = async() => {
        // console.log(item.id);
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos( category.movie, item.id);
        let key = 0;
        videos.map((item) => {
            if(item.type == "Trailer"){
                key = item.key
                console.log(key);
            }
            // console.log(item.type);
        })
        
        if (key != 0){
            const videoSrc = 'https://www.youtube.com/embed/' + key;
            modal.querySelector('iframe').setAttribute('src', videoSrc);

        }else{
            // modal.querySelector('.modal_content').innerHTML= "no trailer";
            alert("tidak ada trailer")
            console.log(modal);
            console.log("tidak ada videos");
            return;
        }
        modal.classList.add('fixed');
        modal.classList.remove('hidden');

        // console.log(videos);
    } 
    

    let genreName = []
    const genresID = item.genre_ids;
   
    const getGenres = () => {
       
        
        for (let i = 0; i < genresID.length; i++) {
            const e = genresID[i];
        
            genres.map((item,j) => {
                if(e == item.id){
                    genreName.push(item.name)

                }
               
            })


        }
            
    }
    

    getGenres();

   return (
        <div className="relative h-full w-full">
            <img
                src={`${import.meta.env.VITE_REACT_APP_HEROIMGURL}/${item.backdrop_path}`}
                alt="image 1"
                className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex h-full w-full  bg-gradient-to-r  from-black">
                <div className="w-3/4 flex items-start flex-col gap-3   justify-center  mx-28 lg:mx-20 px-3  md:w-2/4">
                    <Typography
                        variant="h1"
                        color="white"
                        className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                    >
                        {item.title}
                    

                    </Typography>
                    <div className="flex justify-start items-center gap-1">
                     {starItem}
                     <span>
                        <p className="text-white ms-3">{(Math.round(rating * 10) / 10)}</p>
                     </span>
                     <span className="text-white font-medium py-1 px-2 ms-2 rounded-md bg-yellow-800 ">
                         <p>Rating</p>
                     </span>    
                    </div>
                    <Typography
                        variant="lead"
                        color="white"
                        className=" opacity-80"
                    >
                       {item.overview}

                    </Typography>

                    <div>
                        <div className="flex items-center gap-2 mt-5">
                            
                            {
                                genreName.map((i) => {
                                    return(
                                        <span className="border py-1 px-2 rounded-xl ">{i}</span>

                                    )
                                })
                            }
                        </div>
                        <p className="font-mono text-lg text-white  mt-3"><span className="text-green-400">Released date</span> {item.release_date} </p>

                    </div>

                    <div className="mt-5">
                        <Button size="lg" className="bg-red-500 text-white" onClick={setModalActive}>
                        watch Trailer
                        </Button>
                        
                    </div>
                </div>
                <div className="flex items-center xl:ms-52  lg:ms-28 ">
                    <button 
                        className="hover:-rotate-12 hover:scale-125 transition-transform duration-300 "
                        onClick={setModalActive}
                    >
                    <img 
                        src={play_button} 
                        alt="play"
                        className="w-28 "
                        
                        />
                    </button>
                    
            </div>  
            </div>
              
        </div>
     
   )
 
}
const Carousels = (props) => {
    
	const movie = props.movies;

	return (
        <>
		<Carousel
            className="rounded-xl"
            autoplay= {false}
            loop={true}
            autoplayDelay={8000}
            
        >
			{movie.map((item, i) => (
				<HeroSlideItem movie={item} key={i} />

			))}
		</Carousel>
        
            {
                movie.map((item, i) => <TrailerModal item={item} key={i}/>  )
            }
        
        </>
	);
};


const TrailerModal= props => {
    // console.log("c",props.item.id);
    const iframe = useRef(null);

    // const videoUrl = 'https://www.youtube.com/embed/LEjhY15eCx0'
    const onClose = () => iframe.current.setAttribute('src', '');


    return(
        <MyModal active={false} id={`modal_${props.item.id}`} >
            <ModalContent onClose={onClose} >
                <iframe ref={iframe} className="w-full rounded-lg xl:h-[80vh] lg:h-[500px]" ></iframe>
            </ModalContent>
        </MyModal> 
    )

}

{/* <div className="absolute inset-0 -z-10">
                <img
                        src=""
                        alt="Background"
                        className="w-full h-full object-cover object-center brightness-50"
                        
                    />
                </div>

                <div className="relative bg-gradient-to-r from-black z-0 text-white h-full flex items-start flex-col w-3/5  text-start justify-center px-28 lg:px-16  gap-5">
                    <h1 className="text-6xl lg:text-4xl uppercase font-mono font-extrabold ">p</h1>
                    <div className="flex justify-start items-center gap-1">
                        p
                        <span className="text-white font-medium py-1 px-2 ms-2 rounded-md bg-yellow-500 ">
                            <p>p</p>
                        </span>    
                    </div>

                    <div className="border w-3/5 lg:w-11/12">
                        <p className="text-lg lg:text-base">
                            awd
                        </p>
                    </div>
                    <div>
                        <p className="font-mono text-lg"><span className="text-green-400">Genres</span> apwdlaw </p>
                        <p className="font-mono text-lg"><span className="text-green-400">Tags</span> apwdlaw </p>
                    
                    </div>
                    <button className="rounded-lg shadow-md bg-white text-black px-3 py-2 " onClick="{handleVideoClick}">Watch Trailer</button>
                
                    
                </div>
                <div className="flex items-center ms-32">
                    <button 
                        className="hover:-rotate-12 hover:scale-125 transition-transform duration-300 "
                        onClick="{handleVideoClick}"
                    >
                    <img 
                        src="{play_button}" 
                        alt="play"
                        className="w-28 "
                        
                        />
                    </button>
                    
                </div> */}
export default Carousels;