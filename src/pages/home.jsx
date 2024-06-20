import {
  MyNav,
  Hero,
  Popular,
  MovieList,

} from '../components'

import { movieType } from '../server/api';

const Home = () => {
    return(
    <div className=''>
      <div className=''>
        <MyNav />
        <Hero  />
        
      </div>
      <section className='w-full my-5 '>
        <MovieList type={movieType.popular} title="Now Playing"/>
        {/* <MovieList type={movieType.popular} title="Popular"/>
        <MovieList type={movieType.upcoming} title="Upcoming"/>
        <MovieList type={movieType.top_rated} title="Top Rated"/> */}
      </section>      
     
    </div>



    )

}


export default Home;
