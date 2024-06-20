// import { useState } from 'react'
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'

import './App.css'

import { useState , useEffect } from "react";

import { Home, Movie, TvSeries } from './pages';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/movie' element={<Movie />}/>
        <Route path='/tv-series' element={<TvSeries />}/>
      </Routes>
    </Router>
    
  )
}

export default App
