import {
    MyNav,
    HeroDetail,
    TrailerDetail,
    MovieList,
  
  } from '../components'
import tmdbApi , { movieType, category } from '../server/api';
import { useParams } from 'react-router';

import React, { useEffect, useState } from 'react'

const Movie = () => {
    const { Category, id } = useParams();
    // const [movieDetail, setMovieDetail] = useState([]);

    // useEffect(() => {
    //     tmdbApi.detail(Category,id).then((res) => {
    //       setMovieDetail(res);
    //     })

    // }, [])

    return(
    <div className=''>
      <div className=''>
        <MyNav />
        <HeroDetail category={category[Category]} id={id} />
        
      </div>

      <section className='my-5 '>
        <TrailerDetail category={category[Category]} id={id}/>
        
        <MovieList type="similar" category={category[Category]} id={id} title="Similiar"/>

      </section>

    
    </div>

    )
}

export default Movie;