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
import Dashboard from './components/users/dashboards/Dashboard';
import SignUp from './components/users/Signup';
import Stationery from './components/services/stationery/Stationery';
import Facilities from './components/services/facilities/Facilities';
import Movies from './components/services/facilities/movies/Movies';
import Salon from './components/services/facilities/salon/Salon';
import Fitness from './components/services/facilities/fitness/Fitness';
import Partyhall from './components/services/facilities/partyhall/Partyhall';
import AdminAddItems from './components/users/dashboards/AdminAddItems';
import AdminManageItems from './components/users/dashboards/AdminManageItems';
import Checkout from './components/users/Checkout';
import MovieCheckout from './components/services/facilities/movies/MovieCheckout';
import FitnessCheckout from './components/services/facilities/fitness/FitnessCheckout';
import SalonCheckout from './components/services/facilities/salon/SalonCheckout';
import PartyhallCheckout from './components/services/facilities/partyhall/PartyhallCheckout';



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
              <Route path='services/facilities/movies' element={ <Movies /> } />
              <Route path='services/facilities/salon' element={ <Salon /> } />
              <Route path='services/facilities/fitness' element={ <Fitness /> } />
              <Route path='services/facilities/partyhall' element={ <Partyhall /> } />
              <Route path='users/signin' element={ <SignIn />} />
              <Route path='users/dashboard' element={ <Dashboard />} />
              <Route path='users/signup' element={ <SignUp /> } />
              <Route path='users/adminAddItems' element={<AdminAddItems />} />
              <Route path='users/adminManageItems' element={<AdminManageItems />} />
              <Route path='users/checkout' element={<Checkout />} />
              <Route path='services/facilities/movies/movieCheckout' element={<MovieCheckout />} />
              <Route path='services/facilities/fitness/fitnessCheckout' element={<FitnessCheckout />} />
              <Route path='services/facilities/salon/salonCheckout' element={<SalonCheckout />} />
              <Route path='services/facilities/partyhall/partyhallCheckout' element={<PartyhallCheckout />} />

             </Route>
          </Routes>
        </Router>
      
    </>
  )
}

export default App
