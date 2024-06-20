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
    const [movieDetail, setMovieDetail] = useState([]);

    useEffect(() => {
        tmdbApi.detail(Category,id).then((res) => {
          setMovieDetail(res);
        })

    }, [Category,id])
// console.log(movieDetail);
    return(
    <div className=''>
      <div className=''>
        <MyNav />
        <HeroDetail item={movieDetail} category={category[Category]} />
        
      </div>

      <section className='my-5 '>
        <TrailerDetail />
        <MovieList type="similar" category={category[Category]} id={id} title="Similiar"/>

      </section>

    
    </div>

    )
}

export default Movie;