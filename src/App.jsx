// import { useState } from 'react'
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'

import './App.css'

import { useState , useEffect } from "react";

import {
  Home,
  Movie,
  TvSeries ,
  Catalog,
  NotFound,

} from './pages';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='*' element={<NotFound />}/>
        <Route path='/catalog/:category/:type' element={<Catalog />}/>
        <Route path='/:Category/:id' element={<Movie />}/>
        <Route path='/tv-series' element={<TvSeries />}/>
      </Routes>
    </Router>
    
  )
}

export default App
