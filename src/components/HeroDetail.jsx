import React, { useEffect, useState } from 'react'
import Cast from './Cast';

// import tmdbApi, {  } from '../server/api';
const HeroDetail = (props) => {
    const item = props.item;
    // console.log(item);
    const [genre, setGenre] = useState([]);
    const [credits, setCredits] = useState([]);

    const bigPath = item.backdrop_path;
    const smallPath = item.poster_path;
    useEffect(() => {
        setGenre(item.genres)
        // setCredits(item.credits)
        
        
       
    }, [])

	const GetGenre = () => {
		return (
			genre?.map((element, index) => (
				<span key={index} className="border py-[2px] px-2 rounded-xl">
					{element.name}
				</span>
			)) || null
		);
	};

    const GetCast= () => {
        return credits?.map((element , i) => {
            const pictCast = `${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${element.profile_path}`;
            const name = element.name;
          

            if (i < 6) {
                return(
                    <div className="w-28 text-center" key={i}>
                    <img src={pictCast} alt="" className="w-full rounded"/>
                    <p>{name}</p>
                    </div>
    
                )
            }
                
                

            }) || null
        
    }
   
    // <span className="border py-1 px-2 rounded-xl">{element}</span>
    
    const picture = 'https://image.tmdb.org/t/p/original' + bigPath;
    const smallPic = 'https://image.tmdb.org/t/p/w500' + smallPath;
    // const credit= 'https://image.tmdb.org/t/p/w500/coC58ANiDbqRIyle5zEl9QDektf.jpg'

    return(
        <>
        {item && (

        <div className="relative h-full w-full ">

            <img
                src={picture}
                alt="image 1"
                className="h-full w-full object-cover"
            />

            <div className="absolute bottom-0 left-0  w-full bg-gradient-to-t  from-black from-40% inset-0 flex justify-center items-center ">
                
                <div className="flex justify-center  gap-16" >

                    <div className=" rounded-md overflow-hidden">
                        <img src={smallPic} alt="" className="max-w-80 h-full "/>
                    </div>
                    
                    <div className=" w-2/6  flex flex-col gap-3 ">
                        <h1 className="font-extrabold text-5xl ">{item.title}</h1>
                        <div className='flex gap-2 pt-2'>
                            { 
                                <GetGenre />
                            }
                        </div>

                        <p>{props.item.overview}</p>
                        
                        
                    
                        <h3 className="font-extrabold ">Casts</h3>
                        <div className="rounded  flex justify-start gap-3 pe-2 py-3 ">
                            { 
                                <Cast id={item.id} category={props.category}/>
                            }
                            {/* <div className=" w-28 text-center">
                                <img src={credit} alt="" className="w-full rounded"/>
                                <p>Rebecca Hallawdawd</p>
                            </div>
                           
                             */}
                           

                        </div>

                    </div>
                </div>


            </div>
            
        </div>
        )}
        </>


    )

    

}

export default HeroDetail;
