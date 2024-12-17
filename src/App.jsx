import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Carousel from './components/Carousel'
import Footer from './components/Footer'

function App() {


  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <Carousel />

        <Footer />
      </div>
    </>
  )
}

export default App
