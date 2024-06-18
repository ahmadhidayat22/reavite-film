// import { useState } from 'react'

import './App.css'
import {
  MyNav,
  Hero,
  Popular,

} from './components'
import { useState , useEffect } from "react";
// import tmdbApi, { category, movieType ,tvType } from './server/api';

function App() {

  return (
    <div className=''>
      <div className=''>
        <MyNav />
        <Hero  />
        
      </div>
      <section className='w-full my-5 '>
        <Popular />
      </section>      
     
    </div>

    
  )
}

export default App
