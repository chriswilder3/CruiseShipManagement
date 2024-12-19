import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Carousel from './components/Carousel'
import Footer from './components/Footer'
import { Router, Route, Routes, Outlet } from 'react-router-dom';

function App() {


  return (
    <>
      
        <Navbar />
        <Hero />
        <Carousel />

        <Footer />
      
    </>
  )
}

export default App
