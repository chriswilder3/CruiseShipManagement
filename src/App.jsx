import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';

function App() {


  return (
    <>
        <Router>
          <Routes>
             <Route path='/' element={ <Layout />} >
              <Route index element={ <Home />} />
              <Route path='about' element={ <About />} />
              <Route path='contact' element={ <Contact /> } />
             </Route>
          </Routes>
        </Router>
      
    </>
  )
}

export default App
