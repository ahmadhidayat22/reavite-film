import {
    MyNav,
    HeroDetail,
    TrailerDetail,
    MovieList,
  
  } from '../components'
  import { movieType } from '../server/api';

const Movie = () => {
    return(
    <div className=''>
      <div className=''>
        <MyNav />
        <HeroDetail />
        
      </div>

      <section className='my-5 '>
        <TrailerDetail />
        <MovieList type={movieType.popular} title="Similiar"/>

      </section>

    
    </div>

    )
}

export default Movie;