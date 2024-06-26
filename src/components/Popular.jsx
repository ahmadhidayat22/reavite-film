import { play_button, play_button_red } from "../assets"
import { useState , useEffect } from "react";
import tmdbApi, { category, movieType ,tvType } from '../server/api';


const Popular = (props) => {
    const [popularMovies, setPopularMovies] = useState([])

    useEffect(() => {
        tmdbApi.getMoviesList(movieType.top_rated).then((res) => {
                  setPopularMovies(res);
                })
    }, [])

   

    const PopularMovieList = () => {
        return popularMovies.map((movie, i) =>{
            const title = movie.title;
            const shortTitle = title ;
            // const shortTitle = title.length > 10 ? title.slice(0, 10) + '...' : title ;


            return(
                // eslint-disable-next-line react/jsx-key
                <div  className="group hover:scale-110  transition-all relative overflow-hidden ease-in-out duration-300 px-3">
                    <div className="w-44 h-64 max-w-xs overflow-hidden rounded-lg  bg-red-400  ease-in-out">
                        <img src={`${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt="" />
                    </div>
                    
                    <div className="w-44 h-0 *:translate-y-5 *:group-hover:translate-y-0 *:opacity-0 *:group-hover:opacity-100 *:duration-300  group-hover:h-32 px-3 py-1 group-hover:bg-gradient-to-t  group-hover:from-black  text-white items-center flex gap-2 absolute bottom-0 rounded-b-lg ">
                        <div className="w-40 text-wrap">
                            <h3 className="font-bold ">{ shortTitle }</h3>

                        </div>
                        <div className=" ">
                            <button>
                                <img src={play_button_red} alt="" className="w-10" />

                            </button>
                        </div>
                    </div>
                



                </div>
            )
        })
    }


    return(
        <div id="popular" className="flex flex-col m-auto p-auto my-10 mx-14">
            <div className="flex justify-between">

                <h1 className="flex py-5  md:mx-15 mx-5 font-bold text-4xl text-white">Popular</h1>
                <div className=" mx-3 flex items-end px-2 ">
                    <a href="#" className="text-red-400"> Show more </a>
                </div>
            </div>

        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar " >
            
            <div className="flex flex-nowrap  py-5 ">

                    {/* {movieList} */}
                    <PopularMovieList />
            
            


            </div>
        </div>
    </div>
    )
}

export default Popular;