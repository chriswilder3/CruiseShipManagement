import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Services from './components/services/Services';
import Catering from './components/services/catering/Catering';
import SignIn from './components/users/Signin';
import Dashboard from './components/users/Dashboard';
import SignUp from './components/users/Signup';
import { AuthContextProvider } from './contexts/AuthContext';
import Stationery from './components/services/stationery/Stationery';
import Facilities from './components/services/facilities/Facilities';


function App() {


  return (
    <>  
      
        <Router>
          <Routes>
             <Route path='/' element={ <Layout />} >
              <Route index element={ <Home />} />
              <Route path='about' element={ <About />} />
              <Route path='contact' element={ <Contact /> } />
              <Route path='services' element={ <Services />} />
              <Route path='services/catering' element={ <Catering />} />
              <Route path='services/stationery' element={<Stationery />} />
              <Route path='services/facilities' element={ <Facilities /> } />
              <Route path='users/signin' element={ <SignIn />} />
              <Route path='users/dashboard' element={ <Dashboard />} />
              <Route path='/users/signup' element={ <SignUp /> } />
             </Route>
          </Routes>
        </Router>
      
    </>
  )
}

export default App
