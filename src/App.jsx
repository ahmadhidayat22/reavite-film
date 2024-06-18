// import { useState } from 'react'

import './App.css'
import {
  MyNav,
  Hero,
  Popular,

} from './components'
import { useState , useEffect } from "react";
import { getMovieList } from './server/api';
import tmdbApi, { category, movieType ,tvType } from './server/api';

function App() {
  // const [count, setCount] = useState(0)

  // const [popularMovies, setPopularMovies] = useState([])
  // useEffect(() => {
  //     // getMovieList().then((result)=> {
  //     // setPopularMovies(result)

  //     // })
  //     tmdbApi.getMoviesList(movieType.top_rated).then((res) => {
  //       setPopularMovies(res);
  //     })

  // }, [])
  // console.log(popularMovies);
  // const heroMovies= popularMovies[0];
  // console.log(heroMovies);

  return (
    <div className=''>
      <div className=''>
        {/* <MyNav /> */}
        <Hero  />
        
      </div>
      <section className='w-full my-5 '>
        <Popular />
      </section>      
     
    </div>

    
  )
}

export default App
